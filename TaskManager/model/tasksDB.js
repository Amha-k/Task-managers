const mongoose= require('mongoose')

const schema = mongoose.Schema;

const taskSchema = new schema({
name: {
    type:String,
    reqiured:true,
    trim:true,
    maxLenght:250
},
completed: {
    type:Boolean,
    default:false
}


})

module.exports= mongoose.model('task',taskSchema)