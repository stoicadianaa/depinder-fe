import {AfterViewInit, Component, EventEmitter, Input, NgZone, OnInit, Output} from '@angular/core';
import {ProjectsService} from "../../../common/services/projects.service";
import {Dependency} from "../../../common/models/project";

@Component({
  selector: 'app-dependency-recursive',
  templateUrl: './dependency-recursive.component.html',
  styleUrls: ['./dependency-recursive.component.css']
})
export class DependencyRecursiveComponent implements OnInit {
  @Input() depth: number = 0;
  @Input() maxDepth: number = 5;

  //todo change to dependency
  @Input() dependencyName: string = '';
  @Input() dependencyVersion?: string;

  // //todo change name
  @Input() allDependencies: Dependency[] = [];

  dependencies: Dependency[] = [];
  @Input() toggled: boolean = false;

  constructor(private projectService: ProjectsService, private ngZone: NgZone) { }

  ngOnInit() {
    let requestedBy: string = '';
    if (this.dependencyVersion != undefined) {
      requestedBy = this.dependencyName + '@' + this.dependencyVersion;
    }
    else {
      requestedBy = this.dependencyName;
    }

    console.log('requestedBy: ' + requestedBy);

    this.dependencies = this.projectService.getDependenciesByRequestedBy(this.allDependencies, requestedBy);

    console.log('dependencies: ' + this.dependencies.length);
  }

  toggle() {
    this.toggled = !this.toggled;
  }
}
