const mongoose=require("mongoose")

const reviewForLearning=new mongoose.Schema({
    
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"UserForElearning",
        required:true
    },
    reviewText:{
        type:String,
        required:true
    },
    ratings:{
        type:Number,
        required:true,
        default:0,
        min:0,
        max:5
    }


},{
    timestamps:true
})
const UserReviewForlearning=new mongoose.model('UserReviewForlearning',reviewForLearning)
module.exports=UserReviewForlearning