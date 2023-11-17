import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {SystemsService} from "../../common/services/systems.service";
import {System} from "../../common/models/system";
import {Project} from "../../common/models/project";
import {ProjectsService} from "../../common/services/projects.service";
import {ProjectsTableComponent} from "../../common/standalone/projects-table/projects-table.component";

@Component({
  selector: 'app-system-details',
  standalone: true,
  imports: [CommonModule, ProjectsTableComponent],
  templateUrl: './system-details.component.html',
  styleUrl: './system-details.component.css'
})
export class SystemDetailsComponent implements OnInit{
  systems$: System[] = [];
  map$: Map<System, Project[]> = new Map<System, Project[]>();
  constructor(private systemService: SystemsService, private projectsService: ProjectsService) {
  }

  ngOnInit() {
    this.systemService.all().subscribe(
      (res: any) => {
        this.systems$ = res.body['data'];
        this.systems$.forEach((system, index) => {
          // console.log(system)
          system.projects.forEach((projectId, index2) => {
            // console.log(projectId)
            this.map$.set(system, [])
            this.projectsService.find(projectId).subscribe(
              {
                next: (res2: any) => {
                  console.log(res2)
                  this.map$.set(system, [res2, ...this.map$.get(system)?? []])
                }
              }
            )
          })
        })

      }
    )
  }

}
