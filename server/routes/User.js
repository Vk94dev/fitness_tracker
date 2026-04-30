import express from "express"
import { UserRegister ,UserLogin,getUserDashboard, getWorkoutsByDate, addWorkout, deleteWorkout, updateWorkout,getUserById} from "../controllers/User.js";
import {googleAuth} from "../controllers/User.js";
import { verifyToken } from "../middleware/verifyToken.js";
import { addContact } from "../controllers/User.js";
// import {addTutorial,getTutorials} from "../controllers/Tutotial.js";


const router = express.Router();


router.post("/signUp" , UserRegister);
router.post("/signIn", UserLogin);
router.post("/authWithGoogle",googleAuth);

router.get("/dashboard",verifyToken,getUserDashboard);
router.get("/workout",verifyToken,getWorkoutsByDate);
router.post("/workout",verifyToken,addWorkout);
router.delete("/workout/:id",verifyToken,deleteWorkout);
router.put("/workout/:id",verifyToken,updateWorkout);

router.get("/:id",verifyToken,getUserById);
router.post("/contact",verifyToken,addContact);

// router.post("/tutorial",verifyToken,addTutorial);
// router.get("/tutorial",verifyToken,getTutorials);

export default router;

