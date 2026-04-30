import API from "./api.js";

export const UserSignUp = async (data)=> API.post("/user/signUp",data);

export const UserSignIn = async (data)=> API.post("/user/signIn",data);

export const getDashboardDetails = async ()=> API.get("/user/dashboard");

export const getWorkouts = async (date)=>  API.get(`/user/workout`,{
    params: date ? {date}:{},
});

export const addWorkout = async (data)=> API.post("/user/workout",data);

export const getUser = async (id) => API.get(`/user/${id}`); 

export const addContact = async (form)=> API.post('/user/contact',form);



