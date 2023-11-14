import { Dependency } from './project';

export class TreeNode {
  data: Dependency;
  children: TreeNode[];

  constructor(data: Dependency) {
    this.data = data;
    this.children = [];
  }

  addChild(child: TreeNode): void {
    this.children.push(child);
  }

  contains(name?: string, vulnerabilities?: boolean): boolean {
    if (name !== undefined && this.data.name.includes(name) && vulnerabilities === undefined) {
      return true;
    }
    if (`${this.data.vulnerabilities}` === `${vulnerabilities}` && name === undefined) {
      return true;
    }
    if (this.data.name.includes(name!) && `${this.data.vulnerabilities}` === `${vulnerabilities}`) {
      return true;
    } else {
      for (let child of this.children) {
        if (child.contains(name, vulnerabilities)) {
          return true;
        }
      }
    }
    return false;
  }
}

export class Tree<T> {
  root: TreeNode | null;

  constructor() {
    this.root = null;
  }
}
