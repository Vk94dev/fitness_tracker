import React,{useState} from 'react'
import styled from 'styled-components'
import TextInput from './TextInput';
import Button from './Button';


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


const AddWorkout = ({workout,handleChange,addNewWorkout,buttonLoading}) => {
  return (

     <Card>
      <Title>Add New Workout</Title>
       {/* <TextInput 
        label="Workout"
        textArea
        rows={10}
        placeholder={`Enter in this format;
           $Category
           -Workout Name
           -Sets
           -Reps
           -Weight
           -Duration `}
           value={Workout}
           handleChange={(e)=>setWorkout(e.target.value)}
       /> */}

<TextInput small placeholder="Category" name="category" value={workout.category} handleChange={handleChange} />
<TextInput small placeholder="Workout Name" name="workoutName" value={workout.workoutName} handleChange={handleChange} />
<TextInput small placeholder="Sets" name="sets" value={workout.sets} handleChange={handleChange}/>
<TextInput small placeholder="Reps" name="reps" value={workout.reps} handleChange={handleChange}/>
<TextInput small placeholder="Weight" name="weight" value={workout.weight} handleChange={handleChange} />
<TextInput small placeholder="Duration" name="duration" value={workout.duration} handleChange={handleChange}/>

       <Button 
          text="Add Workout"
          small
          onClick={()=>addNewWorkout()}
          isLoading={buttonLoading}
          isDisabled={buttonLoading}
       />
     </Card>
  )
}

export default AddWorkout

