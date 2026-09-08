import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { departments, users } from '../../core/mock-data';

@Component({
  selector: 'app-departments',
  standalone: true,
  imports: [FormsModule],
  template: `
    <section class="page-header">
      <div>
        <p class="eyebrow">Directory</p>
        <h1>Departments</h1>
        <p class="intro">Browse teams and the people assigned to each one.</p>
      </div>
      <span class="count">{{ filteredDepartments.length }} of {{ departments.length }} departments</span>
    </section>

    <section class="panel">
      <div class="toolbar">
        <input
          type="search"
          [(ngModel)]="searchTerm"
          placeholder="Search department, manager, or location..."
          aria-label="Search departments"
        />
      </div>

      <div class="table" role="table" aria-label="Departments directory">
        <div class="table-head" role="row">
          <span role="columnheader">Department</span>
          <span role="columnheader">Manager</span>
          <span role="columnheader">Location</span>
          <span role="columnheader">Members</span>
        </div>

        @for (department of filteredDepartments; track department.id) {
          <div class="table-row" role="row">
            <div>
              <strong>{{ department.name }}</strong>
              <small>{{ department.description }}</small>
            </div>
            <span>{{ department.manager }}</span>
            <span>{{ department.location }}</span>
            <span class="member-count">{{ department.memberCount }}</span>
          </div>
        } @empty {
          <p class="empty-state">No departments match your search.</p>
        }
      </div>
    </section>

    <section class="section-heading">
      <div>
        <p class="eyebrow">People by team</p>
        <h2>Department members</h2>
      </div>
    </section>

    <section class="member-grid">
      @for (department of filteredDepartments; track department.id) {
        <article class="member-card">
          <div class="card-heading">
            <h3>{{ department.name }}</h3>
            <span>{{ membersFor(department.name).length }}</span>
          </div>
          <div class="member-list">
            @for (member of membersFor(department.name); track member.id) {
              <div class="member">
                <span class="avatar">{{ initials(member.name) }}</span>
                <div>
                  <strong>{{ member.name }}</strong>
                  <small>{{ member.role }}</small>
                </div>
              </div>
            } @empty {
              <p class="empty-state">No members listed.</p>
            }
          </div>
        </article>
      }
    </section>
  `,
  styles: `
    :host { display: block; width: 100%; }
    .page-header { display: flex; justify-content: space-between; align-items: flex-end; gap: 1rem; margin-bottom: 2rem; }
    .eyebrow { margin: 0 0 0.4rem; color: #93c5fd; font-size: 0.72rem; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; }
    h1, h2, h3 { margin: 0; }
    h1 { font-size: clamp(2rem, 4vw, 2.6rem); }
    h2 { font-size: 1.35rem; }
    .intro { margin: 0.55rem 0 0; color: #94a3b8; }
    .count { color: #94a3b8; font-size: 0.9rem; }
    .panel, .member-card { background: rgba(15, 23, 42, 0.72); border: 1px solid rgba(148, 163, 184, 0.18); border-radius: 18px; }
    .panel { padding: 1.2rem; }
    .toolbar { display: flex; margin-bottom: 1rem; }
    input { width: 100%; padding: 0.8rem 1rem; color: white; background: rgba(15, 23, 42, 0.8); border: 1px solid rgba(148, 163, 184, 0.18); border-radius: 10px; }
    .table { display: grid; gap: 0.75rem; }
    .table-head, .table-row { display: grid; grid-template-columns: 1.5fr 1fr 1fr auto; align-items: center; gap: 1rem; }
    .table-head { padding-bottom: 0.5rem; color: #94a3b8; border-bottom: 1px solid rgba(148, 163, 184, 0.15); font-size: 0.72rem; letter-spacing: 0.08em; text-transform: uppercase; }
    .table-row { padding: 0.8rem 0; border-bottom: 1px solid rgba(148, 163, 184, 0.08); color: #cbd5e1; }
    .table-row strong, .table-row small { display: block; }
    .table-row small { margin-top: 0.25rem; color: #94a3b8; line-height: 1.4; }
    .member-count, .card-heading > span { color: #bfdbfe; font-weight: 800; }
    .empty-state { margin: 1rem 0; color: #94a3b8; text-align: center; }
    .section-heading { margin: 2rem 0 1rem; }
    .member-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 1rem; }
    .member-card { padding: 1.1rem; }
    .card-heading { display: flex; justify-content: space-between; gap: 1rem; padding-bottom: 0.9rem; border-bottom: 1px solid rgba(148, 163, 184, 0.1); }
    .card-heading h3 { font-size: 1rem; }
    .member-list { display: grid; gap: 0.8rem; padding-top: 0.9rem; }
    .member { display: flex; align-items: center; gap: 0.7rem; }
    .member strong, .member small { display: block; }
    .member small { margin-top: 0.2rem; color: #94a3b8; }
    .avatar { display: grid; flex: 0 0 34px; width: 34px; height: 34px; place-items: center; color: #dbeafe; background: rgba(59, 130, 246, 0.2); border: 1px solid rgba(96, 165, 250, 0.28); border-radius: 50%; font-size: 0.7rem; font-weight: 800; }
    @media (max-width: 850px) { .table-head { display: none; } .table-row { grid-template-columns: 1fr; gap: 0.45rem; padding: 1rem 0; } .table-row > span { padding-left: 0.25rem; } }
    @media (max-width: 600px) { .page-header { align-items: flex-start; flex-direction: column; } }
  `
})
export class DepartmentsComponent {
  readonly departments = departments;
  readonly users = users;
  searchTerm = '';

  get filteredDepartments() {
    const term = this.searchTerm.trim().toLowerCase();
    if (!term) {
      return this.departments;
    }

    return this.departments.filter(department =>
      [department.name, department.manager, department.location, department.description]
        .some(value => value.toLowerCase().includes(term))
    );
  }

  membersFor(departmentName: string) {
    return this.users.filter(user => user.department === departmentName);
  }

  initials(name: string) {
    return name.split(' ').map(part => part[0]).join('').slice(0, 2).toUpperCase();
  }
}
