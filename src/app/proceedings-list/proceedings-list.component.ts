import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-proceedings-list',
  templateUrl: './proceedings-list.component.html',
  styleUrls: ['./proceedings-list.component.scss'],
  standalone: true,
  imports: [HttpClientModule, CommonModule]
})
export class ProceedingsListComponent implements OnInit {
  proceedingsList: any[] = [];
  private apiUrl = 'http://localhost:8080/api/proceedings';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchProceedings();
  }

  fetchProceedings() {
    this.http.get<any[]>(this.apiUrl).subscribe({
      next: (proceedings) => {
        this.proceedingsList = proceedings;
      },
      error: (error) => {
        console.error('Error fetching proceedings:', error);
      }
    });
  }
}
