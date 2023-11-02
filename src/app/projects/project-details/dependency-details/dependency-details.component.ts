import {Component, Input} from '@angular/core';
import {Dependency} from "../../../common/models/project";

@Component({
  selector: 'app-dependency-details',
  templateUrl: './dependency-details.component.html',
  styleUrls: ['./dependency-details.component.css']
})
export class DependencyDetailsComponent {
  @Input() selectedDependency? : Dependency;
}
