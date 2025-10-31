import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { ConfirmationService, MessageService } from 'primeng/api';

import { Student } from '../../models/student.model';
import { StudentService } from '../../services/student.service';

@Component({
  selector: 'app-students-overview',
  standalone: true,
  imports: [
    CommonModule,
    TableModule,
    ButtonModule,
    DialogModule,
    InputTextModule,
    MultiSelectModule,
    FormsModule,
    ReactiveFormsModule,
    ConfirmDialogModule,
    ToastModule
  ],
  providers: [ConfirmationService, MessageService],
  templateUrl: './students-overview.component.html',
  styleUrls: ['./students-overview.component.scss']
})
export class StudentsOverviewComponent implements OnInit {
  students: Student[] = [];
  displayAddDialog = false;
  displayEditDialog = false;
  studentForm!: FormGroup;
  editStudentForm!: FormGroup;
  selectedStudent: Student | null = null;
  superAdminName = 'Administrator';
  
  availableCourses = [
    'Mathematics',
    'Physics',
    'Computer Science',
    'Biology',
    'Chemistry',
    'English',
    'History',
    'Geography',
    'Art',
    'Music',
    'Drama',
    'Physical Education',
    'Economics',
    'Business Studies',
    'Psychology',
    'Sociology',
    'Philosophy',
    'Literature',
    'Creative Writing',
    'Engineering',
    'Environmental Science',
    'Political Science',
    'Law',
    'Marketing',
    'Architecture',
    'Design',
    'Nursing',
    'Finance',
    'Accounting',
    'Journalism',
    'Media Studies',
    'Mechanical Engineering',
    'Languages',
    'Information Technology',
    'Networking',
    'Pharmacy',
    'Graphic Design',
    'Digital Media',
    'Education',
    'Civil Engineering',
    'Veterinary Science',
    'Animal Behavior',
    'Data Science',
    'Statistics',
    'International Relations',
    'Electrical Engineering',
    'Fashion Design',
    'Aerospace Engineering',
    'Software Engineering',
    'Human Resources',
    'Marine Biology',
    'Public Relations',
    'Communications',
    'Sports Science',
    'Interior Design',
    'Astronomy',
    'Film Studies',
    'Robotics',
    'Culinary Arts',
    'Nutrition',
    'Geology',
    'Photography',
    'Music Production',
    'Technology',
    'Social Work',
    'Biochemistry'
  ];

  constructor(
    private studentService: StudentService,
    private fb: FormBuilder,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {
    this.initializeForms();
  }

  ngOnInit(): void {
    this.loadStudents();
  }

  /**
   * Initialize forms for adding and editing students
   */
  initializeForms(): void {
    this.studentForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      enrollmentDate: ['', Validators.required],
      courses: [[], [Validators.required, Validators.minLength(1)]]
    });

    this.editStudentForm = this.fb.group({
      courses: [[], [Validators.required, Validators.minLength(1)]]
    });
  }

  /**
   * Load all students from the service
   */
  loadStudents(): void {
    this.studentService.getStudents().subscribe({
      next: (data) => {
        this.students = data;
      },
      error: (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to load students'
        });
        console.error('Error loading students:', error);
      }
    });
  }

  /**
   * Show add student dialog
   */
  showAddDialog(): void {
    this.studentForm.reset();
    this.displayAddDialog = true;
  }

  /**
   * Show edit student dialog
   */
  showEditDialog(student: Student): void {
    this.selectedStudent = student;
    this.editStudentForm.patchValue({
      courses: student.courses
    });
    this.displayEditDialog = true;
  }

  /**
   * Add a new student
   */
  addStudent(): void {
    if (this.studentForm.valid) {
      const newStudent: Student = this.studentForm.value;
      this.studentService.createStudent(newStudent).subscribe({
        next: (student) => {
          this.students.push(student);
          this.displayAddDialog = false;
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Student added successfully'
          });
        },
        error: (error) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Failed to add student'
          });
          console.error('Error adding student:', error);
        }
      });
    }
  }

  /**
   * Update student's courses
   */
  updateStudent(): void {
    if (this.editStudentForm.valid && this.selectedStudent) {
      const updatedStudent: Student = {
        ...this.selectedStudent,
        courses: this.editStudentForm.value.courses
      };
      
      this.studentService.updateStudent(this.selectedStudent.id!, updatedStudent).subscribe({
        next: (student) => {
          const index = this.students.findIndex(s => s.id === student.id);
          if (index !== -1) {
            this.students[index] = student;
          }
          this.displayEditDialog = false;
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Student updated successfully'
          });
        },
        error: (error) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Failed to update student'
          });
          console.error('Error updating student:', error);
        }
      });
    }
  }

  /**
   * Delete a student with confirmation
   */
  deleteStudent(student: Student): void {
    this.confirmationService.confirm({
      message: `Are you sure you want to delete ${student.firstName} ${student.lastName}?`,
      header: 'Delete Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.studentService.deleteStudent(student.id!).subscribe({
          next: () => {
            this.students = this.students.filter(s => s.id !== student.id);
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Student deleted successfully'
            });
          },
          error: (error) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Failed to delete student'
            });
            console.error('Error deleting student:', error);
          }
        });
      }
    });
  }
}
