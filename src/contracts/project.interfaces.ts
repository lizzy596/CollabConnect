export interface IProject {
  projectName: string;
  description: string;
  goals: [string];
  owner: string;
  collaborators?: [string];
}