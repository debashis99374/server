
const UserReviewForlearning=require("../models/review-rating.model")
const UserForElearning=require("../models/user.model")
//add review and rating
const addReview=async(req,res)=>{
    const userIdd=req.user._id
    const {reviewText,ratings}=req.body
    try{
        const foundUser=await UserForElearning.findById(userIdd)
        if(!foundUser){
            res.status(400).json({message:"user not found"})
        }
        const newReview=await UserReviewForlearning.create({reviewText,ratings,userId:userIdd})
        res.status(200).json({message:`new review added by ${foundUser.userName}`,data:newReview})

    }catch(err){
        res.status(500).json({message:"server side error check postman"})
    }
}
// all reviews and ratings
const allreviews=async(req,res)=>{
    try{
      const allReviews=await UserReviewForlearning.find({})
      if(!allReviews){
        res.status(400).json({message:"Reviews not found"})
      }
      res.status(200).json({message:"all reviews fetching succesful",data:allReviews})
    }catch(err){
        res.status(500).json({message:"server side error check postman"})
    }
}
//update a specific review
const updateReview=async(req,res)=>{
    const userId=req.user._id
    const reviewId=req.params.reviewId
    const dataToBeUpdated=req.body
    try{
if(!reviewId){
    res.status(500).json({message:"use approprate reviewid"})
}
const foundUser=await UserForElearning.findById(userId)
const updatedReview=await UserReviewForlearning.findByIdAndUpdate(reviewId,dataToBeUpdated,{new:true})
res.status(200).json({message:`review and ratings updated for ${foundUser.userName} `,data:updatedReview})


    }catch(err){
        res.status(500).json({message:"server side error check postman"})
    }
}
// delete a specific review
const deleteReview=async(req,res)=>{
    const userId=req.user._id
    const reviewId=req.params.reviewId
    try{
        if(!reviewId){
            res.status(400).json({message:"add valid review id"})
        }
        const foundUser=await UserForElearning.findById(userId)
        if(!foundUser.isAdmin || !foundUser){
            res.status(401).json({message:"Unauthorised acces: only admin or the loggedin user can delete this review"})
        }
        const deletedReview=await UserReviewForlearning.findByIdAndDelete(reviewId)
        res.status(200).json({message:`review from ${foundUser.userName} deleted`,data:deletedReview})


    }catch(err){
        res.status(500).json({message:"server side error check postman"})
    }
}

module.exports={
    addReview,
    allreviews,
    updateReview,
    deleteReview
}