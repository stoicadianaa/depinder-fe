import {Component, OnInit, ViewChild} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectsService } from "../../common/services/projects.service";
import {Dependency, Project} from "../../common/models/project";
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {LibraryInfo} from "../../common/models/library";
import {LibrariesService} from "../../common/services/libraries.service";
import {firstValueFrom} from "rxjs";
import {animate, state, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class ProjectDetailsComponent implements OnInit{
  projectId = '';
  project!: Project;
  libraries: Map<Dependency, LibraryInfo> = new Map<Dependency, LibraryInfo>();
  displayedColumns: string[] = ['name', 'version', 'type', 'directDep'];
  displayedColumnsWithExpand = [...this.displayedColumns, 'expand'];
  expandedElement: LibraryInfo | null | undefined;
  dataSource!: MatTableDataSource<Dependency>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(private projectsService: ProjectsService, private librariesService: LibrariesService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.projectId = params['projectId'];
    });
    this.fetchProject();
  }

  fetchProject() {
    this.projectsService.find(this.projectId).subscribe({
      next: async (res: any) => {
        this.project = res;
        this.dataSource = new MatTableDataSource(this.project.dependencies);
        this.dataSource.paginator = this.paginator;

        for (const lib of this.project.dependencies) {
          try {
            const result = await firstValueFrom(this.librariesService.find(lib._id));
            this.libraries.set(lib, result);
          }
          catch (e) {
            console.error(e);
          }
        }
      },
      error: (error) => {
        console.error('An error occurred:', error);
      }
    });
  }

}
