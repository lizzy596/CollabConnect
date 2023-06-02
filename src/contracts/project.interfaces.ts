export interface IProject {
  projectName: string;
  description: string;
  goals: [string];
  owner: string;
  isPrivate: boolean;
  collaborators?: [string];
}