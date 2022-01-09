import {
    Chat,
    Channel,
    ChannelHeader,
    ChannelList,
    MessageList,
    MessageInput,
    Thread,
    Window,
  } from 'stream-chat-react';
import React from "react";
import { useCookies } from 'react-cookie';
import UserList from './UserList';

const MessagingContainer = () => {
    const [cookies, setCookie, removeCookie] = useCookies(['user']);

    const logout = () => {
        removeCookie('Name', cookies.Name);
        removeCookie('UserId', cookies.UserId);
        removeCookie('AuthToken', cookies.AuthToken);

        window.location.reload();
    };

    return (
        <div className='messaging-container'>
            <Window>
                <ChannelHeader />
                <MessageList />
                <MessageInput />
                <button className="action" onClick={logout}>Logout</button>
                <UserList />
            </Window>
            <Thread />
        </div>
    );
}

export default MessagingContainer;