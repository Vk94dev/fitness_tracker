
import React from 'react'
import styled from 'styled-components'
import BlogCard from '../components/Cards/BlogCard';

const Container = styled.div`
 flex:1;
 height:100%;
 width:100%;
 display:flex;
 flex-wrap:wrap;
flex-direction:row;
gap:10px;
 justify-content:start;
 padding: 22px 8px;
 overflow-y:scroll;
&::-webkit-scrollbar {
    display: none;
  };
`;




const Blogs = () => {
  return (
   <Container>
  <BlogCard   />
   </Container>
  )
}

export default Blogs
