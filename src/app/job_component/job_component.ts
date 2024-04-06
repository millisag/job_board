import { Component, OnInit } from '@angular/core';
import { Job } from './job.model';
import { JobService } from './job.service';

@Component({
  selector: 'app-job',
  templateUrl: './job_component.html',
  styleUrls: ['./job_component.css']
})
export class JobComponent implements OnInit {
  jobs: Job[];
  job: Job = {
    title: '',
    company: '',
    id: '',
    url: '',
    by: '',
    time: 0
  }; // Initialize empty job
  showForm = false; // Flag to show/hide form
  isNewJob = true; // Flag to determine if creating or editing job

  constructor(private jobService: JobService) { }

  ngOnInit(): void {
    this.getJobs();
  }

  getJobs(): void {
    this.jobService.getJobs().subscribe(jobs => {
      this.jobs = jobs;
    });
  }

  editJob(id: number): void {
    this.jobService.getJobById(id).subscribe(job => {
      this.job = job;
      this.isNewJob = false;
      this.showForm = true;
    });
  }

  createJob(): void {
    this.jobService.createJob(this.job).subscribe(() => {
      this.resetForm();
      this.getJobs();
    });
  }

  updateJob(): void {
    const jobId = Number(this.job.id); // Convert id to number
    this.jobService.updateJob(jobId, this.job).subscribe(() => {
      this.resetForm();
      this.getJobs();
    });
  }

  resetForm(): void {
    this.job = { title: '', company: '', id: '', url: '', by: '', time: 0 }; // Reset job object
    this.isNewJob = true;
    this.showForm = false;
  }
}
