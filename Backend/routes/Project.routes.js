const { Router } = require("express");
const { ProjectModel } = require("../models/Project.model");
 ProjectController = Router(); // Use Router() to create an instance of a router
 const path = require('path');

const multer = require('multer');
const fs = require('fs');
// const storage = multer.memoryStorage();
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // specify the folder where files will be saved
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // generate unique filename
  }
});
const upload = multer({ storage: storage });

// Remove the following line, as it's not necessary
// ProjectController.use(Router.urlencoded({ extended: true }));

ProjectController.post("/create", upload.single('file'), async (req, res) => {
  const {title, userId, category, deadline, details, contact } = req.body;
  


  try {
    const file = String(req.file.originalname)
   const model=ProjectModel({ title,
    userId,
    category,

    file,
    deadline,
    details,
    contact})
    await model.save()
    // Save file information to MongoDB
    
    // await mongoose.connection.db.collection('files').insertOne(fileDocument);
    res.json({ message: 'File uploaded successfully', originalname });
  } catch (error) {
    res.send(error)
    // res.status(500).json({ error: 'Error uploading file' });
  }

  


  
});

ProjectController.delete("/:id/delete", async (req, res) => {
  const { id } = req.params;
  await ProjectModel.findByIdAndDelete({ _id: id });
  res.send({ msg: "Project deleted" });
});

ProjectController.delete("/:id", async (req, res) => {
    const { id } = req.params
    await ProjectModel.findByIdAndDelete({_id:id})
    res.send({"msg":"Project deleted"})
})

ProjectController.patch("/:id",async (req, res) => {
    const { id } = req.params
    const { User_id } = req.body
    const ans = await ProjectModel.updateOne({ _id: id, User_id }, { $set: req.body })
    if(ans.modifiedCount==0)return res.send({"msg":"Something went wrong"})
    else return res.send({msg:"Project updated"})
})


ProjectController.patch("/:id", async (req, res) => {
  const { id } = req.params;
  const { User_id } = req.body;
  const ans = await ProjectModel.updateOne(
    { _id: id, User_id },
    { $set: req.body }
  );
  if (ans.modifiedCount == 0) return res.send({ msg: "Something went wrong" });
  else return res.send({ msg: "Project updated" });
});

module.exports = { ProjectController };
