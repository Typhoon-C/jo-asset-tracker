import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { assets, serviceRequests, summaryCards } from '../../core/mock-data';
import { StatusBadgeComponent } from '../../shared/status-badge/status-badge.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [StatusBadgeComponent, RouterLink],
  template: `
    <section class="page-header">
      <div>
        <p class="eyebrow">Overview</p>
        <h1>Operations dashboard</h1>
      </div>
      <a class="primary-button" routerLink="/service-requests/new">Create request</a>
    </section>

    <section class="stats-grid">
      @for (card of summaryCards; track card.label) {
        <article class="stat-card">
          <p>{{ card.label }}</p>
          <h2>{{ card.value }}</h2>
          <span>{{ card.trend }}</span>
        </article>
      }
    </section>

    <section class="content-grid">
      <article class="panel">
        <div class="panel-header">
          <h3>Recent assets</h3>
          <a routerLink="/assets">View all</a>
        </div>

        <div class="table">
          <div class="table-head">
            <span>Asset</span>
            <span>Owner</span>
            <span>Status</span>
          </div>

          @for (asset of assets.slice(0, 4); track asset.id) {
            <a [routerLink]="['/assets', asset.id]" class="table-row link">
              <div>
                <strong>{{ asset.name }}</strong>
                <small>{{ asset.tag }}</small>
              </div>
              <span>{{ asset.owner }}</span>
              <app-status-badge [status]="asset.status" />
            </a>
          }
        </div>
      </article>

      <article class="panel">
        <div class="panel-header">
          <h3>Open requests</h3>
          <a routerLink="/service-requests">Manage</a>
        </div>

        <div class="request-list">
          @for (request of serviceRequests.slice(0, 4); track request.id) {
            <a [routerLink]="['/service-requests', request.id]" class="request-item link">
              <div>
                <strong>{{ request.title }}</strong>
                <small>{{ request.requester }}</small>
              </div>
              <app-status-badge [status]="request.status" />
            </a>
          }
        </div>
      </article>
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

    .primary-button {
      display: inline-block;
      border: none;
      background: linear-gradient(135deg, #3b82f6, #2563eb);
      color: white;
      padding: 0.8rem 1.2rem;
      border-radius: 10px;
      font-weight: 700;
      text-decoration: none;
      cursor: pointer;
    }

    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
      gap: 1rem;
      margin-bottom: 2rem;
    }

    .stat-card,
    .panel {
      background: rgba(15, 23, 42, 0.72);
      border: 1px solid rgba(148, 163, 184, 0.18);
      border-radius: 18px;
      box-shadow: 0 18px 30px rgba(15, 23, 42, 0.18);
    }

    .stat-card {
      padding: 1.2rem 1.3rem;
    }

    .stat-card p {
      margin: 0 0 0.5rem;
      color: #cbd5e1;
      font-size: 0.82rem;
    }

    .stat-card h2 {
      margin: 0;
      font-size: 2rem;
    }

    .stat-card span {
      display: inline-block;
      margin-top: 0.5rem;
      color: #86efac;
      font-size: 0.78rem;
      font-weight: 600;
    }

    .content-grid {
      display: grid;
      grid-template-columns: 1.4fr 1fr;
      gap: 1.2rem;
    }

    .panel {
      padding: 1.2rem;
    }

    .panel-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1rem;
    }

    .panel-header h3 {
      margin: 0;
      font-size: 1.05rem;
    }

    .panel-header a {
      color: #93c5fd;
      text-decoration: none;
      font-weight: 600;
    }

    .table {
      display: grid;
      gap: 0.85rem;
    }

    .table-head,
    .table-row {
      display: grid;
      grid-template-columns: 1.6fr 1fr auto;
      gap: 1rem;
      align-items: center;
    }

    .table-head {
      color: #94a3b8;
      font-size: 0.72rem;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      padding-bottom: 0.4rem;
      border-bottom: 1px solid rgba(148, 163, 184, 0.15);
    }

    .table-row {
      padding: 0.7rem 0;
      border-bottom: 1px solid rgba(148, 163, 184, 0.1);
      text-decoration: none;
      color: inherit;
      cursor: pointer;
    }

    .link:hover {
      opacity: 0.8;
    }

    .table-row strong,
    .request-item strong {
      display: block;
      margin-bottom: 0.2rem;
    }

    .table-row small,
    .request-item small {
      display: block;
      color: #94a3b8;
    }

    .request-list {
      display: grid;
      gap: 0.8rem;
    }

    .request-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 0.8rem;
      padding: 0.9rem 0;
      border-bottom: 1px solid rgba(148, 163, 184, 0.1);
      text-decoration: none;
      color: inherit;
      cursor: pointer;
    }

    @media (max-width: 900px) {
      .content-grid {
        grid-template-columns: 1fr;
      }
    }
  `
})
export class DashboardComponent {
  readonly summaryCards = summaryCards;
  readonly assets = assets.slice(0, 4);
  readonly serviceRequests = serviceRequests.slice(0, 4);
}
