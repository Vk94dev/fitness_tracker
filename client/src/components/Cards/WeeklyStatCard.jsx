import React from 'react'
import styled from 'styled-components'
import { BarChart } from '@mui/x-charts/BarChart';
import { useTheme } from 'styled-components';

const Card = styled.div`
flex:1;
min-width:200px;
padding: 24px;
display:flex;
flex-direction:column;
gap:6px;
border:1px solid ${({theme})=> theme.text_primary+20};
border-radius:14px;
box-shadow : 1px 6px 20px 0px ${({theme})=> theme.primary+15};
@media (max-width:600px){
padding:16px;
}
`;
const Title = styled.div`
font-weight:600;
font-size:16px;
color:${({theme})=>theme.primary};
@media (max-width:600px){
font-size:14px;
}
`;


const WeeklyStatCard = ({data}) => {

   const theme = useTheme();

  return (
     <Card>
      <Title>Weekly Calories Burned</Title>
       {data?.totalWeeksCaloriesBurnt && ( <BarChart 
       xAxis={[{scaleType:"band",data:data?.totalWeeksCaloriesBurnt?.weeks},]} 
       series= {[{data: data?.totalWeeksCaloriesBurnt?.caloriesBurned}]}
        height= {300}
        
         sx={{
            "& .MuiChartsAxis-root": {
              stroke: theme.text_primary,
            },
            "& .MuiChartsAxis-tickLabel": {
              fill: theme.text_primary,
            },
            "& .MuiChartsAxis-line": {
              stroke: theme.text_primary,
            },
            "& .MuiChartsGrid-line": {
              stroke: theme.text_secondary,
               opacity: 0.2,
            },
          }}


        />)}
     </Card>
  )
}

export default  WeeklyStatCard
