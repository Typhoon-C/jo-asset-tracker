import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { serviceRequests } from '../../core/mock-data';
import { StatusBadgeComponent } from '../../shared/status-badge/status-badge.component';

@Component({
  selector: 'app-service-requests',
  standalone: true,
  imports: [StatusBadgeComponent, RouterLink],
  template: `
    <section class="page-header">
      <div>
        <p class="eyebrow">Support</p>
        <h1>Service requests</h1>
      </div>
      <button class="primary-button" routerLink="/service-requests/new">New ticket</button>
    </section>

    <section class="panel">
      <div class="toolbar">
        <button class="filter active">All</button>
        <button class="filter">Open</button>
        <button class="filter">In progress</button>
        <button class="filter">Resolved</button>
      </div>

      <div class="list">
        @for (request of serviceRequests; track request.id) {
          <a [routerLink]="['/service-requests', request.id]" class="request-row link">
            <div>
              <span class="request-id">{{ request.id }}</span>
              <h3>{{ request.title }}</h3>
              <p>{{ request.requester }} • {{ request.asset }}</p>
            </div>
            <div class="meta">
              <span class="priority {{ request.priority.toLowerCase() }}">{{ request.priority }}</span>
              <app-status-badge [status]="request.status" />
              <small>{{ request.createdAt }}</small>
            </div>
          </a>
        }
      </div>
    </section>
  `,
  styles: `
    :host {
      display: block;
      width: 100%;
    }

    .page-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 2rem;
      gap: 1rem;
    }

    .eyebrow {
      margin: 0 0 0.4rem;
      font-size: 0.72rem;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      color: #93c5fd;
      font-weight: 700;
    }

    h1 {
      margin: 0;
      font-size: clamp(2rem, 4vw, 2.6rem);
    }

    .primary-button,
    .filter {
      border: none;
      border-radius: 10px;
      color: white;
      padding: 0.75rem 1rem;
      font-weight: 700;
      cursor: pointer;
    }

    .primary-button {
      background: linear-gradient(135deg, #3b82f6, #2563eb);
    }

    .filter {
      background: rgba(148, 163, 184, 0.12);
      border: 1px solid rgba(148, 163, 184, 0.14);
    }

    .filter.active {
      background: rgba(59, 130, 246, 0.16);
      border-color: rgba(96, 165, 250, 0.4);
      color: #dbeafe;
    }

    .panel {
      background: rgba(15, 23, 42, 0.72);
      border: 1px solid rgba(148, 163, 184, 0.18);
      border-radius: 18px;
      padding: 1.2rem;
    }

    .toolbar {
      display: flex;
      gap: 0.6rem;
      flex-wrap: wrap;
      margin-bottom: 1rem;
    }

    .list {
      display: grid;
      gap: 1rem;
    }

    .request-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 1rem;
      padding: 1rem;
      border-radius: 12px;
      background: rgba(15, 23, 42, 0.55);
      border: 1px solid rgba(148, 163, 184, 0.12);
      text-decoration: none;
      color: inherit;
      cursor: pointer;
    }

    .link:hover {
      opacity: 0.8;
    }

    .request-row.link {
      display: inline-block;
      margin-bottom: 0.5rem;
      color: #93c5fd;
      font-weight: 700;
      font-size: 0.75rem;
      letter-spacing: 0.08em;
      text-transform: uppercase;
    }

    .request-row h3 {
      margin: 0 0 0.3rem;
      font-size: 1.1rem;
    }

    .request-row p,
    .meta small {
      margin: 0;
      color: #94a3b8;
    }

    .meta {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      gap: 0.55rem;
    }

    .priority {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      min-width: 72px;
      padding: 0.32rem 0.6rem;
      border-radius: 999px;
      font-size: 0.72rem;
      font-weight: 700;
      letter-spacing: 0.02em;
      border: 1px solid transparent;
    }

    .priority.low {
      background: rgba(34, 197, 94, 0.14);
      border-color: rgba(34, 197, 94, 0.3);
      color: #86efac;
    }

    .priority.medium {
      background: rgba(59, 130, 246, 0.14);
      border-color: rgba(59, 130, 246, 0.3);
      color: #bfdbfe;
    }

    .priority.high {
      background: rgba(245, 158, 11, 0.14);
      border-color: rgba(245, 158, 11, 0.3);
      color: #fcd34d;
    }

    .priority.critical {
      background: rgba(239, 68, 68, 0.12);
      border-color: rgba(239, 68, 68, 0.3);
      color: #fca5a5;
    }

    @media (max-width: 768px) {
      .request-row {
        flex-direction: column;
        align-items: flex-start;
      }

      .meta {
        align-items: flex-start;
      }
    }
  `
})
export class ServiceRequestsComponent {
  readonly serviceRequests = serviceRequests;
}
