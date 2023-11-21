const express=require("express")
const reviewRouter=express.Router()
const {addReview,allreviews,updateReview,deleteReview}=require("../controllers/review-rating.controller")
const { authVerify } = require("../middlewheres/authVarify.middlewhere")

reviewRouter.post('/add-review',authVerify,addReview)
//this route adds a review to db for a specific user,only logged in users can acces this route
reviewRouter.get('/all-reviews',allreviews)
//this route fetches all reviews data from db
reviewRouter.post('/update-review/:reviewId',authVerify,updateReview)
//this route updates a review object inside reviews arr ,only loggedin user have the acces to this route
reviewRouter.delete('/delete-review/:reviewId',authVerify,deleteReview)
//this route deletes a specific review from reviewsArr ,here both loggedin user and admins have acces to delete a review

module.exports=reviewRouter