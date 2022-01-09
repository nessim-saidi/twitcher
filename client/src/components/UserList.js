import { FaHorseHead, FaSmile } from 'react-icons/fa'

const UserList = ({users}) => {
    console.log(users);

    return (
        <div className="userlist-container">
            <header>Users</header>
            <ul>
                {users?.map(user => (
                    <li key={user.id}>
                        {user.role === 'user' ? <FaHorseHead /> : <FaSmile/>}
                        <p>{user.name}</p>
                    </li>                    
                ))}

            </ul>
        </div>
    );
}

export default UserList;