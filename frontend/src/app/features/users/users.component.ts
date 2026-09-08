import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { users } from '../../core/mock-data';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [FormsModule],
  template: `
    <section class="page-header">
      <div>
        <p class="eyebrow">Directory</p>
        <h1>Users</h1>
        <p class="intro">Find people and see which department they support.</p>
      </div>
      <span class="count">{{ filteredUsers.length }} of {{ users.length }} people</span>
    </section>

    <section class="panel">
      <div class="toolbar">
        <input
          type="search"
          [(ngModel)]="searchTerm"
          placeholder="Search by name, email, role, or department..."
          aria-label="Search users"
        />
      </div>

      <div class="table" role="table" aria-label="Users directory">
        <div class="table-head" role="row">
          <span role="columnheader">Person</span>
          <span role="columnheader">Role</span>
          <span role="columnheader">Department</span>
          <span role="columnheader">Status</span>
        </div>

        @for (user of filteredUsers; track user.id) {
          <div class="table-row" role="row">
            <div class="person-cell">
              <span class="avatar">{{ initials(user.name) }}</span>
              <div>
                <strong>{{ user.name }}</strong>
                <small>{{ user.email }}</small>
              </div>
            </div>
            <span>{{ user.role }}</span>
            <span>{{ user.department }}</span>
            <span class="status" [class.inactive]="user.status === 'Inactive'">{{ user.status }}</span>
          </div>
        } @empty {
          <p class="empty-state">No users match your search.</p>
        }
      </div>
    </section>
  `,
  styles: `
    :host { display: block; width: 100%; }
    .page-header { display: flex; justify-content: space-between; align-items: flex-end; gap: 1rem; margin-bottom: 2rem; }
    .eyebrow { margin: 0 0 0.4rem; color: #93c5fd; font-size: 0.72rem; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; }
    h1 { margin: 0; font-size: clamp(2rem, 4vw, 2.6rem); }
    .intro { margin: 0.55rem 0 0; color: #94a3b8; }
    .count { color: #94a3b8; font-size: 0.9rem; }
    .panel { padding: 1.2rem; background: rgba(15, 23, 42, 0.72); border: 1px solid rgba(148, 163, 184, 0.18); border-radius: 18px; }
    .toolbar { display: flex; margin-bottom: 1rem; }
    input { width: 100%; padding: 0.8rem 1rem; color: white; background: rgba(15, 23, 42, 0.8); border: 1px solid rgba(148, 163, 184, 0.18); border-radius: 10px; }
    .table { display: grid; gap: 0.75rem; }
    .table-head, .table-row { display: grid; grid-template-columns: 1.5fr 1.1fr 1.2fr auto; align-items: center; gap: 1rem; }
    .table-head { padding-bottom: 0.5rem; color: #94a3b8; border-bottom: 1px solid rgba(148, 163, 184, 0.15); font-size: 0.72rem; letter-spacing: 0.08em; text-transform: uppercase; }
    .table-row { padding: 0.8rem 0; border-bottom: 1px solid rgba(148, 163, 184, 0.08); color: #cbd5e1; }
    .person-cell { display: flex; align-items: center; gap: 0.75rem; min-width: 0; }
    .person-cell div { min-width: 0; }
    .person-cell strong, .person-cell small { display: block; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
    .person-cell small { margin-top: 0.2rem; color: #94a3b8; }
    .avatar { display: grid; flex: 0 0 38px; width: 38px; height: 38px; place-items: center; color: #dbeafe; background: rgba(59, 130, 246, 0.2); border: 1px solid rgba(96, 165, 250, 0.28); border-radius: 50%; font-size: 0.78rem; font-weight: 800; }
    .status { color: #86efac; font-size: 0.82rem; font-weight: 700; }
    .status.inactive { color: #fca5a5; }
    .empty-state { margin: 1rem 0; color: #94a3b8; text-align: center; }
    @media (max-width: 850px) { .table-head { display: none; } .table-row { grid-template-columns: 1fr; gap: 0.45rem; padding: 1rem 0; } .table-row > span { padding-left: 3.1rem; } }
    @media (max-width: 600px) { .page-header { align-items: flex-start; flex-direction: column; } }
  `
})
export class UsersComponent {
  readonly users = users;
  searchTerm = '';

  get filteredUsers() {
    const term = this.searchTerm.trim().toLowerCase();
    if (!term) {
      return this.users;
    }

    return this.users.filter(user =>
      [user.name, user.email, user.role, user.department].some(value => value.toLowerCase().includes(term))
    );
  }

  initials(name: string) {
    return name.split(' ').map(part => part[0]).join('').slice(0, 2).toUpperCase();
  }
}
