import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  template: `
    <div class="app-shell">
      <aside class="sidebar">
        <div class="brand">
          <div class="brand-mark">JO</div>
          <div>
            <strong>JO Asset</strong>
            <small>Tracker</small>
          </div>
        </div>

        <nav class="nav">
          <a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{ exact: true }">Dashboard</a>
          <a routerLink="/assets" routerLinkActive="active">Assets</a>
          <a routerLink="/service-requests" routerLinkActive="active">Service Requests</a>
          <a routerLink="/users" routerLinkActive="active">Users</a>
          <a routerLink="/departments" routerLinkActive="active">Departments</a>
        </nav>

        <div class="sidebar-card">
          <p>System health</p>
          <strong>Stable</strong>
          <span>All core services online</span>
        </div>
      </aside>

      <main class="content">
        <router-outlet />
      </main>
    </div>
  `,
  styles: `
    :host {
      display: block;
      min-height: 100vh;
      background: linear-gradient(135deg, #020817, #0f172a 40%, #111827);
      color: #e5e7eb;
    }

    .app-shell {
      display: flex;
      min-height: 100vh;
      width: 100%;
    }

    .sidebar {
      width: 260px;
      background: rgba(15, 23, 42, 0.9);
      border-right: 1px solid rgba(148, 163, 184, 0.15);
      padding: 1.5rem 1rem;
      display: flex;
      flex-direction: column;
      gap: 2rem;
    }

    .brand {
      display: flex;
      align-items: center;
      gap: 0.9rem;
      padding: 0.5rem 0.4rem;
    }

    .brand-mark {
      width: 42px;
      height: 42px;
      display: grid;
      place-items: center;
      border-radius: 12px;
      background: linear-gradient(135deg, #3b82f6, #8b5cf6);
      font-weight: 800;
      color: white;
    }

    .brand strong,
    .brand small {
      display: block;
    }

    .brand small {
      color: #94a3b8;
    }

    .nav {
      display: grid;
      gap: 0.5rem;
    }

    .nav a {
      color: #cbd5e1;
      text-decoration: none;
      padding: 0.8rem 0.9rem;
      border-radius: 10px;
      font-weight: 600;
      transition: 0.2s ease;
    }

    .nav a:hover,
    .nav a.active {
      background: rgba(59, 130, 246, 0.14);
      border: 1px solid rgba(96, 165, 250, 0.28);
      color: white;
    }

    .nav a:focus-visible,
    .brand:focus-visible {
      outline: 2px solid #93c5fd;
      outline-offset: 3px;
    }

    .sidebar-card {
      margin-top: auto;
      background: rgba(30, 41, 59, 0.8);
      border: 1px solid rgba(148, 163, 184, 0.15);
      border-radius: 14px;
      padding: 1rem;
    }

    .sidebar-card p,
    .sidebar-card span {
      margin: 0;
      color: #94a3b8;
    }

    .sidebar-card strong {
      display: block;
      margin: 0.4rem 0;
      font-size: 1.3rem;
    }

    .content {
      flex: 1;
      padding: 2rem 2.4rem 3rem;
      max-width: calc(100vw - 260px);
    }

    @media (max-width: 900px) {
      .app-shell {
        flex-direction: column;
      }

      .sidebar {
        width: 100%;
        padding: 1rem;
        gap: 1rem;
        border-right: none;
        border-bottom: 1px solid rgba(148, 163, 184, 0.15);
      }

      .nav {
        display: flex;
        gap: 0.35rem;
        overflow-x: auto;
        padding-bottom: 0.2rem;
      }

      .nav a {
        flex: 0 0 auto;
        padding: 0.65rem 0.75rem;
        font-size: 0.88rem;
      }

      .sidebar-card {
        display: none;
      }

      .content {
        max-width: 100%;
        padding: 1.25rem;
      }
    }
  `
})
export class AppComponent {}
