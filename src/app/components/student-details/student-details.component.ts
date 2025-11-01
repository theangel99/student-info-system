import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { ChipModule } from 'primeng/chip';
import { StudentService } from '../../services/student.service';
import { Student } from '../../models/student.model';

@Component({
  selector: 'app-student-details',
  standalone: true,
  imports: [CommonModule, CardModule, ButtonModule, ChipModule],
  template: `
    <div class="details-container">
      <div class="header-actions">
        <p-button 
          icon="pi pi-arrow-left" 
          label="Nazaj" 
          styleClass="p-button-text"
          (onClick)="goBack()">
        </p-button>
      </div>

      <div *ngIf="student" class="student-details">
        <p-card>
          <ng-template pTemplate="header">
            <div class="card-header">
              <div class="student-avatar">
                <i class="pi pi-user"></i>
              </div>
              <div class="student-title">
                <h1>{{ student.firstName }} {{ student.lastName }}</h1>
                <p class="student-email">{{ student.email }}</p>
              </div>
            </div>
          </ng-template>

          <div class="details-grid">
            <div class="detail-item">
              <label><i class="pi pi-id-card"></i> ID</label>
              <span>{{ student.id }}</span>
            </div>

            <div class="detail-item">
              <label><i class="pi pi-user"></i> Ime</label>
              <span>{{ student.firstName }}</span>
            </div>

            <div class="detail-item">
              <label><i class="pi pi-user"></i> Priimek</label>
              <span>{{ student.lastName }}</span>
            </div>

            <div class="detail-item">
              <label><i class="pi pi-envelope"></i> Email</label>
              <span>{{ student.email }}</span>
            </div>

            <div class="detail-item">
              <label><i class="pi pi-calendar"></i> Datum vpisa</label>
              <span>{{ student.enrollmentDate | date: 'dd.MM.yyyy' }}</span>
            </div>

            <div class="detail-item">
              <label><i class="pi pi-book"></i> Število predmetov</label>
              <span>{{ student.courses.length }}</span>
            </div>
          </div>

          <div class="courses-section">
            <h2><i class="pi pi-book"></i> Vpisani predmeti</h2>
            <div class="courses-list">
              <p-chip *ngFor="let course of student.courses" [label]="course" styleClass="course-chip"></p-chip>
            </div>
          </div>

          <ng-template pTemplate="footer">
            <div class="card-footer">
              <p-button 
                label="Uredi" 
                icon="pi pi-pencil" 
                styleClass="p-button-outlined"
                (onClick)="editStudent()">
              </p-button>
              <p-button 
                label="Izbriši" 
                icon="pi pi-trash" 
                severity="danger"
                (onClick)="deleteStudent()">
              </p-button>
            </div>
          </ng-template>
        </p-card>
      </div>

      <div *ngIf="!student && !loading" class="not-found">
        <i class="pi pi-exclamation-circle"></i>
        <h2>Študent ni najden</h2>
        <p>Študent s tem ID-jem ne obstaja.</p>
        <p-button 
          label="Nazaj na seznam" 
          icon="pi pi-arrow-left"
          (onClick)="goBack()">
        </p-button>
      </div>

      <div *ngIf="loading" class="loading">
        <i class="pi pi-spin pi-spinner"></i>
        <p>Nalaganje...</p>
      </div>
    </div>
  `,
  styles: [`
    .details-container {
      padding: 2rem;
      max-width: 900px;
      margin: 0 auto;
    }

    .header-actions {
      margin-bottom: 1.5rem;
    }

    .card-header {
      display: flex;
      align-items: center;
      gap: 2rem;
      padding: 2rem;
      background: linear-gradient(135deg, #dc2626 0%, #991b1b 100%);
      color: white;
    }

    .student-avatar {
      width: 80px;
      height: 80px;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.2);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 2.5rem;
    }

    .student-title h1 {
      margin: 0;
      font-size: 2rem;
      font-weight: 600;
      color: white;
    }

    .student-email {
      margin: 0.5rem 0 0 0;
      opacity: 0.9;
      font-size: 1rem;
      color: white;
    }

    .details-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 1.5rem;
      margin-bottom: 2rem;
    }

    .detail-item {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    .detail-item label {
      font-size: 0.875rem;
      color: #64748b;
      font-weight: 600;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .detail-item label i {
      color: #dc2626;
    }

    .detail-item span {
      font-size: 1rem;
      color: #1e293b;
      font-weight: 500;
    }

    .courses-section {
      margin-top: 2rem;
      padding-top: 2rem;
      border-top: 1px solid #e2e8f0;
    }

    .courses-section h2 {
      font-size: 1.25rem;
      font-weight: 600;
      color: #1e293b;
      margin-bottom: 1rem;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .courses-section h2 i {
      color: #dc2626;
    }

    .courses-list {
      display: flex;
      flex-wrap: wrap;
      gap: 0.75rem;
    }

    ::ng-deep .course-chip {
      background: #fee2e2;
      color: #991b1b;
      font-weight: 500;
    }

    .card-footer {
      display: flex;
      justify-content: flex-end;
      gap: 1rem;
      padding-top: 1rem;
      border-top: 1px solid #e2e8f0;
    }

    .not-found, .loading {
      text-align: center;
      padding: 4rem 2rem;
    }

    .not-found i, .loading i {
      font-size: 4rem;
      color: #94a3b8;
      margin-bottom: 1rem;
    }

    .not-found h2 {
      font-size: 1.5rem;
      color: #1e293b;
      margin-bottom: 0.5rem;
    }

    .not-found p {
      color: #64748b;
      margin-bottom: 2rem;
    }

    @media (max-width: 768px) {
      .details-container {
        padding: 1rem;
      }

      .card-header {
        flex-direction: column;
        text-align: center;
        padding: 1.5rem;
      }

      .student-title h1 {
        font-size: 1.5rem;
      }

      .details-grid {
        grid-template-columns: 1fr;
      }

      .card-footer {
        flex-direction: column;
      }
    }
  `]
})
export class StudentDetailsComponent implements OnInit {
  student: Student | null = null;
  loading: boolean = true;
  studentId: number = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private studentService: StudentService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.studentId = +params['id'];
      this.loadStudent();
    });
  }

  loadStudent(): void {
    this.loading = true;
    this.studentService.getStudent(this.studentId).subscribe({
      next: (data) => {
        this.student = data;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading student:', error);
        this.student = null;
        this.loading = false;
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/overview']);
  }

  editStudent(): void {
    // Navigate back to overview and trigger edit
    this.router.navigate(['/overview'], { 
      queryParams: { edit: this.studentId } 
    });
  }

  deleteStudent(): void {
    // Navigate back to overview and trigger delete
    this.router.navigate(['/overview'], { 
      queryParams: { delete: this.studentId } 
    });
  }
}
