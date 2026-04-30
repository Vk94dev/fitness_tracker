import React, { useState } from 'react'
import styled from 'styled-components'
import TextInput from './TextInput';
import Button from './Button';
import { UserSignIn } from '../api';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../redux/reducers/userSlice';
import { useNavigate }  from  "react-router-dom"


// import googleLogo from "../../public/images/googleLogo.png"
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import {firebaseApp} from '../firebase'

const auth = getAuth(firebaseApp);
const provider = new GoogleAuthProvider();



const Container = styled.div`
width:100%;
max-width:400px;
display:flex;
flex-direction:column;
gap:36px;
`;
const Title = styled.div`
font-size:30px;
font-weight:800;
color:${({theme})=> theme.text_primary};
`;
const Span = styled.div`
font-size:16px;
font-weight:400;
color:${({theme})=>theme.text_secondary};
`;


const SignIn = () => {

  const navigate = useNavigate();

  const dispatch = useDispatch();
  const [loading, setLoading]= useState(false);
  const [buttonDisabled, setButtonDisabled ] = useState(false);
  const [email, setEmail] = useState("");
  const [ password,setPassword] = useState("");

  const validateInputs = ()=>{
    if(!email || !password){
      alert("please fill in all fields");
      return false;
    }
    return true;
  }

const handleSignIn = async ()=>{
  setLoading(true);
  setButtonDisabled(true);
  if(validateInputs()){
    await UserSignIn({email,password}).then((res)=>{
      dispatch(loginSuccess(res.data));
      // alert("Login Success");
      navigate('/');
       setLoading(false);
  setButtonDisabled(false);
    })
    .catch((err)=>{
      alert(err.response.data.message);
      setLoading(false);
      setButtonDisabled(false);
      setEmail("");
      setPassword("");
    });
  }
}

// const signInWithGoogle = ()=>{
//    signInWithPopup(auth, provider)
//   .then((result) => {
//     // This gives you a Google Access Token. You can use it to access the Google API.
//     const credential = GoogleAuthProvider.credentialFromResult(result);
//     const token = credential.accessToken;
//     // The signed-in user info.
//     const user = result.user;
   
//    const fields = {
//     name:user.providerData[0].displayName,
//     email: user.providerData[0].email,
//     password:null,
//     image: user.providerData[0].photoURL,
//     // phone: user.providerData[0].phoneNumber
//     age: user.providerData[0].age,
//    }

//   }).catch((error) => {
//     // Handle Errors here.
//     const errorCode = error.code;
//     const errorMessage = error.message;
//     // The email of the user's account used.
//     const email = error.customData.email;
//     // The AuthCredential type that was used.
//     const credential = GoogleAuthProvider.credentialFromError(error);
//     // ...
//   });
// }


const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, provider);

    const user = result.user;

    const fields = {
      name: user.displayName,
      email: user.email,
      password: null,
      image: user.photoURL,
      authProvider:"google",
    };


    const res = await fetch("http://localhost:3000/api/user/authWithGoogle", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(fields),
    });

    const data = await res.json();


    dispatch(loginSuccess(data));

    navigate("/");

  } catch (error) {
    console.log(error);
  }
};





  return (
   <Container>
    <div>
        <Title>Welcome to Fitness Track 👋 </Title>
        <Span>Please login with your details</Span>
    </div>
    <div style={{display:"flex", gap:"20px", flexDirection:"column"}}>
      <TextInput  label="Email Address" placeholder="Enter your email address" value={email} handleChange={(e)=>setEmail(e.target.value)}/>
      <TextInput  label="Password" placeholder="Enter your password" password value={password} handleChange={(e)=>setPassword(e.target.value)}/>
      <Button text="SignIn" onClick={handleSignIn} isLoading={loading} isDisabled={buttonDisabled}></Button>
    </div>
    <div>
      <h4 style={{marginTop:"4px", fontWeight:"bold", textAlign:"center"}}>
        Or continue with social account 
      </h4>
      <div>
      <Button  text="Sign In with Google" onClick={signInWithGoogle}>
       
      </Button>
      </div>
    </div>
   </Container>
  )
}

export default SignIn