import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map } from 'rxjs';

import { CreateTaskPayload, Task, UpdateTaskPayload } from './task.model';

const API_BASE_URL = 'http://localhost:8000/api';

type TaskApiResponse = Omit<Task, 'priority_score'> & {
  priority_score: number | string;
};

interface PaginatedTasksResponse {
  data: TaskApiResponse[];
}

type TasksResponse = TaskApiResponse[] | PaginatedTasksResponse;
type SingleTaskResponse = TaskApiResponse | { data: TaskApiResponse };

@Injectable({
  providedIn: 'root',
})
export class TaskApiService {
  private readonly http = inject(HttpClient);

  getTasks() {
    return this.http
      .get<TasksResponse>(`${API_BASE_URL}/tasks`)
      .pipe(map((response) => this.extractTasks(response)));
  }

  createTask(payload: CreateTaskPayload) {
    return this.http
      .post<SingleTaskResponse>(`${API_BASE_URL}/tasks`, payload)
      .pipe(map((response) => this.extractTask(response)));
  }

  updateTask(id: number, payload: UpdateTaskPayload) {
    return this.http
      .patch<SingleTaskResponse>(`${API_BASE_URL}/tasks/${id}`, payload)
      .pipe(map((response) => this.extractTask(response)));
  }

  deleteTask(id: number) {
    return this.http.delete<void>(`${API_BASE_URL}/tasks/${id}`);
  }

  private extractTasks(response: TasksResponse): Task[] {
    const tasks = Array.isArray(response) ? response : response.data;

    return tasks.map((task) => this.normalizeTask(task));
  }

  private extractTask(response: SingleTaskResponse): Task {
    const task = 'data' in response ? response.data : response;

    return this.normalizeTask(task);
  }

  private normalizeTask(task: TaskApiResponse): Task {
    return {
      ...task,
      priority_score: Number(task.priority_score),
    };
  }
}
