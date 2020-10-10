const mongoose = require('mongoose');


const Schema = mongoose.Schema;
const JobPostSchema = new Schema({
        title: String,
        description: String,
        salary: Number,
        location: String,
        email: String,
        preference: String,
        deadline: String,
        date: {
            type: String,
            default: Date.now()
        }
})

const JobPost = mongoose.model('FormData', JobPostSchema);


module.exports = JobPost;