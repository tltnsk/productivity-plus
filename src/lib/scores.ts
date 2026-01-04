import {Task} from "./types"

// calculate importance of each task 

// later add option for user to prioritize tasks based on 
// difficulty or priority and implement different calculation logic
export const getTaskImportance = (task: Task): number => {
    const score = (task.difficulty * (task.priority + 10)) / 100;
    return score;
}

// calculate overall daily productivity
export const calculateProductivityScore = (tasks: Task[]): number => {
    if (tasks.length === 0) return 0;
    let allTaskScore = 0;
    let completedTaskScore = 0;

    tasks.forEach((task)  => {
        const taskWeight = getTaskImportance(task);

        allTaskScore += taskWeight;

        if (task.completion === 'completed') {
            completedTaskScore += taskWeight;
        } 
    });
    return Math.round((completedTaskScore / allTaskScore) * 100);
}