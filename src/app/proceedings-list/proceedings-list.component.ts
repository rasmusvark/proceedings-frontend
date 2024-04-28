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
  deletionMessage: string | null = null;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchProceedings();
  }

  fetchProceedings() {
    this.http.get<any[]>(this.apiUrl).subscribe({
      next: (proceedings) => {
        this.proceedingsList = proceedings.map(proceeding => ({
          ...proceeding,
          showReason: false
        }));
        this.filteredProceedingsList = [...this.proceedingsList];
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

  confirmDelete(proceeding: { name: string; id: number; }) {
    if (confirm(`Are you sure you want to delete the proceeding against ${proceeding.name}?`)) {
      this.deleteProceeding(proceeding.id);
    }
  }

  deleteProceeding(id: number) {
    this.http.delete(`${this.apiUrl}/${id}`).subscribe({
      next: () => {
        this.deletionMessage = 'The proceeding has been successfully deleted.';
        setTimeout(() => this.deletionMessage = null, 3000);
        this.fetchProceedings();
      },
      error: (error) => {
        console.error('Failed to delete the proceeding:', error);
        this.deletionMessage = 'Failed to delete the proceeding.';
        setTimeout(() => this.deletionMessage = null, 3000);
      }
    });
  }

  toggleReason(proceeding: any) {
    proceeding.showReason = !proceeding.showReason;
  }
}
