export interface TaskParams {
    id: string;
    title: string;
    date: string;
    description?: string;
    status: string;
    category?: string;
    assignee?: string[];
    comment?: string;
    creator?: string;
};