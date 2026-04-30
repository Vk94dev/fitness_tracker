import React,{useEffect, useState} from 'react'
import styled from 'styled-components';
import {counts} from '../utils/data'
import CountsCard from '../components/Cards/CountsCard';
import WeeklyStatCard from '../components/Cards/WeeklyStatCard';
import CategoryChart from '../components/Cards/CategoryChart';
import AddWorkout from '../components/AddWorkout';
import WorkoutCard from '../components/Cards/WorkoutCard'
import {getDashboardDetails,getWorkouts,addWorkout} from '../api';
import { useSelector } from 'react-redux';


const Container = styled.div`
 flex:1;
 height:100%;
 display:flex;
 justify-content:center;
 padding: 22px 0px;
 overflow-y:scroll;
&::-webkit-scrollbar {
    display: none;
  };
`;
const Wrapper = styled.div`
flex:1;
max-width:1400px;
display:flex;
flex-direction:column;
gap:22px;
@media (max-width:600px){
gap:12px;
}
`;
const Title = styled.div`
padding:0 16px;
font-size:20px;
color:${({theme})=> theme.text_primary};
font-weight:550;
`;
const FlexWrap = styled.div`
display:flex;
flex-wrap:wrap;
justify-content:space-between;
gap:22px;
padding:0px 16px;
@media (max-width: 600px){
gap:12px;
}
`;

const CardWrapper = styled.div`
display:flex;
flex-wrap:wrap;
 justify-content:center;
 gap:20px;
 margin-bottom:100px;
 @media (max-width:600px){
  gap:12px;
 }
`;


const Section = styled.div`
display:flex;
flex-direction:column;
gap:22px;
padding:0px 16px;
@media (max-width:600px){
gap:12px
}
`;




const Dashboard = () => {

   const [workout,setWorkout] = useState({
    category: "",
  workoutName: "",
  sets: "",
  reps: "",
  weight: "",
  duration: "",
   })

  const { currentUser } =useSelector((state)=>state.user);

const [loading,setLoading] = useState(false);
// const [data,setData] = useState({
//      totalCaloriesBurnt: 13500,
//   totalWorkouts: 6,
//   avgCaloriesBurntPerWorkout: 2250,

//   totalWeeksCaloriesBurnt: {
//     weeks: ["17th", "18th", "19th", "20th", "21st", "22nd", "23rd"],
//     caloriesBurned: [10500, 12000, 9800, 14000, 12500, 15000,2300],
//   },

//   pieChartData: [
//     {
//       id: 0,
//       value: 6000,
//       label: "Legs",
//     },
//     {
//       id: 1,
//       value: 3500,
//       label: "Chest",
//     },
//     {
//       id: 2,
//       value: 2000,
//       label: "Arms",
//     },
//     {
//       id: 3,
//       value: 2000,
//       label: "Back",
//     },
//   ],

//  });
 
const [data,setData] = useState(null);

const [buttonLoading, setButtonLoading] = useState(false);
const [todaysWorkouts,setTodaysWorkouts] = useState([]);
//  const [workout,setWorkout]  =useState(`#Legs
// -Back Squat
// -5 setsX15 reps
// -30 kg
// -10 min`);

const dashboardData = async ()=>{
  try{
  setLoading(true);
  await getDashboardDetails().then((res)=>{
    setData(res.data);
    // console.log(res.data);
     });
  }catch(err){
    console.error(err);
    alert("failed to load dashboard");
  }finally{
    setLoading(false);
  }
};

const getTodaysWorkout = async ()=>{
  setLoading(true);
  await getWorkouts("").then((res)=>{
    setTodaysWorkouts(res?.data?.todaysWorkouts);
    // console.log(res.data);
    setLoading(false);
  })
};

// const addNewWorkout = async ()=>{
//   setButtonLoading(true);
//   await addWorkout({workoutString:workout})
//   .then((res)=>{
//     dashboardData();
//     getTodaysWorkout();
//     setButtonLoading(false);
//   })
//   .catch((err)=>{
//     alert(err);
//     setButtonLoading(false);
//   })
// };

const addNewWorkout = async ()=>{
  setButtonLoading(true);

// const workoutString = `
// ${workout.category}
// ${workout.workoutName}
// ${workout.sets}
// ${workout.reps}
// ${workout.weight}
// ${workout.duration}
// `;


//   console.log("data",workoutString);
//   await addWorkout({workoutString})
console.log(workout);
await addWorkout(workout)
  .then((res)=>{
    dashboardData();
    getTodaysWorkout();
     setWorkout({
      category: "",
      workoutName: "",
      sets: "",
      reps: "",
      weight: "",
      duration: "",
    });
    setButtonLoading(false);
  })
  .catch((err)=>{
    alert(err);
    setButtonLoading(false);
  })
};

const handleChange = (e) => {
  setWorkout({
    ...workout,
    [e.target.name]: e.target.value,
  });
};

useEffect(()=>{
  if(currentUser){
  dashboardData();
  getTodaysWorkout();
  }
},[currentUser]);





  return (
   <Container>
    <Wrapper>
        <Title>Dashboard</Title>
        <FlexWrap>
            {counts.map((item)=>(
                <CountsCard item = {item} data={data} />
            ))}
        </FlexWrap>
       <FlexWrap>
           <WeeklyStatCard data={data} />
           <CategoryChart data={data} />
           <AddWorkout  workout={workout} handleChange = {handleChange} addNewWorkout ={addNewWorkout} buttonLoading = {buttonLoading}/>
        </FlexWrap>         
         <Section>
          <Title>Todays Workouts</Title>
           <CardWrapper>
          {todaysWorkouts.map((workout)=>(
               <WorkoutCard workout={workout}/>
          ))}
           </CardWrapper>

         </Section>

    </Wrapper>
   </Container>
  )
}

export default Dashboard
