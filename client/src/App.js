import React, {useState, useEffect} from 'react';
import Login from './assets/Login/Login'
import JobList from './assets/JobList/JobList'
import fire from './assets/fire'
import './App.css';

const App = () => {
  const [user, setUser]= useState('');
  const [email, setEmail]= useState('');
  const [password, setPassword]= useState('');
  const [emailError, setEmailError]= useState('');
  const [passwordError, setPasswordError]=useState('');
  const [hasAccount, setHasAccount]=useState(true);

  const clearInputs = () =>{
    setEmail('');
    setPassword('');
  }

  const clearErrors =() =>{
       setEmailError('');
       setPasswordError('');
  }

  const handleLogin =() =>{
    clearErrors();
      fire
        .auth()
        .signInWithEmailAndPassword(email, password)
        .catch(err=>{
            switch(err.code){
              case "auth/invalid-email":
              case "auth/user-disabled":
              case "auth/user-not-found":
                 setEmailError(err.message);
                 break;
              case "auth/wrong-password":
                 setPasswordError(err.message);
                 break;
              default:
                setPasswordError("Default error");
                break;
            }
        })
  }




  const handleSignUp = () =>{
    clearErrors();
    fire
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .catch(err=>{
        switch(err.code){
          case "auth/email-already-in-use":
          case "auth/invalid-email":
             setEmailError(err.message);
             break;
          case "auth/weak-password":
             setPasswordError(err.message);
             break;
          default:
          setPasswordError("Default error");
          break;
        }
    })
  }

  const handleLogout =() =>{
      fire.auth().signOut();
  }





  useEffect(()=>{

    const authListener =() =>{
      fire.auth().onAuthStateChanged(user =>{
        if(user){
          clearInputs();
          setUser(user);
        }
        else{
          setUser('');
        }
      })
    }
      authListener();
  },[])

  return (
    <div>
      {user ? (
        <JobList handleLogout={handleLogout}/>
      ):(
        <Login 
          email={email} 
          setEmail={setEmail} 
          password={password} 
          setPassword={setPassword} 
          handleLogin={handleLogin}
          handleSignUp={handleSignUp}
          hasAccount={hasAccount}
          setHasAccount={setHasAccount}
          emailError={emailError}
          passwordError={passwordError}
        />
      )}
      
      
    </div>
  );
}

export default App;
