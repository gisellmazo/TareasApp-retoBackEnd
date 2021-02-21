const mongoose= require('mongoose');
const {Schema} = mongoose;

const TaskShema = new Schema({
    taskName: {type: String, required:true},
    taskImge: {type: String, required:false},
    taskPriority: {type: String, required:false},
    limitDate: {type: Date, required:false}
});

module.exports = mongoose.model('Task', TaskShema)