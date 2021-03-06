import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const DeploySchema = new Schema({
  files: Array,
  time: Date,
  operator: { type: Schema.Types.ObjectId, ref: 'User' },
  message: String,
  commitId: String,
  project: { type: Schema.Types.ObjectId, ref: 'Project' },
  build: { type: Schema.Types.ObjectId, ref: 'Build' }
});

export default mongoose.model('Deploy', DeploySchema);