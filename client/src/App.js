import logo from './logo.svg';
import './App.css';

import React, { useEffect, useState } from 'react';
import { StreamChat } from "stream-chat"
import {
  Chat,
  Channel,
  ChannelList
} from 'stream-chat-react';
import '@stream-io/stream-chat-css/dist/css/index.css';

// Components
import Auth from './components/Auth'
import MessagingContainer from './components/MessagingContainer';
import Video from './components/Video';
import { useCookies } from 'react-cookie';

const API_KEY = 'asgjv766hukp';
// JWT user authentication
// const userToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiZGF2ZS1tYXR0aGV3cyJ9.nNL3CJHw0ow63fV3VouvDUyBK_DneXBHO9NelOD5_70';

const filters = { type: 'messaging' };
const options = { state: true, presence: true, limit: 10 };
const sort = { last_message_at: -1 };

const client = StreamChat.getInstance(API_KEY);

const App = () => {
  const [clientReady, setClientReady] = useState(false);
  const [channel, setChannel] = useState(null);
  const [users, setUsers] = useState(null);

  const [cookies, setCookie, removeCookie] = useCookies(['user']);

  const authToken = cookies.AuthToken;

  useEffect( () => {
    if (authToken) {
      const getUsers = async () => {
        const {users} = await client.queryUsers({role: 'user'});
        setUsers(users);
      };

      getUsers();
    }
  }, [authToken]);

  const setupClient = async () => {
    console.log("Enter useEffect hook");
    //if (authToken) {
      console.log("User found: " + cookies.Name);

      try {
        await client.connectUser(
          {
            id: cookies.UserId,
            name: cookies.Name,
          },
          authToken,
        );

        const channel = await client.channel('messaging', 'messaging-demo', {
          name: 'General Chat',

        });
        setChannel(channel);

        setClientReady(true);
      } catch (err) {
        console.log(err);
      }
    };

  if(authToken) {
    setupClient();
  }

  //if (!clientReady) return null;

  const customStyle = {
    '--primary-color': 'green',
    '--md-font': '1.2rem',
    '--xs-m': '1.2rem',
    '--xs-p': '1.2rem',
  };

  console.log("Return UI");

  return (
    <>
    {!authToken && <Auth />}
    {authToken && <Chat client={client} customStyles={customStyle}>
     
      
      <Channel channel={channel} >
      <Video/>
        <MessagingContainer users={users} />
      </Channel>
    </Chat>}
    </>
  );
};

export default App;