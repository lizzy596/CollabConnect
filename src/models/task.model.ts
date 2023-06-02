import mongoose, { Model, Schema } from 'mongoose';
import { ITask } from '../contracts/task.interfaces';
import { toJSON }  from './plugins';


const taskSchema = new Schema<ITask>(
  {
    owner: {
      type: String,
      ref: 'User',
    },
    description: {
      type: String,
    },
    dueDate: {
      type: Date,
    },
    isCompleted: {
      type: Boolean,
    },
    project: {
      type: String,
      ref: 'Project',
      required: true
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
taskSchema.plugin(toJSON);

const Task: Model<ITask> = mongoose.model('Task', taskSchema);

export default Task;