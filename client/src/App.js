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


const API_KEY = 'asgjv766hukp';
// JWT user authentication
const userToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiZGF2ZS1tYXR0aGV3cyJ9.nNL3CJHw0ow63fV3VouvDUyBK_DneXBHO9NelOD5_70';

const filters = { type: 'messaging' };
const options = { state: true, presence: true, limit: 10 };
const sort = { last_message_at: -1 };

const client = StreamChat.getInstance(API_KEY);

const App = () => {
  const [clientReady, setClientReady] = useState(false);
  const [channel, setChannel] = useState(null);

  const authToken = false;

  useEffect(() => {
    const setupClient = async () => {
      try {
        await client.connectUser(
          {
            id: 'dave-matthews',
            name: 'Dave Matthews',
          },
          userToken,
        );

        const channel = await client.channel('messaging', 'gaming-demo', {
          name: 'Gaming Demo',
        });
        setChannel(channel);

        setClientReady(true);
      } catch (err) {
        console.log(err);
      }
    };

    setupClient();
  }, []);

  if (!clientReady) return null;

  const customStyle = {
    '--primary-color': 'green',
    '--md-font': '1.2rem',
    '--xs-m': '1.2rem',
    '--xs-p': '1.2rem',
  };

  return (
    <>
    {!authToken && <Auth />}
    {authToken && <Chat client={client} customStyles={customStyle}>
     
      <ChannelList filters={filters} sort={sort} options={options} />
      <Channel channel={channel} >
      <Video/>
        <MessagingContainer/>
      </Channel>
    </Chat>}
    </>
  );
};

export default App;


/* function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Welcome Dev!
        </p>
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>

      </header>
    </div>
  );
} */