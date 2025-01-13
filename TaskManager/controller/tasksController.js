const mongoose= require('mongoose')
const task= require('../model/tasksDB')

const getAllTasks= async (req,res)=>{
    const tasks= await task.find()
    if(!tasks) return res.status(400).json({'message':'no task found'})

    res.status(200).json({tasks})
}

const createTasks= async (req,res)=>{
if(!req?.body?.name) return res.status(400).json({'message':'enter task'})

    try {
        const result= await task.create({
           name: req.body.name,
        })
        res.status(200).json({result});
        
    } catch (error) {
        res.status(400).json({'message':error.message})
        console.log(error);
    }
}

const getSingleTasks=async (req,res)=>{
    if(!req?.params?.id) return res.status(200).json({'message':'tasks id required'})    // params is more suitable for taking a single resorce
   
    if(!mongoose.Types.ObjectId.isValid(req.params.id))return res.status(400).json({'message':'invalid task id'})
    

   const tasks = await task.findOne({_id:req.params.id}).exec()
   
     if(!tasks) return res.status(400).json({'message':`no task by this id ${req.params}`})
   
       res.json({tasks});

}

const updateTasks = async (req,res)=>{
if(!req?.params?.id) return res.Status(400).json({'message':'no id'})

    if(!mongoose.Types.ObjectId.isValid(req.params.id))return res.status(400).json({'message':'invalid task id'})
    
    const tasks= await task.findOneAndUpdate({_id:req.params.id},req.body,{
        new:true,
        runValidators:true
    }).exec()
if(!tasks) return res.status(400).json({'message':'no task withi this id'})

res.status(200).json({task:tasks})

}

const deleteTask= async (req,res)=>{
    if(!req?.params?.id) return res.status(400).json({'message':'id required'})

        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ message: 'Invalid task ID format' });
          }

        const tasks= await task.findOne({_id:req.params.id})
        if(!tasks) return res.status(400).json({'message':'there is no task with this id'})
        const result = await task.deleteOne({_id:req.params.id})
    res.json({result})
}




module.exports ={
    getAllTasks,
    createTasks,
    getSingleTasks,
    updateTasks,
    deleteTask
}