const mongoose = require('mongoose');


const Schema = mongoose.Schema;
const JobApplicationSchema = new Schema({
        name: String,
        email: String,
        link: String,
        date: {
            type: String,
            default: Date.now()
        }
})

const JobApplication = mongoose.model('Applications', JobApplicationSchema);


module.exports = JobApplication;