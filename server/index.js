const PORT = 7070;
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const { v1: uuidv1 } = require('uuid');
const { connect } = require('getstream');
const { StreamChat } = require('stream-chat');

const API_KEY = 'asgjv766hukp';
const API_SECRET = 'fnee4ve6uquq8t7ybkuasqdns4gmsus65kk9thb8gnnfahhqw4bdd7zbtas85d7a';
const APP_ID = '1160870';

const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/v1/signup', async (req, res) => {
    try {
        const { username, password } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);
        const userId = uuidv1();

        console.log("Register user " + username +" with password " + password);

        const client = connect(API_KEY, API_SECRET, APP_ID);
        const userToken = client.createUserToken(userId);
        
        const chatClient = StreamChat.getInstance(API_KEY, API_SECRET);
        const updateResponse = await chatClient.upsertUser({
            id: userId,
            name: username,
            hashedPassword: hashedPassword
        });
 
        const channel = await chatClient.channel('messaging', 'messaging-demo', {
            name: 'General Chat',

        });
        const addMemberResponse = await channel.addMembers([userId], { text: `${username} joined the channel.`, user_id: userId  });

        res.status(200).json({username, userId, userToken});
    } catch (error) {
        console.log(error);
        res.status(500).json({message: error});
    }
});

app.post('/api/v1/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        const client = connect(API_KEY, API_SECRET, APP_ID);
        const chatClient = StreamChat.getInstance(API_KEY, API_SECRET);

        const { users } = await chatClient.queryUsers({name: username});

        if (!users.length) {
            return res.status(404).json({ message: 'User does not exist.'});
        }

        const authenticateSuccess = await bcrypt.compare(password, users[0].hashedPassword);

        if(authenticateSuccess) {
            const userToken = client.createUserToken(users[0].id);
            const userId = users[0].id;

            const channel = await chatClient.channel('messaging', 'messaging-demo', {
                name: 'General Chat',
    
            });
            const addMemberResponse = await channel.addMembers([userId], { text: `${username} joined the channel.`, user_id: userId  });
            res.status(200).json({username, userId, userToken});
        } else {
            return res.status(401).json({ message: 'User or password is not correct.'});
        }
        
    } catch (error) {
        console.log(error);
    }
});

app.listen(PORT, () => console.log("Listening to Port " + PORT));