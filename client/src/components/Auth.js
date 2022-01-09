import {useState} from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';

const Auth = () => {
    const [cookies, setCookie, removeCookie] = useCookies(['user']);
    const [isLogin, setIsLogin] = useState(true);
    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);
    const [confirmPassword, setConfirmPassword] = useState(null);
    const [PWMatchError, setPWMatchError] = useState(false);

    const serverBaseURL = 'http://localhost:7070'

    console.log("User name: " + username);

    const handleRegister = async () => {
        if (!isLogin && username && password !== confirmPassword) {
            setPWMatchError(true);
            console.log("Password mismatch");
            return;
        } else {
            setPWMatchError(false);
            console.log("Registering user " + username);
            
            // register new user
            const response = await axios.post(`${serverBaseURL}/api/v1/signup`, {
                username,
                password
            });
            console.log(response);

            setCookie('Name', response.data.username);
            setCookie('UserId', response.data.userId);
            setCookie('AuthToken', response.data.userToken);

            window.location.reload();
        }
    }

    const handleLogin = async () => {
        if (isLogin && username && password) {

            console.log("Login user " + username);
            const response = await axios.post(`${serverBaseURL}/api/v1/login`, {
                username,
                password
            });
            console.log(response);

            setCookie('Name', response.data.username);
            setCookie('UserId', response.data.userId);
            setCookie('AuthToken', response.data.userToken);

            window.location.reload();
        }
    }

    return (
        <div className="auth-container">
            <div className="box">
                <div className="form">
                    <input type="text" id="userName" name="userName" placeholder="User Name" 
                        onChange={(e) => setUsername(e.target.value)}/>
                    <input type="password" id="password" name="password" placeholder="Password" 
                        onChange={(e) => setPassword(e.target.value)}/>
                    {!isLogin &&
                        <input type="password" id="confirmPassword" name="confirmPassword" placeholder="Confirm Password" 
                            onChange={(e) => setConfirmPassword(e.target.value)}/>
                    }
                    {PWMatchError && <div className='error text'>Passwords do not match</div>}                    
                    {isLogin ? 
                        <button className="action" onClick={handleLogin}>Login</button> :
                        <button className="action" onClick={handleRegister}>Register</button>
                    }
                </div>
                    <div className="auth-options">
                        <button 
                            className={`${isLogin ? "active" : ""}`}
                            onClick={() => setIsLogin(true)}>Login</button>
                        <button 
                            className={`${!isLogin ? "active" : ""}`} 
                            onClick={() => setIsLogin(false)}>Sign Up</button>
                    </div>
            </div>
        </div>
    );
}

export default Auth;