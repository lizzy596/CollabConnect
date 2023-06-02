import mongoose, { Model, Schema } from 'mongoose';
import { IProject } from '../contracts/project.interfaces';
import { toJSON }  from './plugins';


const projectSchema = new Schema<IProject>(
  {
    projectName: {
      type: String,
      index: true,
    },
    description: {
      type: String,
    },
    goals: {
      type: [String],
    },
    owner: {
      type: String,
    },
    isPrivate: {
      type: Boolean,
      default: false,
    },
    collaborators: {
      type: [String],
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
projectSchema.plugin(toJSON);

const Project: Model<IProject> = mongoose.model('Profile', projectSchema);

export default Project;