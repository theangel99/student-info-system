import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { ChartModule } from 'primeng/chart';
import { StudentService } from '../../services/student.service';
import { Student } from '../../models/student.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, CardModule, ButtonModule, ChartModule],
  template: `
    <div class="dashboard-container">
      <h1>Nadzorna plošča</h1>
      
      <div class="stats-grid">
        <p-card class="stat-card">
          <div class="stat-content">
            <i class="pi pi-users stat-icon"></i>
            <div class="stat-details">
              <h2>{{ totalStudents }}</h2>
              <p>Skupno študentov</p>
            </div>
          </div>
        </p-card>

        <p-card class="stat-card">
          <div class="stat-content">
            <i class="pi pi-book stat-icon"></i>
            <div class="stat-details">
              <h2>{{ totalCourses }}</h2>
              <p>Različnih predmetov</p>
            </div>
          </div>
        </p-card>

        <p-card class="stat-card">
          <div class="stat-content">
            <i class="pi pi-chart-bar stat-icon"></i>
            <div class="stat-details">
              <h2>{{ averageCoursesPerStudent }}</h2>
              <p>Povprečno predmetov na študenta</p>
            </div>
          </div>
        </p-card>

        <p-card class="stat-card">
          <div class="stat-content">
            <i class="pi pi-calendar stat-icon"></i>
            <div class="stat-details">
              <h2>{{ recentEnrollments }}</h2>
              <p>Vpisi v zadnjem mesecu</p>
            </div>
          </div>
        </p-card>
      </div>

      <div class="charts-grid">
        <p-card header="Najpogostešji predmeti">
          <div class="chart-container">
            <p-chart type="bar" [data]="coursesChartData" [options]="chartOptions"></p-chart>
          </div>
        </p-card>

        <p-card header="Zadnji vpisani študenti">
          <div class="recent-students">
            <div *ngFor="let student of recentStudentsList" class="recent-student-item">
              <div class="student-info">
                <strong>{{ student.firstName }} {{ student.lastName }}</strong>
                <span class="email">{{ student.email }}</span>
              </div>
              <span class="date">{{ student.enrollmentDate | date: 'dd.MM.yyyy' }}</span>
            </div>
          </div>
        </p-card>
      </div>

      <div class="action-buttons">
        <p-button 
          label="Poglej vse študente" 
          icon="pi pi-arrow-right"
          (onClick)="navigateToOverview()"
          styleClass="p-button-lg">
        </p-button>
      </div>
    </div>
  `,
  styles: [`
    .dashboard-container {
      padding: 2rem;
      max-width: 1400px;
      margin: 0 auto;
    }

    h1 {
      font-size: 2rem;
      font-weight: 600;
      margin-bottom: 2rem;
      color: #1e293b;
    }

    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 1.5rem;
      margin-bottom: 2rem;
    }

    .stats-grid .stat-card {
      height: 100%;
    }

    ::ng-deep .stat-card .p-card {
      background: linear-gradient(135deg, #dc2626 0%, #991b1b 100%);
      border: none;
      box-shadow: 0 2px 8px rgba(220, 38, 38, 0.2);
      height: 100%;
      display: flex;
      flex-direction: column;
    }

    ::ng-deep .stat-card .p-card-body {
      padding: 0;
      background: transparent;
      flex: 1;
      display: flex;
      align-items: center;
    }

    ::ng-deep .stat-card .p-card-content {
      padding: 2rem 1.5rem;
      width: 100%;
    }

    .stat-content {
      display: flex;
      align-items: center;
      gap: 1.5rem;
    }

    .stat-icon {
      font-size: 3rem;
      opacity: 0.9;
    }

    .stat-details h2 {
      font-size: 2.5rem;
      font-weight: 700;
      margin: 0;
      color: white;
    }

    .stat-details p {
      font-size: 0.95rem;
      margin: 0.5rem 0 0 0;
      opacity: 0.9;
      color: white;
    }

    .charts-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
      gap: 1.5rem;
      margin-bottom: 2rem;
    }

    .charts-grid > * {
      height: 100%;
    }

    .charts-grid ::ng-deep .p-card {
      height: 100%;
      display: flex;
      flex-direction: column;
    }

    .charts-grid ::ng-deep .p-card-body {
      flex: 1;
      display: flex;
      flex-direction: column;
    }

    .charts-grid ::ng-deep .p-card-content {
      flex: 1;
    }

    .chart-container {
      min-height: 300px;
      padding: 1rem 0;
    }

    .recent-students {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
      max-height: 400px;
      overflow-y: auto;
    }

    .recent-students::-webkit-scrollbar {
      width: 6px;
    }

    .recent-students::-webkit-scrollbar-track {
      background: #f1f5f9;
      border-radius: 3px;
    }

    .recent-students::-webkit-scrollbar-thumb {
      background: #cbd5e1;
      border-radius: 3px;
    }

    .recent-students::-webkit-scrollbar-thumb:hover {
      background: #94a3b8;
    }

    .recent-student-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0.875rem 1rem;
      background: #f8fafc;
      border-radius: 6px;
      transition: all 0.15s ease;
      border: 1px solid transparent;
    }

    .recent-student-item:hover {
      background: #fee2e2;
      border-color: #fecaca;
      transform: translateX(2px);
    }

    .student-info {
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
    }

    .student-info strong {
      color: #1e293b;
      font-size: 1rem;
    }

    .email {
      color: #64748b;
      font-size: 0.875rem;
    }

    .date {
      color: #94a3b8;
      font-size: 0.875rem;
      font-weight: 500;
    }

    .action-buttons {
      display: flex;
      justify-content: center;
      padding: 2rem 0;
    }

    @media (max-width: 768px) {
      .dashboard-container {
        padding: 1rem;
      }

      .stats-grid {
        grid-template-columns: 1fr;
      }

      .charts-grid {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class DashboardComponent implements OnInit {
  students: Student[] = [];
  totalStudents: number = 0;
  totalCourses: number = 0;
  averageCoursesPerStudent: number = 0;
  recentEnrollments: number = 0;
  recentStudentsList: Student[] = [];
  coursesChartData: any;
  chartOptions: any;

  constructor(
    private studentService: StudentService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadDashboardData();
    this.setupChartOptions();
  }

  loadDashboardData(): void {
    this.studentService.getStudents().subscribe({
      next: (data) => {
        this.students = data;
        this.calculateStatistics();
      },
      error: (error) => {
        console.error('Error loading dashboard data:', error);
      }
    });
  }

  calculateStatistics(): void {
    this.totalStudents = this.students.length;

    // Calculate unique courses
    const allCourses = this.students.flatMap(s => s.courses);
    const uniqueCourses = new Set(allCourses);
    this.totalCourses = uniqueCourses.size;

    // Calculate average courses per student
    const totalCoursesCount = allCourses.length;
    this.averageCoursesPerStudent = this.totalStudents > 0 
      ? Math.round((totalCoursesCount / this.totalStudents) * 10) / 10
      : 0;

    // Calculate recent enrollments (last 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    this.recentEnrollments = this.students.filter(s => 
      new Date(s.enrollmentDate) >= thirtyDaysAgo
    ).length;

    // Get recent students (last 5)
    this.recentStudentsList = [...this.students]
      .sort((a, b) => new Date(b.enrollmentDate).getTime() - new Date(a.enrollmentDate).getTime())
      .slice(0, 5);

    // Prepare courses chart data
    this.prepareCoursesChartData(allCourses);
  }

  prepareCoursesChartData(allCourses: string[]): void {
    const courseCounts = allCourses.reduce((acc, course) => {
      acc[course] = (acc[course] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const sortedCourses = Object.entries(courseCounts)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 10);

    this.coursesChartData = {
      labels: sortedCourses.map(([course]) => course),
      datasets: [{
        label: 'Število študentov',
        data: sortedCourses.map(([, count]) => count),
        backgroundColor: '#dc2626',
        borderColor: '#991b1b',
        borderWidth: 1
      }]
    };
  }

  setupChartOptions(): void {
    this.chartOptions = {
      responsive: true,
      maintainAspectRatio: true,
      aspectRatio: 2,
      plugins: {
        legend: {
          display: false
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            stepSize: 1,
            color: '#64748b'
          },
          grid: {
            color: '#e2e8f0'
          }
        },
        x: {
          ticks: {
            color: '#64748b'
          },
          grid: {
            display: false
          }
        }
      }
    };
  }

  navigateToOverview(): void {
    this.router.navigate(['/overview']);
  }
}
