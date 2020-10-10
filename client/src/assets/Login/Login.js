import React from 'react'
import styles from './Login.module.css'

const Login = (props) => {
    const {email,
        setEmail,
        password,
        setPassword,
        handleLogin,
        handleSignUp,
        hasAccount,
        setHasAccount,
        emailError,
        passwordError
     } = props;
    return (
        <div className={styles.login}>
            <div className={styles.loginContainer}>
                <label>Email address</label>
                <input type="text" placeholder="email" autoFocus required value={email} onChange={e=>setEmail(e.target.value)}/>
                <p className={styles.errorMsg}>{emailError}</p>
                <label>Password</label>
                <input type="password" placeholder="password" required value={password} onChange={e=>setPassword(e.target.value)}/>
                <p className={styles.errorMsg}>{passwordError}</p>
                <div className={styles.btnContainer}>
                    {hasAccount ? (
                        <>
                          <button onClick={handleLogin} className={styles.btn}>Login</button>
                          <p>Don't have an account ? <span onClick={()=> setHasAccount(!hasAccount)}>Register</span></p>
                        </>
                       ):(
                        <>
                           <button onClick={handleSignUp} className={styles.btn}>Register</button>
                           <p>Have an account ? <span onClick={()=> setHasAccount(!hasAccount)}>Login</span></p>
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Login
