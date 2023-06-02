import mongoose, { Model, Schema } from 'mongoose';
import { IProfile } from '../contracts/profile.interfaces';
import { toJSON }  from './plugins';


const profileSchema = new Schema<IProfile>(
  {
    bio: {
      type: String,
      index: true,
    },
    user: {
      type: String,
      ref: 'User',
      required: true,
    },
    interests: {
      type: String,
    },
    avatar: {
      type: String,
    },
    skills: {
      type: String,
    },
    location: {
      type: String,
    }
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
profileSchema.plugin(toJSON);

const Profile: Model<IProfile> = mongoose.model('Profile', profileSchema);

export default Profile;