import { isPlatformBrowser, NgTemplateOutlet } from '@angular/common';
import { Component, OnInit, PLATFORM_ID, inject } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { Task, TaskStatus } from './task.model';
import { TaskStore } from './task.store';

@Component({
  selector: 'app-kanban-board',
  imports: [NgTemplateOutlet, ReactiveFormsModule],
  templateUrl: './kanban-board.component.html',
  styleUrl: './kanban-board.component.css',
})
export class KanbanBoardComponent implements OnInit {
  readonly store = inject(TaskStore);
  private readonly fb = inject(NonNullableFormBuilder);
  private readonly platformId = inject(PLATFORM_ID);

  readonly taskForm = this.fb.group({
    title: ['', [Validators.required]],
    description: [''],
    complexity: [1, [Validators.required, Validators.min(1)]],
    urgency: [1, [Validators.required, Validators.min(1)]],
    status: ['todo' as TaskStatus, [Validators.required]],
  });

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.store.loadTasks();
    }
  }

  createTask(): void {
    if (this.taskForm.invalid) {
      this.taskForm.markAllAsTouched();
      return;
    }

    const value = this.taskForm.getRawValue();

    this.store.createTask({
      title: value.title.trim(),
      description: value.description.trim() || null,
      complexity: value.complexity,
      urgency: value.urgency,
      status: value.status,
    });

    this.taskForm.reset({
      title: '',
      description: '',
      complexity: 1,
      urgency: 1,
      status: 'todo',
    });
  }

  moveTask(task: Task, status: TaskStatus): void {
    this.store.moveTask(task, status);
  }
}
