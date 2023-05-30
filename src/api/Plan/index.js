import axios from "axios";
import { baseURL } from "../../utility";

export async function createPlanGPT(id, WeightGoal, TypeWorkout, FitnessLevel, ActivityLevel, Day) { 
    return await axios.post(`${baseURL}/api/gpt/generates-workout-plan`, {
        "PersonId": id,
        "WeightGoal": WeightGoal,
        "TypeWorkout": TypeWorkout,
        "FitnessLevel": FitnessLevel,
        "ActivityLevel": ActivityLevel,
        "Day": Day
    });
}