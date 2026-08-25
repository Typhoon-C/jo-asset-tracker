import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { assets } from '../../core/mock-data';
import { StatusBadgeComponent } from '../../shared/status-badge/status-badge.component';

@Component({
  selector: 'app-asset-detail',
  standalone: true,
  imports: [StatusBadgeComponent, RouterLink],
  template: `
    <section class="page-header">
      <div>
        <a routerLink="/assets" class="back-link">← Back to assets</a>
        <p class="eyebrow">Asset details</p>
        <h1>{{ asset?.name }}</h1>
      </div>
      <button class="primary-button">Edit</button>
    </section>

    @if (asset) {
      <section class="grid">
        <article class="panel details-card">
          <h3>General information</h3>
          <div class="detail-row">
            <span class="label">Asset tag</span>
            <span class="value">{{ asset.tag }}</span>
          </div>
          <div class="detail-row">
            <span class="label">Type</span>
            <span class="value">{{ asset.type }}</span>
          </div>
          <div class="detail-row">
            <span class="label">Owner</span>
            <span class="value">{{ asset.owner }}</span>
          </div>
          <div class="detail-row">
            <span class="label">Location</span>
            <span class="value">{{ asset.location }}</span>
          </div>
        </article>

        <article class="panel details-card">
          <h3>Status & warranty</h3>
          <div class="detail-row">
            <span class="label">Status</span>
            <app-status-badge [status]="asset.status" />
          </div>
          <div class="detail-row">
            <span class="label">Warranty expiry</span>
            <span class="value">{{ asset.warranty }}</span>
          </div>
          <div class="detail-row">
            <span class="label">Asset ID</span>
            <span class="value mono">{{ asset.id }}</span>
          </div>
        </article>

        <article class="panel details-card">
          <h3>Recent activity</h3>
          <div class="activity-item">
            <small>2026-08-14 14:22</small>
            <p>Status changed to "{{ asset.status }}"</p>
          </div>
          <div class="activity-item">
            <small>2026-08-12 09:15</small>
            <p>Assigned to {{ asset.owner }}</p>
          </div>
          <div class="activity-item">
            <small>2026-08-08 16:48</small>
            <p>Asset created</p>
          </div>
        </article>

        <article class="panel details-card">
          <h3>Related service requests</h3>
          <p class="muted">No service requests currently open for this asset.</p>
        </article>
      </section>
    } @else {
      <section class="panel">
        <p>Asset not found.</p>
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
      grid-template-columns: 140px 1fr;
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
export class AssetDetailComponent implements OnInit {
  asset: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = params['id'];
      this.asset = assets.find(a => a.id === id);
      if (!this.asset) {
        this.router.navigate(['/assets']);
      }
    });
  }
}
