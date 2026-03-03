import { Component, input, output } from '@angular/core';
import { Filter } from '../../task.model';

@Component({
  selector: 'app-filter-bar',
  imports: [],
  template: `
    <div class="filter-bar">
      @for (f of filters; track f.key) {
        <button
          class="filter-btn"
          [class.active]="current() === f.key"
          (click)="change.emit(f.key)"
        >
          {{ f.label }}
        </button>
      }
    </div>
  `,
  styles: ``,
})
export class FilterBar {
  current = input.required<Filter>();
  counts = input.required<{ total: number; active: number; completed: number }>();
  change = output<Filter>();

  get filters() {
    const c = this.counts();
    return [
      { key: 'all' as Filter, label: `All (${c.total})` },
      { key: 'active' as Filter, label: `Active (${c.active})` },
      { key: 'completed' as Filter, label: `Completed (${c.completed})` },
    ];
  }
}
