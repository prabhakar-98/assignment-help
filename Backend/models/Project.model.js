const mongoose = require("mongoose")

const ProjectSchema = mongoose.Schema({
    title: { type: String, required: true },
    userId: { type: String, required: true },
    category:{ type: String },
    deadline:{type:String,required: true},
    details:{ type: String, required: true },
    file:{ type: String},
    contact:{ type: Number, required: true }
})

const ProjectModel = mongoose.model("project", ProjectSchema)

module.exports={ProjectModel}