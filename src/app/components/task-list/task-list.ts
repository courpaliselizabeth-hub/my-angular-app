import { Component, input, output } from '@angular/core';
import { Task } from '../../task.model';

@Component({
  selector: 'app-task-list',
  imports: [],
  template: `
    <ul class="task-list">
      @for (task of tasks(); track task.id) {
        <li class="task-item" [class.completed]="task.completed" [class]="'priority-' + task.priority">
          <input
            type="checkbox"
            class="task-checkbox"
            [checked]="task.completed"
            (change)="toggle.emit(task.id)"
          />
          <span class="task-title">{{ task.title }}</span>
          <span class="priority-badge" [class]="task.priority">{{ task.priority }}</span>
          <button class="btn-delete" (click)="delete.emit(task.id)" aria-label="Delete task">✕</button>
        </li>
      }
    </ul>
    @if (tasks().length === 0) {
      <p class="empty-state">No tasks to show.</p>
    }
  `,
  styles: ``,
})
export class TaskList {
  tasks = input.required<Task[]>();
  toggle = output<number>();
  delete = output<number>();
}
