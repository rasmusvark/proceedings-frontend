import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-proceedings-list',
  templateUrl: './proceedings-list.component.html',
  styleUrls: ['./proceedings-list.component.scss'],
  standalone: true,
  imports: [HttpClientModule, CommonModule, FormsModule],
})
export class ProceedingsListComponent implements OnInit {
  proceedingsList: any[] = [];
  filteredProceedingsList: any[] = [];
  searchTerm: string = '';
  private apiUrl = 'http://localhost:8080/api/proceedings';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchProceedings();
  }

  fetchProceedings() {
    this.http.get<any[]>(this.apiUrl).subscribe({
      next: (proceedings) => {
        this.proceedingsList = proceedings;
        this.filteredProceedingsList = proceedings;
      },
      error: (error) => {
        console.error('Error fetching proceedings:', error);
      }
    });
  }

  onSearch() {
    if (!this.searchTerm) {
      this.filteredProceedingsList = this.proceedingsList;
    } else {
      this.filteredProceedingsList = this.proceedingsList.filter(proceeding =>
        proceeding.name.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
  }
}
