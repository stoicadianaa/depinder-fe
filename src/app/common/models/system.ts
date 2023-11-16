import {Dependency, Project} from "./project";

export interface System {
  // _id: string;
  // dependencies: Dependency[];
  // directDeps: number;
  // directOutOfSupport: number;
  // directOutdatedDeps: number;
  // directOutdatedDepsPercentage: number;
  // directVulnerableDeps: number;
  // indirectDeps: number;
  // indirectOutOfSupport: number;
  // indirectOutdatedDeps: number;
  // indirectOutdatedDepsPercentage: number;
  // indirectVulnerableDeps: number;
  // name: string;
  // projectPath: string;

  projects: Project[];
}

function getPathBeforeLastSlash(path: string) {
  const lastIndex = path.lastIndexOf('/')
  if (lastIndex === -1) {
    return path; // Return the original path if '/' is not found
  }
  return path.substring(0, lastIndex);
}

export function generateSystemsAndProjects(projects: Project[]) {
  let systems: (Project | System)[]  = [];
  for (let project of projects) {
    let projectPath = getPathBeforeLastSlash(project.projectPath);

    let system: System = {
      projects: []
    };

    projects.filter(p => {
      console.log('project' + p.name + ' ' + getPathBeforeLastSlash(p.projectPath));
      console.log('project' + p.name + ' ' + projectPath);
      if (getPathBeforeLastSlash(p.projectPath) === projectPath) {
        console.log('project' + p.name + ' ' + getPathBeforeLastSlash(p.projectPath));
        system.projects.push(p);
        projects.splice(projects.indexOf(p), 1);
        return true;
      }
      return false;
    })

    if (system.projects.length > 1) {
      console.log('system');
      console.log(system.projects)
      systems.push(system);
    }
    else {
      systems.push(project);
    }
  }

  console.log(systems);

  return systems;
}
