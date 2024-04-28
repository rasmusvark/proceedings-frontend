import { Component } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-proceedings-form',
  templateUrl: './proceedings-form.component.html',
  styleUrls: ['./proceedings-form.component.scss'],
  standalone: true,
  imports: [ReactiveFormsModule, HttpClientModule, CommonModule],
})
export class ProceedingsFormComponent {
  proceedingsForm = this.fb.group({
    name: ['', Validators.required],
    personalId: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    reason: ['', Validators.required],
  });

  emailSentMessage: string | null = null;
  private apiUrl = 'http://localhost:8080/api/proceedings';

  constructor(private fb: FormBuilder, private http: HttpClient) {}

  onSubmit() {
    if (this.proceedingsForm.valid) {
      this.http.post<any>(this.apiUrl, this.proceedingsForm.value).subscribe({
        next: (response) => {
          this.emailSentMessage = response.emailSent
            ? 'An email has been sent to the person subject to the procedure.'
            : 'Failed to send email.';
          setTimeout(() => {
            this.emailSentMessage = null;
          }, 3000);
          this.proceedingsForm.reset();
        },
        error: (error) => {
          console.error('Error creating proceeding:', error);
          this.emailSentMessage = 'An error occurred while creating the proceeding.';
          setTimeout(() => {
            this.emailSentMessage = null;
          }, 3000);
          this.proceedingsForm.reset();
        }
      });
    }
  }
}
