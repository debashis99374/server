const mongoose=require("mongoose")

const blogSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"UserForElearning",
        required:true
    }
})
const Blogs=new mongoose.model('Blogs',blogSchema)
module.exports=Blogs