import React,{useState} from 'react'
import styled from 'styled-components'
import TextInput from './TextInput';
import Button from './Button';
import { UserSignUp } from '../api';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../redux/reducers/userSlice';
import { useNavigate } from 'react-router-dom';

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


const SignUp = () => {

 const navigate = useNavigate();

 const dispatch = useDispatch();
  const [loading, setLoading]= useState(false);
  const [buttonDisabled, setButtonDisabled ] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [ password,setPassword] = useState("");

const validateInputs = ()=>{
    if(!name.trim() || !email.trim() || !password.trim()){
      alert("please fill in all fields");
      return false;
    }
    return true;
  }

const handleSignUp = async ()=>{
  setLoading(true);
  setButtonDisabled(true);
  if(validateInputs()){
    await UserSignUp({name,email,password}).then((res)=>{
      dispatch(loginSuccess(res.data));
      // alert("Account Created Success");
      navigate("/");
       setLoading(false);
  setButtonDisabled(false);
    })

    .catch((err)=>{
      alert(err?.response?.data?.message || "something went wrong");
      setLoading(false);
      setButtonDisabled(false);
      setName("");
      setEmail("");
      setPassword("");
    });
  }
}


  return (
   <Container>
    <div>
        <Title>Create New Account 👋 </Title>
        <Span>Please enter details to create a new account</Span>
    </div>
    <div style={{display:"flex", gap:"20px", flexDirection:"column"}}>
      <TextInput  label="Full Name" placeholder="Enter your full name"  value={name} handleChange={(e)=>setName(e.target.value)}  />
      <TextInput  label="Email Address" placeholder="Enter your email address" value={email} handleChange={(e)=> setEmail(e.target.value)} />
      <TextInput  label="Password" placeholder="Enter your password" password value={password} handleChange={(e)=>setPassword(e.target.value)} />
      <Button text="SignUp"
        onClick={handleSignUp}
        isLoading={loading}
        isDisabled={buttonDisabled}
      ></Button>
    </div>
   </Container>
  )
}

export default SignUp
