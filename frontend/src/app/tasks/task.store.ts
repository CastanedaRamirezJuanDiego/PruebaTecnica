import { computed, inject, Injectable, signal } from '@angular/core';
import { finalize } from 'rxjs';

import { CreateTaskPayload, Task, TaskStatus } from './task.model';
import { TaskApiService } from './task-api.service';

@Injectable({
  providedIn: 'root',
})
export class TaskStore {
  private readonly taskApi = inject(TaskApiService);

  readonly tasks = signal<Task[]>([]);
  readonly loading = signal(false);
  readonly saving = signal(false);
  readonly error = signal<string | null>(null);

  readonly todoTasks = computed(() => this.tasks().filter((task) => task.status === 'todo'));
  readonly doingTasks = computed(() => this.tasks().filter((task) => task.status === 'doing'));
  readonly doneTasks = computed(() => this.tasks().filter((task) => task.status === 'done'));

  loadTasks(): void {
    this.loading.set(true);
    this.error.set(null);

    this.taskApi
      .getTasks()
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: (tasks) => this.tasks.set(tasks),
        error: () => this.error.set('No se pudieron cargar las tareas.'),
      });
  }

  createTask(payload: CreateTaskPayload): void {
    this.saving.set(true);
    this.error.set(null);

    this.taskApi
      .createTask(payload)
      .pipe(finalize(() => this.saving.set(false)))
      .subscribe({
        next: (task) => this.tasks.update((tasks) => [...tasks, task]),
        error: () => this.error.set('No se pudo crear la tarea.'),
      });
  }

  moveTask(task: Task, status: TaskStatus): void {
    if (task.status === status) {
      return;
    }

    this.error.set(null);

    this.taskApi.updateTask(task.id, { status }).subscribe({
      next: (updatedTask) => {
        this.tasks.update((tasks) =>
          tasks.map((currentTask) => (currentTask.id === updatedTask.id ? updatedTask : currentTask)),
        );
      },
      error: () => this.error.set('No se pudo mover la tarea.'),
    });
  }

  deleteTask(id: number): void {
    this.error.set(null);

    this.taskApi.deleteTask(id).subscribe({
      next: () => this.tasks.update((tasks) => tasks.filter((task) => task.id !== id)),
      error: () => this.error.set('No se pudo eliminar la tarea.'),
    });
  }
}
