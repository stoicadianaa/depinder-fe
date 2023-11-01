import {Component, Input, NgZone, OnInit} from '@angular/core';
import {ProjectsService} from "../../../common/services/projects.service";
import {Dependency} from "../../../common/models/project";
import {TreeNode} from "../../../common/models/tree";

@Component({
  selector: 'app-dependency-recursive',
  templateUrl: './dependency-recursive.component.html',
  styleUrls: ['./dependency-recursive.component.css']
})
export class DependencyRecursiveComponent {
  @Input() depth: number = 0;

  //todo change to dependency
  @Input() dependencyName: string = '';
  @Input() dependencyVersion?: string;

  //todo change name
  @Input() allDependencies: TreeNode[] = [];

  @Input() showMore: boolean = false;
  @Input() searchField?: string;

  constructor() { }

  containsSearchField(index: number): boolean {
    if (this.searchField == undefined || this.searchField.trim() == '') {
      return false;
    }
    return this.allDependencies[index].contains(this.searchField);
  }

  toggle() {
    this.showMore = !this.showMore;
  }

  isHighlighted(): boolean {
    if (this.searchField == undefined || this.searchField.trim() == '') {
      return false;
    }
    return this.dependencyName.includes(this.searchField ?? '');
  }
}
