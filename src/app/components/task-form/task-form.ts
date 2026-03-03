import { Component, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Priority } from '../../task.model';

@Component({
  selector: 'app-task-form',
  imports: [FormsModule],
  template: `
    <form class="task-form" (ngSubmit)="submit()">
      <input
        type="text"
        class="task-input"
        placeholder="Add a new task..."
        [(ngModel)]="title"
        name="title"
      />
      <select class="priority-select" [(ngModel)]="priority" name="priority">
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
      <button type="submit" class="btn-add">Add</button>
    </form>
  `,
  styles: ``,
})
export class TaskForm {
  title = '';
  priority: Priority = 'medium';

  add = output<{ title: string; priority: Priority }>();

  submit() {
    const trimmed = this.title.trim();
    if (!trimmed) return;
    this.add.emit({ title: trimmed, priority: this.priority });
    this.title = '';
    this.priority = 'medium';
  }
}
