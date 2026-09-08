import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { assets } from '../../core/mock-data';
import { StatusBadgeComponent } from '../../shared/status-badge/status-badge.component';

@Component({
  selector: 'app-assets',
  standalone: true,
  imports: [StatusBadgeComponent, RouterLink, FormsModule],
  template: `
    <section class="page-header">
      <div>
        <p class="eyebrow">Inventory</p>
        <h1>Assets</h1>
      </div>
      <button class="primary-button" type="button" disabled title="Asset creation will be connected to the backend later">Add asset</button>
    </section>

    <section class="panel">
      <div class="toolbar">
        <input
          type="search"
          placeholder="Search asset, owner, tag..."
          aria-label="Search assets"
          [(ngModel)]="searchTerm"
        />
        <button class="secondary-button" type="button">Filter</button>
      </div>

      <div class="table">
        <div class="table-head">
          <span>Asset</span>
          <span>Type</span>
          <span>Owner</span>
          <span>Location</span>
          <span>Status</span>
        </div>

        @for (asset of filteredAssets; track asset.id) {
          <a [routerLink]="['/assets', asset.id]" class="table-row link">
            <div class="asset-name">
              <strong>{{ asset.name }}</strong>
              <small>{{ asset.tag }}</small>
            </div>
            <span>{{ asset.type }}</span>
            <span>{{ asset.owner }}</span>
            <span>{{ asset.location }}</span>
            <app-status-badge [status]="asset.status" />
          </a>
        } @empty {
          <p class="empty-state">No assets match your search.</p>
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
    .secondary-button {
      border: none;
      border-radius: 10px;
      color: white;
      padding: 0.8rem 1.1rem;
      font-weight: 700;
      cursor: pointer;
    }

    .primary-button {
      background: linear-gradient(135deg, #3b82f6, #2563eb);
    }

    .primary-button:disabled {
      opacity: 0.55;
      cursor: not-allowed;
    }

    .secondary-button {
      background: rgba(148, 163, 184, 0.12);
      border: 1px solid rgba(148, 163, 184, 0.18);
    }

    .panel {
      background: rgba(15, 23, 42, 0.72);
      border: 1px solid rgba(148, 163, 184, 0.18);
      border-radius: 18px;
      padding: 1.2rem;
    }

    .toolbar {
      display: flex;
      gap: 0.8rem;
      align-items: center;
      margin-bottom: 1rem;
    }

    input {
      flex: 1;
      background: rgba(15, 23, 42, 0.8);
      border: 1px solid rgba(148, 163, 184, 0.18);
      border-radius: 10px;
      padding: 0.8rem 1rem;
      color: white;
      font-size: 0.95rem;
    }

    .table {
      display: grid;
      gap: 0.75rem;
    }

    .table-head,
    .table-row {
      display: grid;
      grid-template-columns: 1.5fr 1fr 1fr 1.2fr auto;
      gap: 1rem;
      align-items: center;
    }

    .table-head {
      color: #94a3b8;
      font-size: 0.72rem;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      padding-bottom: 0.5rem;
      border-bottom: 1px solid rgba(148, 163, 184, 0.15);
    }

    .table-row {
      padding: 0.8rem 0;
      border-bottom: 1px solid rgba(148, 163, 184, 0.08);
      text-decoration: none;
      color: inherit;
      cursor: pointer;
    }

    .link:hover {
      opacity: 0.8;
    }

    .empty-state {
      margin: 1rem 0 0;
      color: #94a3b8;
      text-align: center;
    }

    .asset-name {
      display: grid;
      gap: 0.2rem;
    }

    .asset-name small {
      color: #94a3b8;
    }

    @media (max-width: 900px) {
      .table-head {
        display: none;
      }

      .table-row {
        grid-template-columns: 1fr;
        gap: 0.35rem;
        padding-bottom: 1rem;
      }
    }
  `
})
export class AssetsComponent {
  readonly assets = assets;
  searchTerm = '';

  get filteredAssets() {
    const term = this.searchTerm.trim().toLowerCase();
    if (!term) {
      return this.assets;
    }

    return this.assets.filter(asset =>
      [asset.name, asset.tag, asset.owner, asset.location, asset.type]
        .some(value => value.toLowerCase().includes(term))
    );
  }
}
