const mongoose = require('mongoose');
const { Schema, model } = mongoose;
 
const projectSchema = new Schema({
  title: String,
  description: String,
  tasks: [{ type: Schema.Types.ObjectId, ref: 'Task' }]
  // owner will be added later on
 // userId: { type: Schema.Types.ObjectId, ref: 'User' }
});
 
module.exports = model('Project', projectSchema);