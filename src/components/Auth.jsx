import React from 'react'
import {auth,provider} from '../firebase-config'
import {signInWithPopup} from 'firebase/auth'
import Cookies from 'universal-cookie'
import "../styles/Auth.css"
const cookies  = new Cookies()
function Auth(props) {
    const {setIsAuth} = props
    const signInWithGoogle  = async()=>{
        try{
            const result = await signInWithPopup(auth,provider)
            console.log(result);
            cookies.set("auth-token",result.user.refreshToken)
            setIsAuth(true)
        }
        catch(err){
            console.error(err);
        }
      
    }
  return (
    <div className='auth'>
      <p>Sign In With Google To Continue</p>
      <button onClick={signInWithGoogle} >Sign In With Goole</button>
    </div>
  )
}

export default Auth
