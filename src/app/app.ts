import { Component, computed, signal } from '@angular/core';
import { Task, Filter, Priority } from './task.model';
import { TaskForm } from './components/task-form/task-form';
import { TaskList } from './components/task-list/task-list';
import { FilterBar } from './components/filter-bar/filter-bar';

@Component({
  selector: 'app-root',
  imports: [TaskForm, TaskList, FilterBar],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  private nextId = 4;

  tasks = signal<Task[]>([
    { id: 1, title: 'Learn Angular signals', completed: true, priority: 'high' },
    { id: 2, title: 'Build a sample app', completed: false, priority: 'high' },
    { id: 3, title: 'Style with CSS', completed: false, priority: 'medium' },
  ]);

  filter = signal<Filter>('all');

  stats = computed(() => ({
    total: this.tasks().length,
    completed: this.tasks().filter(t => t.completed).length,
    active: this.tasks().filter(t => !t.completed).length,
  }));

  filteredTasks = computed(() => {
    const f = this.filter();
    return this.tasks().filter(t => {
      if (f === 'active') return !t.completed;
      if (f === 'completed') return t.completed;
      return true;
    });
  });

  addTask({ title, priority }: { title: string; priority: Priority }) {
    this.tasks.update(tasks => [
      ...tasks,
      { id: this.nextId++, title, completed: false, priority },
    ]);
  }

  toggleTask(id: number) {
    this.tasks.update(tasks =>
      tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t)
    );
  }

  deleteTask(id: number) {
    this.tasks.update(tasks => tasks.filter(t => t.id !== id));
  }
}
