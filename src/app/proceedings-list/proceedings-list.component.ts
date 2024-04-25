import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common'; // Import CommonModule

@Component({
  selector: 'app-proceedings-list',
  templateUrl: './proceedings-list.component.html',
  styleUrls: ['./proceedings-list.component.scss'],
  standalone: true,
  imports: [HttpClientModule, CommonModule] // Include CommonModule here
})
export class ProceedingsListComponent implements OnInit {
  proceedingsList: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchProceedings();
  }

  fetchProceedings() {
    this.http.get<any[]>('/api/proceedings').subscribe({
      next: (proceedings) => {
        this.proceedingsList = proceedings;
      },
      error: (error) => {
        console.error('Error fetching proceedings:', error);
      }
    });
  }
}
