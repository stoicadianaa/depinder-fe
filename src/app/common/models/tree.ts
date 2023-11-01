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

  contains(name: string): boolean {
    if (this.data.name.includes(name)) {
      return true;
    }
    else {
      for (let child of this.children) {
        if (child.contains(name)) {
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
