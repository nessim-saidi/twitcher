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
import { FaUsers, FaArrowAltCircleLeft } from 'react-icons/fa'
import { useState } from 'react';

const MessagingContainer = ({users}) => {
    const [cookies, setCookie, removeCookie] = useCookies(['user']);
    const [userListVisible, setUserListVisible] = useState(true);

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
                
                <FaUsers className={`icon users${userListVisible ? " active" : ""}`} onClick={() => setUserListVisible(!userListVisible)} />
                {userListVisible && <UserList users={users} />}

                <button className="action" onClick={logout}>Logout</button>
            </Window>
            <Thread />
        </div>
    );
}

export default MessagingContainer;