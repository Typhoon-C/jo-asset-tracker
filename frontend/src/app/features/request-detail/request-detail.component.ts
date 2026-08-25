import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { serviceRequests } from '../../core/mock-data';
import { StatusBadgeComponent } from '../../shared/status-badge/status-badge.component';

@Component({
  selector: 'app-request-detail',
  standalone: true,
  imports: [StatusBadgeComponent, RouterLink],
  template: `
    <section class="page-header">
      <div>
        <a routerLink="/service-requests" class="back-link">← Back to requests</a>
        <p class="eyebrow">Service request</p>
        <h1>{{ request?.title }}</h1>
      </div>
      <button class="primary-button">Edit</button>
    </section>

    @if (request) {
      <section class="grid">
        <article class="panel details-card">
          <h3>Request details</h3>
          <div class="detail-row">
            <span class="label">Request ID</span>
            <span class="value mono">{{ request.id }}</span>
          </div>
          <div class="detail-row">
            <span class="label">Title</span>
            <span class="value">{{ request.title }}</span>
          </div>
          <div class="detail-row">
            <span class="label">Requester</span>
            <span class="value">{{ request.requester }}</span>
          </div>
          <div class="detail-row">
            <span class="label">Asset</span>
            <span class="value">{{ request.asset }}</span>
          </div>
        </article>

        <article class="panel details-card">
          <h3>Status & priority</h3>
          <div class="detail-row">
            <span class="label">Status</span>
            <app-status-badge [status]="request.status" />
          </div>
          <div class="detail-row">
            <span class="label">Priority</span>
            <span class="priority-badge" [class]="request.priority.toLowerCase()">{{ request.priority }}</span>
          </div>
          <div class="detail-row">
            <span class="label">Created</span>
            <span class="value">{{ request.createdAt }}</span>
          </div>
        </article>

        <article class="panel details-card">
          <h3>Description</h3>
          <p class="description">No description provided for this request yet. Add one to provide more context.</p>
        </article>

        <article class="panel details-card">
          <h3>Comments (0)</h3>
          <p class="muted">No comments yet. Be the first to add one.</p>
        </article>

        <article class="panel details-card">
          <h3>Timeline</h3>
          <div class="activity-item">
            <small>{{ request.createdAt }} 10:00</small>
            <p>Request opened by {{ request.requester }}</p>
          </div>
        </article>
      </section>
    } @else {
      <section class="panel">
        <p>Request not found.</p>
      </section>
    }
  `,
  styles: `
    :host {
      display: block;
      width: 100%;
    }

    .page-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 2rem;
      gap: 1rem;
    }

    .back-link {
      display: inline-block;
      margin-bottom: 0.5rem;
      color: #93c5fd;
      text-decoration: none;
      font-weight: 600;
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

    .primary-button {
      border: none;
      background: linear-gradient(135deg, #3b82f6, #2563eb);
      color: white;
      padding: 0.8rem 1.2rem;
      border-radius: 10px;
      font-weight: 700;
      cursor: pointer;
    }

    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 1.2rem;
    }

    .panel,
    .details-card {
      background: rgba(15, 23, 42, 0.72);
      border: 1px solid rgba(148, 163, 184, 0.18);
      border-radius: 18px;
      padding: 1.2rem;
    }

    .details-card h3 {
      margin: 0 0 1rem;
      font-size: 1rem;
    }

    .detail-row {
      display: grid;
      grid-template-columns: 120px 1fr;
      gap: 1rem;
      padding: 0.7rem 0;
      border-bottom: 1px solid rgba(148, 163, 184, 0.08);
    }

    .detail-row:last-child {
      border-bottom: none;
    }

    .label {
      color: #94a3b8;
      font-size: 0.9rem;
    }

    .value {
      font-weight: 600;
    }

    .mono {
      font-family: monospace;
      font-size: 0.88rem;
    }

    .priority-badge {
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

    .priority-badge.low {
      background: rgba(34, 197, 94, 0.14);
      border-color: rgba(34, 197, 94, 0.3);
      color: #86efac;
    }

    .priority-badge.medium {
      background: rgba(59, 130, 246, 0.14);
      border-color: rgba(59, 130, 246, 0.3);
      color: #bfdbfe;
    }

    .priority-badge.high {
      background: rgba(245, 158, 11, 0.14);
      border-color: rgba(245, 158, 11, 0.3);
      color: #fcd34d;
    }

    .priority-badge.critical {
      background: rgba(239, 68, 68, 0.12);
      border-color: rgba(239, 68, 68, 0.3);
      color: #fca5a5;
    }

    .description {
      margin: 0;
      color: #94a3b8;
      line-height: 1.6;
    }

    .activity-item {
      padding: 0.8rem 0;
      border-bottom: 1px solid rgba(148, 163, 184, 0.08);
    }

    .activity-item small {
      display: block;
      color: #94a3b8;
      font-size: 0.75rem;
      margin-bottom: 0.3rem;
    }

    .activity-item p {
      margin: 0;
    }

    .muted {
      color: #94a3b8;
      margin: 0;
    }
  `
})
export class RequestDetailComponent implements OnInit {
  request: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = params['id'];
      this.request = serviceRequests.find(r => r.id === id);
      if (!this.request) {
        this.router.navigate(['/service-requests']);
      }
    });
  }
}
