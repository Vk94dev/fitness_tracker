import React from 'react'
import styled from 'styled-components'

const Card = styled.div`
width:235px;
min-height:200px;
max-height:300px;
padding: 24px;
display:flex;
flex-direction:column;
min-gap:6px;
min-gap:15px;
border:1px solid ${({theme})=> theme.text_primary+20};
border-radius:14px;
box-shadow : 1px 6px 20px 0px ${({theme})=> theme.primary+15};
@media (max-width:600px){
padding:16px;
};
  &:hover {
    transform: scale(1.05);
  }
`;


const BlogCard = () => {
  return (
    <Card>
        
    </Card>
  )
}

export default BlogCard
