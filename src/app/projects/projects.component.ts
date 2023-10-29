import {Component, OnInit} from '@angular/core';
import {ProjectsService} from "../common/services/projects.service";
import {Router} from "@angular/router";
import {Project} from "../common/models/project";
import {MatSnackBar} from "@angular/material/snack-bar";
import {AnalysisService} from "../common/services/analysis.service";

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {
  projects$: Project[] | any;
  displayedColumns: string[] = ['name', 'projectPath'];
  folderPath: string = '';
  isLoading: boolean = true;

  constructor(private projectsService: ProjectsService, private analysisService: AnalysisService, private router: Router, private _snackBar: MatSnackBar) {
  }

  ngOnInit() {
    this.fetchProjects().then(() => this.isLoading = false);
  }

  async fetchProjects() {
      this.projectsService.all().subscribe((res: any) => {
        this.projects$ = res.body['data'];
      });
  }

  navigate(projectId: string) {
    this.router.navigate(['/project', projectId]);
  }

  async analyse(path: string) {
    this.isLoading = true;
      this.analysisService.analyse(path).subscribe({
        next: (res: any) => {
          this.openSnackBar(`Status code ${res.status}`);
        },
        error: (err) => {
          console.error('Server Error:', err);
          this.openSnackBar('An error occurred while analyzing the project.');
        }
      });

      await this.fetchProjects();
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, undefined, {
      duration: 2000
    });
  }
}
