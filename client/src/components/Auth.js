import {useState} from 'react'

const Auth = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);
    const [confirmPassword, setConfirmPassword] = useState(null);
    const [PWMatchError, setPWMatchError] = useState(false);

    console.log("User name: " + username);

    const handleRegister = () => {
        if (!isLogin && username && password !== confirmPassword) {
            setPWMatchError(true);
            console.log("Password mismatch");
            return;
        } else {
            setPWMatchError(false);
            // register new user
        }
    }

    const handleLogin = () => {
        if (isLogin && username && password) {

            console.log("Login user " + username);

        }
    }

    return (
        <div className="auth-container">
            <div className="box">
                <div className="form">
                    <input type="text" id="userName" name="userName" placeholder="User Name" 
                        onChange={(e) => setUsername(e.target.value)}/>
                    <input type="text" id="password" name="password" placeholder="Password" 
                        onChange={(e) => setPassword(e.target.value)}/>
                    {!isLogin &&
                        <input type="text" id="confirmPassword" name="confirmPassword" placeholder="Confirm Password" 
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