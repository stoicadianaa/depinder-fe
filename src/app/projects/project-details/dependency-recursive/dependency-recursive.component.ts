import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Dependency} from "../../../common/models/project";
import {TreeNode} from "../../../common/models/tree";

@Component({
  selector: 'app-dependency-recursive',
  templateUrl: './dependency-recursive.component.html',
  styleUrls: ['./dependency-recursive.component.css']
})
export class DependencyRecursiveComponent {
  @Input() depth: number = 0;

  @Input() dependency?: Dependency;

  //todo change name
  @Input() allDependencies: TreeNode[] = [];

  @Input() showMore: boolean = false;
  @Input() searchField?: string;
  @Input() filterByVulnerabilities?: boolean;

  @Output() childEvent = new EventEmitter<Dependency>();

  constructor() { }

  containsSearchField(index: number): boolean {
    if ((this.searchField == undefined || this.searchField.trim() == '')) {
      return false;
    }
    return this.allDependencies[index].contains(this.searchField!, this.filterByVulnerabilities);
  }

  toggle() {
    this.sendInfo();
    this.showMore = !this.showMore;
  }

  isHighlighted(): boolean {
    if (this.searchField == undefined || this.searchField.trim() == '') {
      return false;
    }
    return (this.dependency?.name ?? '').includes(this.searchField ?? '');
  }

  sendInfo() {
    this.childEvent.emit(this.dependency);
  }

  receiveInfo($event: any) {
    this.childEvent.emit($event);
  }
}
