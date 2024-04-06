import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Job } from './job.model';

@Injectable({
  providedIn: 'root'
})
export class JobService {
  private apiUrl = 'http://localhost:3000/api/jobs'; // Your backend API URL

  constructor(private http: HttpClient) { }

  getJobs(): Observable<Job[]> {
    return this.http.get<Job[]>(this.apiUrl);
  }

  getJobById(id: number): Observable<Job> {
    return this.http.get<Job>(`${this.apiUrl}/${id}`);
  }

  createJob(job: Job): Observable<Job> {
    return this.http.post<Job>(this.apiUrl, job);
  }

  updateJob(id: number, job: Job): Observable<Job> {
    return this.http.put<Job>(`${this.apiUrl}/${id}`, job);
  }

  deleteJob(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}

