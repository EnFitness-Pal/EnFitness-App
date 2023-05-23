import axios from "axios";
import { baseURL } from "../../utility";

export function createPlanGPT(WeightGoal, TypeWorkout, FitnessLevel, ActivityLevel, Day) { 
    return axios.post(`${baseURL}/api/gpt/generates-workout-plan`, {
        "WeightGoal": WeightGoal,
        "TypeWorkout": TypeWorkout,
        "FitnessLevel": FitnessLevel,
        "ActivityLevel": ActivityLevel,
        "Day": Day
    });
}