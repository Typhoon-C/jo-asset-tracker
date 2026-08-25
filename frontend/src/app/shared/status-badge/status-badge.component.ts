import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-status-badge',
  standalone: true,
  template: `
    <span class="badge" [class]="statusClass">
      {{ status }}
    </span>
  `,
  styles: `
    .badge {
      display: inline-flex;
      align-items: center;
      padding: 0.38rem 0.7rem;
      border-radius: 999px;
      font-size: 0.75rem;
      font-weight: 700;
      letter-spacing: 0.02em;
      border: 1px solid transparent;
      text-transform: uppercase;
    }

    .badge.active,
    .badge.resolved,
    .badge.open {
      background: rgba(34, 197, 94, 0.15);
      border-color: rgba(34, 197, 94, 0.4);
      color: #86efac;
    }

    .badge.in-repair,
    .badge.in-progress {
      background: rgba(245, 158, 11, 0.15);
      border-color: rgba(245, 158, 11, 0.4);
      color: #fcd34d;
    }

    .badge.pending,
    .badge.waiting {
      background: rgba(96, 165, 250, 0.14);
      border-color: rgba(96, 165, 250, 0.4);
      color: #bfdbfe;
    }

    .badge.retired,
    .badge.critical {
      background: rgba(239, 68, 68, 0.12);
      border-color: rgba(239, 68, 68, 0.4);
      color: #fca5a5;
    }
  `
})
export class StatusBadgeComponent {
  @Input() status: string = '';

  get statusClass(): string {
    return this.status.toLowerCase().replace(/\s+/g, '-');
  }
}
