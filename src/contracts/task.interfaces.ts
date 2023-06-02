export interface ITask {
  owner : string;
  description: string;
  dueDate?: Date;
  isCompleted?: boolean;
  project: string
}