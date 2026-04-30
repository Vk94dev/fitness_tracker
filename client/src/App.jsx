
import React from 'react'

import {ThemeProvider,styled} from 'styled-components'
import {darkTheme, lightTheme} from './utils/Theme.js'
import {BrowserRouter} from 'react-router-dom'
import Authentication from './pages/Authentication.jsx'
import Navbar from './components/Navbar.jsx'
import { useState , useEffect } from 'react'
import  Dashboard  from './pages/Dashboard'
import Workouts from './pages/Workouts'
import { Routes , Route} from 'react-router-dom'
import { useSelector } from 'react-redux'
import Tutorials from './pages/Tutorials'
import Blogs from './pages/Blogs'
import Profile from './pages/Profile.jsx'
import Contact from './pages/Contact.jsx'

const Container = styled.div`
 width:100%;
 height:100vh;
 display:flex;
 flex-direction:column;
 background:${({theme})=>theme.bg};
 color:${({theme})=>theme.text_primary}
 overflow-x:hidden;
 transition:all 0.2s ease;
 overflow-y:scroll;
&::-webkit-scrollbar {
    display: none;
  };
`;

const App = () => {
 
  // const [User, setUser] = useState(true);
  // const [darkMode,setDarkMode] = useState(false);
const [darkMode,setDarkMode] = useState(()=>{ return localStorage.getItem("theme") === "true";});

useEffect(() => {
    localStorage.setItem("theme", darkMode);
  }, [darkMode]);

const {currentUser} = useSelector((state)=> state.user);

  return (
    <ThemeProvider theme={darkMode?darkTheme:lightTheme}>
      <BrowserRouter>
     {currentUser?(
      <Container>
        <Navbar currentUser={currentUser} darkMode={darkMode} setDarkMode={setDarkMode} />
        <Routes>
          <Route  path="/" element={< Dashboard />} />
          <Route  path="/workouts" exact element={< Workouts />} />
          <Route  path="/tutorials" exact element={< Tutorials />} />
          <Route  path="/blogs" exact element={< Blogs />} />
          <Route  path="/profile/:id" element={<Profile />} />
          <Route  path="/contact" element={<Contact />} />
          
        </Routes>
      </Container>):
     ( <Container>
        <Authentication />
      </Container>)}

      </BrowserRouter>
   </ThemeProvider>
  )
}

export default App
