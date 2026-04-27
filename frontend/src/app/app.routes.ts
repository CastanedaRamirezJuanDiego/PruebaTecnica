import { Routes } from '@angular/router';

import { KanbanBoardComponent } from './tasks/kanban-board.component';

export const routes: Routes = [
  {
    path: '',
    component: KanbanBoardComponent,
  },
];
