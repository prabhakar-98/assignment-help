const mongoose = require("mongoose")
require("dotenv").config()

url="mongodb+srv://anonymouskumar566:0RprMswHb5GJdTyd@cluster0.wljogti.mongodb.net/?retryWrites=true&w=majority"
const connection = mongoose.connect(url)

module.exports={connection}