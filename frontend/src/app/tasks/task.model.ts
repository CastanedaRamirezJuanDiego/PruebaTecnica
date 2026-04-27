export type TaskStatus = 'todo' | 'doing' | 'done';

export interface Task {
  id: number;
  title: string;
  description: string | null;
  complexity: number;
  urgency: number;
  priority_score: number;
  status: TaskStatus;
}

export interface CreateTaskPayload {
  title: string;
  description: string | null;
  complexity: number;
  urgency: number;
  status: TaskStatus;
}

export type UpdateTaskPayload = Partial<CreateTaskPayload>;
