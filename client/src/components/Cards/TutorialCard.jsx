import React from 'react'
import styled from "styled-components";



const Card = styled.div`
width:235px;
min-height:250px;
max-height:300px;
padding: 24px;
display:flex;
flex-direction:column;
// min-gap:6px;
// min-gap:15px;
gap:6px;
overflow:hidden;
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

// const Card = styled.div`
//   width: 260px;
//   border-radius: 12px;
//   overflow: hidden;
//   background: ${({ theme }) => theme.card};
//   box-shadow: 0 4px 12px ${({ theme }) => theme.shadow};
//   cursor: pointer;
//   transition: 0.3s;

//   &:hover {
//     transform: scale(1.05);
//   }
// `;

const Thumbnail = styled.div`
  position: relative;
`;

const Image = styled.img`
  width: 100%;
  height: 150px;
  object-fit: cover;
`;

const PlayIcon = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 30px;
  color: white;
`;

const Content = styled.div`
  padding: 5px;
`;

const Title = styled.h3`
  margin: 0;
  color: ${({ theme }) => theme.text_primary};
`;

const Desc = styled.p`
  font-size: 15px;
  
   display: -webkit-box;
 -webkit-line-clamp: 3;
 -webkit-box-orient: vertical;
  overflow:hidden;
  color: ${({ theme }) => theme.text_secondary};

`;



const TutorialCard = ({ item, onClick }) => {
  return (
  
    <Card onClick={() => onClick(item.video)}>
      <Thumbnail>
        <Image src={item.thumbnail} alt={item.title} />
        <PlayIcon>▶</PlayIcon>
      </Thumbnail>

      <Content>
        <Title>{item.title}</Title>
        <Desc>{item.description}</Desc>
      </Content>
      {/* <a href="/videos/pushup.mp4" download="pushup.mp4">
  <button>Download</button>
</a> */}
    </Card>
  
  );
};

export default TutorialCard
