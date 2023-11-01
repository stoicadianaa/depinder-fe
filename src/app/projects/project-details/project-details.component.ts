import {Component, OnInit, ViewChild} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectsService } from "../../common/services/projects.service";
import {Dependency, Project} from "../../common/models/project";
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {LibraryInfo} from "../../common/models/library";
import {LibrariesService} from "../../common/services/libraries.service";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {MatSort} from "@angular/material/sort";
import {Tree, TreeNode} from "../../common/models/tree";

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
export class ProjectDetailsComponent implements OnInit {
  projectId = '';
  project!: Project;
  libraries: Map<Dependency, LibraryInfo> = new Map<Dependency, LibraryInfo>();
  displayedColumns: string[] = ['name', 'version', 'type', 'directDep'];
  displayedColumnsWithExpand = [...this.displayedColumns, 'expand'];
  expandedElement: LibraryInfo | null | undefined;
  dataSource!: MatTableDataSource<Dependency>;
  treeNodes: TreeNode<Dependency>[] = [];
  maxDepth: number = 5;


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  dependenciesTree = new Tree<Dependency>();

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
        this.dataSource.sort = this.sort;

        for (let dependency of this.project.dependencies) {
          if (dependency.directDep === true) {
            let testDependencies = this.projectsService.getDependenciesByRequestedBy(
              this.project.dependencies,
              `${dependency.name}@${dependency.version}`);

            let testTreeNode = new TreeNode<Dependency>(dependency);

            let testTreeNode2 = this.createTreeNode(
              testTreeNode,
              testDependencies,
              0
            );

            this.treeNodes.push(testTreeNode2);
          }
        }

      },
      error: (error) => {
        console.error('An error occurred:', error);
      }
    });
  }

  createTreeNode(currentDependency: TreeNode<Dependency>, dependencies: Dependency[], depth: number): TreeNode<Dependency> {
    if (depth < this.maxDepth) {
      for (let dependency of dependencies) {

        let currentTreeNode: TreeNode<Dependency> = new TreeNode<Dependency>(dependency);

        let dependencies2 = this.projectsService.getDependenciesByRequestedBy(this.project.dependencies, dependency.name + '@' + dependency.version);

        // Recursive call
        this.createTreeNode(currentTreeNode, dependencies2, depth + 1);

        if(depth == 20)
          console.log(dependency._id + ' ' + depth)

        // Adding child to the current node
        currentDependency.addChild(currentTreeNode);
      }
    }

    return currentDependency;
  }


  splitDependencyName(fullName: string): { name: string, version: string } {
    const [name, version] = fullName.split('@');
    return { name, version };
  }
}
