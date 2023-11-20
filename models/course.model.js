const mongoose=require("mongoose")
const videoSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    duration:{
        type:Number,
        required:true
    },
    url:{
        type:String,
        required:true, 
    }
},{
    timestamps:true
})
const courseSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    videos:{
        type:[videoSchema],
        default:[]
    },
    description:{
        type:String,
        required:true
    },
    creater:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"UserForElearning",
        required:true
    }
},{
    timestamps:true
})

const CourseForLearning=new mongoose.model("CourseForLearning",courseSchema)
module.exports=CourseForLearning