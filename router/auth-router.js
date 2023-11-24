const express=require("express")
const authRouter=express.Router()
const {registration,signIn,allUsers,updateUserDetails,deleteProfile,toggleAdmin,fetchBookmarks,addBookmark,removeBookmark}=require('../controllers/auth-controller')
const { authVerify } = require("../middlewheres/authVarify.middlewhere")

authRouter.post('/auth/register',registration)
//this route is for registration also in registration i am creating a token for instant login
authRouter.post('/auth/signin',signIn)
//this route is for signin also  i am creating a token 
authRouter.get('/all-users',allUsers)
authRouter.post('/auth/update-user-details',authVerify,updateUserDetails)
//this route is for updating user profile of a specific user,only the loggedin user can edit 
authRouter.delete('/auth/delete-user-profile',authVerify,deleteProfile)
//this route is for deleting a user account, here both logged in user and a admin can delete a users account



authRouter.post('/auth/toggle-admin/:userId',authVerify,toggleAdmin)
//this route toggels isAdmin of a specifiuc user ,ofcourse only admins can change make anyone a admin or not


authRouter.get('/auth/all-bookmarks',authVerify,fetchBookmarks)
authRouter.post('/auth/add-bookmark',authVerify,addBookmark)
authRouter.post('/auth/remove-bookmark',authVerify,removeBookmark)
//this route adds a course to a users bookmark array

module.exports=authRouter  