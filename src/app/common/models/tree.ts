export class TreeNode<T> {
  data: T;
  children: TreeNode<T>[];

  constructor(data: T) {
    this.data = data;
    this.children = [];
  }

  addChild(child: TreeNode<T>): void {
    this.children.push(child);
  }
}

export class Tree<T> {
  root: TreeNode<T> | null;

  constructor() {
    this.root = null;
  }
}
