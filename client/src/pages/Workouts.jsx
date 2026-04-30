import React,{useState,useEffect} from 'react'
import styled from 'styled-components'
import WorkoutCard from '../components/Cards/WorkoutCard';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {DateCalendar} from '@mui/x-date-pickers';
import { getWorkouts } from '../api';
import { CircularProgress } from '@mui/material';
import { useDispatch } from 'react-redux';


const Container = styled.div`
flex:1;
height:100%;
display:flex;
justify-content:center;
padding:22px 0px;
overflow-y:scroll;
&::-webkit-scrollbar{
display:none
};
`;
const Wrapper = styled.div`
flex:1;
max-width:1600px;
display:flex;
gap:22px;
padding:0px 16px;
@media (max-width:600px){
gap:12px;
flex-direction:column;
}
`;

const Left = styled.div`
flex:0.2;
height:fit-content;
padding:18px;
border:1px solid ${({theme})=>theme.text_primary+20};
border-radius:14px;
box-shadow: 1px 6px 20px 0px ${({theme})=>theme.primary +15};
`;

const Title = styled.div`
font-weight:600;
font-size:16px;
color:${({theme})=>theme.primary};
@media (max-width: 600px){
font-size:14px
}
`;

const Right = styled.div`
flex:1;
`;

const Section = styled.div`
display:flex;
flex-direction:column;
padding:0px 16px;
gap:22px;
@media (max-width:600px){
gap:12px;
}
`;

const SecTitle = styled.div`
font-size:22px;
color:${({theme})=>theme.text_primary};
font-weight:500;
`;

const CardWrapper = styled.div`
display:flex;
flex-wrap:wrap;
justify-content:start;
gap:20px;
margin-bottom:100px;
@media (max-width:600px){
gap:12px;
}
`;


const CalendarWrapper = styled.div`
  .MuiDateCalendar-root {
    background-color: ${({ theme }) => theme.card};
    color: ${({ theme }) => theme.text_primary} !important;
  }

  .MuiYearCalendar-root {
    background-color: ${({ theme }) => theme.card} !important;
    scrollbar-width: thin;
    scrollbar-color: ${({ theme }) => theme.primary} transparent;
  }

  .MuiYearCalendar-root::-webkit-scrollbar {
    width: 4px;
  }
  .MuiYearCalendar-root::-webkit-scrollbar-track {
    background: transparent;
  }
  .MuiYearCalendar-root::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.primary};
    border-radius: 4px;
  }

  .MuiPickersYear-yearButton {
    color: ${({ theme }) => theme.text_primary} !important;
    background-color: transparent !important;
    font-size: 14px !important;
    font-weight: 500 !important;
    opacity: 1 !important;
  }

  .MuiPickersYear-yearButton.Mui-selected {
    background-color: ${({ theme }) => theme.primary} !important;
    color: #ffffff !important;
    font-weight: 700 !important;
    opacity: 1 !important;
  }

  .MuiPickersYear-yearButton:hover {
    background-color: ${({ theme }) => theme.primary + "30"} !important;
    color: ${({ theme }) => theme.text_primary} !important;
    opacity: 1 !important;
  }

  .MuiPickersYear-yearButton.Mui-disabled {
    color: ${({ theme }) => theme.text_secondary} !important;
    opacity: 0.4 !important;
  }

  .MuiPickersYear-yearButton:not(.Mui-selected) {
    color: ${({ theme }) => theme.text_primary} !important;
    opacity: 1 !important;
  }

  .MuiPickersDay-root {
    color: ${({ theme }) => theme.text_primary} !important;
  }

  .MuiPickersDay-root.Mui-selected {
    background-color: ${({ theme }) => theme.primary} !important;
    color: #ffffff !important;
  }

  .MuiPickersDay-root:hover {
    background-color: ${({ theme }) => theme.primary + "20"} !important;
  }

  .MuiPickersDay-root.MuiPickersDay-today {
    border: 1px solid ${({ theme }) => theme.primary};
  }

  .MuiPickersCalendarHeader-root {
    background-color: ${({ theme }) => theme.card} !important;
  }

  .MuiPickersCalendarHeader-label {
    color: ${({ theme }) => theme.text_primary} !important;
    font-weight: 500;
  }

  .MuiPickersArrowSwitcher-button {
    color: ${({ theme }) => theme.text_primary} !important;
  }

  .MuiDayCalendar-weekDayLabel {
    color: ${({ theme }) => theme.text_secondary} !important;
  }

  .MuiPickersDay-root.Mui-disabled {
    color: ${({ theme }) => theme.text_secondary} !important;
    opacity: 0.5;
  }

  .MuiDayCalendar-root,
  .MuiDayCalendar-slideTransition {
    background-color: ${({ theme }) => theme.card} !important;
  }

  .MuiSvgIcon-root {
    fill: ${({ theme }) => theme.text_primary} !important;
  }
`;

const Workouts = () => {

const dispatch = useDispatch();
const [todaysWorkouts,setTodaysWorkouts] = useState([]);
const [loading,setLoading] = useState(false);
const [date,setDate] = useState("");


const getTodaysWorkout = async ()=>{
  setLoading(true);
  const token = localStorage.getItem("fittrack-app-token");
  await getWorkouts(date?`?date=${encodeURIComponent(date)}`:"").then((res)=>{
    setTodaysWorkouts(res?.data?.todaysWorkouts);
      // console.log(res.data);
      setLoading(false);
  })
  .catch((err)=>{
    alert(err);
    setLoading(false);
  })
}

 useEffect(() => {
    getTodaysWorkout();
  }, [date]);

  return (
    <Container>
      <Wrapper>
        <Left>
          <Title>Select Date</Title>
          {/* <LocalizationProvider dateAdapter={AdapterDayjs} >
            <DateCalendar onChange={(e)=>setDate(`${e.$y}-${e.$M + 1}-${e.$D}`)} />
          </LocalizationProvider> */}


        <LocalizationProvider dateAdapter={AdapterDayjs}>
  <CalendarWrapper>
    <DateCalendar
      onChange={(e) =>
        setDate(`${e.$y}-${e.$M + 1}-${e.$D}`)
      }
    />
  </CalendarWrapper>
</LocalizationProvider>

        </Left>
        <Right>
          <Section>
            <SecTitle>Todays Workout</SecTitle>
            {loading?(<CircularProgress />):(<CardWrapper>
              {todaysWorkouts.map((workout)=>(
                <WorkoutCard workout={workout}/>
              ))}
            </CardWrapper>
            )}
          </Section>
        </Right>
      </Wrapper>
    </Container>
  )
}

export default Workouts
