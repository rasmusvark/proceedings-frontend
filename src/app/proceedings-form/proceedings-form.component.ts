import { Component } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-proceedings-form',
  templateUrl: './proceedings-form.component.html',
  styleUrls: ['./proceedings-form.component.scss'],
  standalone: true,
  imports: [ReactiveFormsModule, HttpClientModule], // Include necessary modules here
})
export class ProceedingsFormComponent {
  proceedingsForm = this.fb.group({
    name: ['', Validators.required],
    personalId: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    reason: ['', Validators.required],
  });

  constructor(private fb: FormBuilder, private http: HttpClient) {}

  onSubmit() {
    if (this.proceedingsForm.valid) {
      this.http.post('/api/proceedings', this.proceedingsForm.value).subscribe({
        next: (response) => {
          console.log('Proceeding created:', response);
          this.proceedingsForm.reset();
        },
        error: (error) => {
          console.error('Error creating proceeding:', error);
        }
      });
    }
  }
}
