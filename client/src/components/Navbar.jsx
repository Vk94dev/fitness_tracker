import React, { useState } from 'react'
import styled from 'styled-components'
import {Link as LinkR,NavLink} from 'react-router-dom'
import LogoImg from '../utils/images/Logo.png'
import { MenuRounded, Padding } from '@mui/icons-material';
import { Avatar } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {logout} from '../redux/reducers/userSlice'
import { continuousColorLegendClasses } from '@mui/x-charts';

const Nav = styled.div`
background-color:${({theme})=>theme.bg};
height:60px;
display:flex;
align-items:center;
justify-content: center;
font-size:1rem;
position:sticky;
top:0;
z-index:10;
color:white;
border-bottom:1px solid ${({theme})=>theme.text_secondary+20}
`;

const NavContainer = styled.div`
width:100%;
max-width:1400px;
padding:0 24px;
display:flex;
gap:14px;
align-items:center;
justify-content:space-between;
font-size:1rem;
`;

const NavLogo = styled(LinkR)`
width:100%;
display:flex;
align-items:center;
gap:16px;
padding:0 6px;
font-weight:600;
font-size:18px;
text-decoration:none;
color:${({theme})=> theme.text_primary};
`;

const Logo = styled.img`
height:42px;`;

const Mobileicon = styled.div`
color:${({theme})=> theme.text_primary};
display:none;
@media screen and (max-width:768px){
display:flex;
align-items: center;
}
`;

const NavItems  = styled.ul`
width:100% ;
display: flex;
align-items: center;
justify-content:center;
gap:32px;
padding: 0 6px;
list-style:none;
@media screen and (max-width:768px){
display: none}
`;

const Navlink = styled(NavLink)`
 display:flex;
 align-items:center;
 color:${({theme})=>theme.text_primary};
 font-weight:500;
 cursor:pointer;
 transition:all 1s slide-in;
 text-decoration:none;
 &:hover {
 color:${({theme})=>theme.primary};
 }
 &.active{
 color:${({theme})=> theme.primary};
 border-bottom : 1.8px solid ${({theme})=> theme.primary};
}
`;

const UserContainer = styled.div`
width:100%;
height: 100%;
display:flex;
justify-content: flex-end;
gap:16px;
align-items:center;
padding: 0 6px;
color:${({theme})=> theme.primary };
`;

const TextButton = styled.div` 
 text-align: end;
 color:${({theme})=> theme.secondary};
 cursor:pointer;
 font-size:19px;
 transition: all 0.3s ease;
 font-weight:600;
 &:hover{
 color:${({theme})=> theme.red};
 }
`;

const MobileMenu = styled.ul`
display: flex;
flex-direction:column;
align-items:start;
gap:16px;
padding:0 6px;
list-style:none;
width:90%;
padding:12px 40px 24px 40px;
background:${({theme})=> theme.bg};
position:absolute;
top:80px;
right:0;
transition:all 0.6s ease-in-out;
transform:${({$isOpen})=> $isOpen ? "translateY(0)" : "translateY(-100%)"};
border-radius:0 0 20px 20px;
box-shadow : 0 0 10px 0 rgba(0,0,0,0.2);
opacity: ${({$isOpen})=> ($isOpen ? "100%" :"0" )};
z-index : ${({$isOpen})=> ($isOpen ? "1000": "-1000")};
`;

// const ButtonTheme = styled.button`
//   padding: 8px 16px;
//   background-color: ${({ theme }) => theme.primary};
//   color: ${({ theme }) => theme.white};
//   border: none;
//   border-radius: 8px;
//   cursor: pointer;
//   &:hover {
//     opacity: 0.8;
//     transform:scale(1.02);
//   }
// `;

const MenuContainer = styled.div`
  position: relative;
`;

const ThreeDots = styled.div`
  cursor: pointer;
  font-size: 30px;
  font-weigth:600;
   color:${({theme})=> theme.text_primary};
`;

const Dropdown = styled.div`
  position: absolute;
  right: 0;
  top: 34px;
  white-space:nowrap;

  background: ${({ theme }) => theme.bg};
  color: ${({ theme }) => theme.text};
  padding: 5px;
  border-radius: 8px;
  box-shadow: 0px 0px 10px rgba(0,0,0,0.2);
`;

const MenuItem = styled.div`
  cursor: pointer;
  padding: 8px;
 color:${({theme})=> theme.text_primary};
 &:hover{
  color:${({theme})=>theme.primary};
 }
`;




const Navbar = ({currentUser,darkMode,setDarkMode}) => {

  const navigate = useNavigate();

    const dispatch = useDispatch();

 const [isOpen , setisOpen] = useState(false);
 const [open,setOpen] = useState(false);

 console.log("current user", currentUser);
console.log("navigate:", `/profile/${currentUser.user._id}`);
const handleProfileClick = () => {
  
    if (!currentUser || !currentUser.user._id) {
    console.log("User not ready");
    return;
  }
  navigate(`/profile/${currentUser.user._id}`);
  };

  return (
    <Nav>
        <NavContainer>
            <Mobileicon onClick={()=> setisOpen(!isOpen)}>
              <MenuRounded sx={{color:"inherit"}} />
            </Mobileicon>
            <NavLogo to="/">
                <Logo src={LogoImg} />
                Fittrack
            </NavLogo>

            <MobileMenu $isOpen= {isOpen} >
                 <Navlink to="/">Dashboard</Navlink>
                <Navlink to="/workouts">Workouts</Navlink>
                <Navlink to="/tutorials">Tutorials</Navlink>
                <Navlink to="/blogs">Blogs</Navlink>
                <Navlink to="/contact">Contact</Navlink>
            </MobileMenu>

            <NavItems>
                <Navlink to="/">Dashboard</Navlink>
                <Navlink to="/workouts">Workouts</Navlink>
                <Navlink to="/tutorials">Tutorials</Navlink>
                <Navlink to="/blogs">Blogs</Navlink>
                <Navlink to="/contact">Contact</Navlink>
            </NavItems>
             
            <UserContainer>
                 {/* <ButtonTheme onClick={(e)=>setDarkMode(!darkMode)}>Toggle Theme</ButtonTheme> */}
                <Avatar src ={currentUser?.user.img} onClick={handleProfileClick} >{currentUser?.user.name?.[0]?.toUpperCase()}</Avatar>
                <TextButton onClick={()=>{dispatch(logout()); navigate("/")}}>Logout</TextButton>
            </UserContainer>

    <MenuContainer>

      <ThreeDots onClick={() => setOpen(!open)}>⋮</ThreeDots>

      {open && (
        <Dropdown>
          <MenuItem onClick={()=>{ const newMode = !darkMode ; setDarkMode(newMode); setOpen(!open);}}>
           {!darkMode?`Dark Mode`:`Light Mode`} 
          </MenuItem>
        </Dropdown>
      )}
    </MenuContainer>

        </NavContainer>
    </Nav>
  )
}

export default Navbar
