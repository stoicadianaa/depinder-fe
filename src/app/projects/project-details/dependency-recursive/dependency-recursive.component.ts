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

  @Output() childEvent = new EventEmitter<Dependency>();

  // filters
  @Input() searchField?: string;
  @Input() filterByVulnerabilities?: boolean;
  @Input() filterByOutdated?: boolean;
  @Input() filterByOutOfSupport?: boolean;

  constructor() { }

  containsFilters(index: number): boolean {
    const searchFieldTrimmed = this.searchField?.trim();
    const isSearchFieldEmpty = !searchFieldTrimmed; // true if searchField is undefined or empty
    const isFilterByVulnerabilitiesUndefined = this.filterByVulnerabilities === undefined;
    const isFilterByOutOfSupportUndefined = this.filterByOutOfSupport === undefined;
    const isFilterByOutdatedUndefined = this.filterByOutdated === undefined;

    // Return false if both search field and filterByVulnerabilities are not set
    if (isSearchFieldEmpty && isFilterByVulnerabilitiesUndefined && isFilterByOutOfSupportUndefined && isFilterByOutdatedUndefined) {
      return false;
    }

    return this.allDependencies[index].contains(searchFieldTrimmed, this.filterByVulnerabilities, this.filterByOutOfSupport, this.filterByOutdated);
  }


  toggle() {
    this.sendInfo();
    this.showMore = !this.showMore;
  }

  isHighlighted(): boolean {
    const nameMatch = (this.searchField === undefined || this.searchField.trim().length > 0) && (this.dependency?.name.includes(this.searchField ?? '') ?? false);

    //todo check why comparisons don't work with boolean
    const vulnerabilitiesMatch = this.filterByVulnerabilities === undefined || `${this.dependency?.vulnerabilities}` === `${this.filterByVulnerabilities}`;
    const outOfSupportMatch = this.filterByOutOfSupport === undefined || `${this.dependency?.outOfSupport}` === `${this.filterByOutOfSupport}`;
    const outOfDateMatch = this.filterByOutdated === undefined || `${this.dependency?.outdated}` === `${this.filterByOutdated}`;

    if (((this.searchField === undefined || this.searchField.trim().length == 0)) && this.filterByVulnerabilities === undefined && this.filterByOutOfSupport === undefined && this.filterByOutdated === undefined)
      return false;

    return (vulnerabilitiesMatch && (outOfSupportMatch) && outOfDateMatch && nameMatch);
  }

  sendInfo() {
    this.childEvent.emit(this.dependency);
  }

  receiveInfo($event: any) {
    this.childEvent.emit($event);
  }
}
