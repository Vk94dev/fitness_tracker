import { FitnessCenterRounded, TimelapseRounded } from '@mui/icons-material'
import React from 'react'
import styled from 'styled-components'

const Card =styled.div`
flex:1;
min-width:250px;
max-width:400px;
// width:250px;
padding: 16px 18px;
display:flex;
flex-direction:column;
gap:6px;
border:1px solid ${({theme})=> theme.text_primary+20};
border-radius:14px;
box-shadow : 1px 6px 20px 0px ${({theme})=> theme.primary+15};
@media (max-width:600px){
padding:12px 14px;
}
`;

const Category =styled.div`
width:fit-content;
font-size:16px;
color:${({theme})=>theme.primary};
font-weight:500;
padding:4px 10px;
border-radius:8px;
display:inline;

`;

const Name =styled.div`
font-size:20px;
color:${({theme})=>theme.text_primary};
font-weight:600;
`;

const Sets =styled.div`
font-size:15px;
color:${({theme})=>theme.text_secondary};
font-weight:500;
display:flex;
gap:5px;
`;

const Flex =styled.div`
display:flex;
gap:16px;
`;

const Details =styled.div`
font-size:16px;
color:${({theme})=>theme.text_primary};
font-weight:500;
display:flex;
align-items:center;
gap:6px;
`;





const WorkoutCard = ({workout}) => {
 if(!workout) return null;

  return (
   <Card>
    <div>
    <Category>#{workout?.category}</Category>
    </div>
    <Name>{workout?.workoutName}</Name>
    <Sets>Count: {workout?.sets} sets X {workout?.reps} reps</Sets>
    <Flex>
        <Details>
             <FitnessCenterRounded sx={{fontSize:"20px" }} />
             {workout?.weight} kg
        </Details>
        <Details>
             <TimelapseRounded sx={{fontSize:"20px" }} />
            {workout?.duration} min
        </Details>
    </Flex>
   </Card>
  )
}

export default WorkoutCard
