import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-request-form',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  template: `
    <section class="page-header">
      <div>
        <a routerLink="/service-requests" class="back-link">← Back to requests</a>
        <p class="eyebrow">Create new</p>
        <h1>Service Request</h1>
      </div>
      <button type="button" (click)="onCancel()" class="secondary-button">Cancel</button>
    </section>

    <section class="form-container">
      <form [formGroup]="requestForm" (ngSubmit)="onSubmit()" class="form">
        <div class="form-section">
          <h3>Request details</h3>

          <div class="form-group">
            <label for="title">Title *</label>
            <input
              id="title"
              type="text"
              formControlName="title"
              placeholder="Brief description of the issue"
            />
            @if (requestForm.get('title')?.invalid && requestForm.get('title')?.touched) {
              <span class="error">Title is required</span>
            }
          </div>

          <div class="form-group">
            <label for="asset">Asset</label>
            <select id="asset" formControlName="asset">
              <option value="">Select an asset</option>
              <option value="Dell Latitude 7440">Dell Latitude 7440</option>
              <option value="Dell UltraSharp 27">Dell UltraSharp 27</option>
              <option value="Windows Server 2022">Windows Server 2022</option>
              <option value="Cisco Catalyst 9300">Cisco Catalyst 9300</option>
            </select>
          </div>

          <div class="form-group">
            <label for="description">Description</label>
            <textarea
              id="description"
              formControlName="description"
              rows="5"
              placeholder="Provide details about the issue..."
            ></textarea>
          </div>
        </div>

        <div class="form-section">
          <h3>Priority & assignment</h3>

          <div class="form-group">
            <label for="priority">Priority *</label>
            <select id="priority" formControlName="priority">
              <option value="">Select priority</option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
              <option value="Critical">Critical</option>
            </select>
            @if (requestForm.get('priority')?.invalid && requestForm.get('priority')?.touched) {
              <span class="error">Priority is required</span>
            }
          </div>

          <div class="form-group">
            <label for="requester">Your name *</label>
            <input
              id="requester"
              type="text"
              formControlName="requester"
              placeholder="Full name"
            />
            @if (requestForm.get('requester')?.invalid && requestForm.get('requester')?.touched) {
              <span class="error">Name is required</span>
            }
          </div>
        </div>

        <div class="form-actions">
          <button type="submit" class="primary-button" [disabled]="!requestForm.valid">
            Create request
          </button>
          <button type="button" (click)="onCancel()" class="secondary-button">
            Cancel
          </button>
        </div>
      </form>
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

    .secondary-button,
    .primary-button {
      border: none;
      color: white;
      padding: 0.8rem 1.2rem;
      border-radius: 10px;
      font-weight: 700;
      cursor: pointer;
    }

    .primary-button {
      background: linear-gradient(135deg, #3b82f6, #2563eb);
    }

    .secondary-button {
      background: rgba(148, 163, 184, 0.12);
      border: 1px solid rgba(148, 163, 184, 0.18);
    }

    .primary-button:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .form-container {
      max-width: 700px;
    }

    .form {
      background: rgba(15, 23, 42, 0.72);
      border: 1px solid rgba(148, 163, 184, 0.18);
      border-radius: 18px;
      padding: 1.5rem;
    }

    .form-section {
      margin-bottom: 2rem;
    }

    .form-section h3 {
      margin: 0 0 1rem;
      font-size: 1rem;
    }

    .form-section:last-of-type {
      margin-bottom: 0;
    }

    .form-group {
      margin-bottom: 1.2rem;
    }

    label {
      display: block;
      margin-bottom: 0.4rem;
      font-weight: 600;
      font-size: 0.9rem;
    }

    input,
    select,
    textarea {
      width: 100%;
      padding: 0.8rem;
      background: rgba(15, 23, 42, 0.8);
      border: 1px solid rgba(148, 163, 184, 0.18);
      border-radius: 10px;
      color: white;
      font-size: 0.95rem;
      font-family: inherit;
    }

    input:focus,
    select:focus,
    textarea:focus {
      outline: none;
      border-color: rgba(96, 165, 250, 0.4);
      background: rgba(15, 23, 42, 0.95);
    }

    textarea {
      resize: vertical;
      min-height: 120px;
    }

    .error {
      display: block;
      color: #fca5a5;
      font-size: 0.82rem;
      margin-top: 0.3rem;
    }

    .form-actions {
      display: flex;
      gap: 0.8rem;
      margin-top: 2rem;
      padding-top: 2rem;
      border-top: 1px solid rgba(148, 163, 184, 0.08);
    }

    @media (max-width: 600px) {
      .form {
        padding: 1rem;
      }

      .form-actions {
        flex-direction: column;
      }

      .form-actions button {
        width: 100%;
      }
    }
  `
})
export class RequestFormComponent {
  requestForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {
    this.requestForm = this.fb.group({
      title: ['', Validators.required],
      asset: ['', Validators.required],
      description: [''],
      priority: ['', Validators.required],
      requester: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.requestForm.valid) {
      console.log('Form submitted:', this.requestForm.value);
      this.router.navigate(['/service-requests']);
    }
  }

  onCancel() {
    this.router.navigate(['/service-requests']);
  }
}
