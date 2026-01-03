export type CompletionStatus = 'completed' | 'not_completed' | 'not_answered'

export type Task = {
    id: string;
    description: string;
    difficulty: number; // 1-10
    priority: number; // 1-10
    completion: CompletionStatus;
};

export type DailySummary = {
    date: string;
    tasks: Task[];
    productivityPercentage: number;
};
