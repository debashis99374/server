

const CourseForLearning=require('../models/course.model')
const UserForElearning=require('../models/user.model')
//course functions---------------------------------------------------------------------------
//creating a course
const createCourse=async(req,res)=>{
    const userId=req.user._id
    const {title,videos,description}=req.body
    try{
        
        const foundUser=await UserForElearning.findById(userId)
        
        if (!foundUser) {
            return res.status(404).json({ message: "User not found" });
        }
        let courseDetails={}
        if(foundUser.isAdmin){
           courseDetails={
            title,videos,description,creater:userId
          }
        }else{
           return res.status(400).json({message:"Unauthorised access:Only admins can create course"})
        }
        const createdCourse=await CourseForLearning.create(courseDetails)
       return res.status(200).json({message:"course created",data:createdCourse})

    }catch(err){
       return res.status(500).json({message:"server side error in creating cource",err})
    }
}
//get all courses

const getAllCourses = async (req, res) => {
    try {
        const allCourses = await CourseForLearning.find({});
        console.log('allCourses:', allCourses); // Add this line for debugging

        if (!allCourses) {
            return res.status(400).json({ message: "there is no course " });
        }

        res.status(200).json({ message: "all courses are here", data: allCourses });
    } catch (err) {
        console.error('Error:', err); // Add this line for debugging
        res.status(500).json({ message: "server side error or check all fields in postman properly" });
    }
};
//update a specific course---
const updateCourse=async(req,res)=>{
    const userId=req.user._id
    const dataToBeUpdated=req.body
    const courseId=req.params.courseId
    try{
        if(!courseId){
            res.status(400).json({message:"Provide valid course id "})
        }
        const foundUser=await UserForElearning.findById(userId)
        const foundCourse=await CourseForLearning.findById(courseId)
        if(!foundCourse){
            res.status(401).json({message:"course not found"})
        }
        if(!foundUser.isAdmin){
            res.status(401).json({message:"unauthorised acces: only admin can made changes"})
        }
        const updatedCourse=await CourseForLearning.findByIdAndUpdate(courseId,dataToBeUpdated,{new:true})
        res.status(200).json({message:`${foundCourse.title} updated`,data:updatedCourse})


    }catch(err){
        res.status(500).json({ message: "server side error or check all fields in postman properly" });
    }
}
//delete a course---
const deleteCourse=async(req,res)=>{
    const userId=req.user._id
    const courseId=req.params.courseId
    try{
        if(!courseId){
            res.status(400).json({message:"Provide valid course id "})
        }
        const foundUser=await UserForElearning.findById(userId)
        const foundCourse=await CourseForLearning.findById(courseId)
        if(!foundCourse){
            res.status(401).json({message:"course not found"})
        }
        if(!foundUser.isAdmin){
            res.status(401).json({message:"unauthorised acces: only admin can delete the course"})
        }
        const deletedCourse=await CourseForLearning.findByIdAndDelete(courseId)
        res.status(200).json({message:`course: ${foundCourse.title} deleted`,data:deletedCourse})

    }catch(err){
        res.status(500).json({ message: "server side error or check all fields in postman properly" });
    }
}


//video array under a specific course  functions---------------------------------------------------------------------------------------------------------
//add videos to a course

const addVideoToCourse=async(req,res)=>{
    const userId=req.user._id
    const {name,duration,url}=req.body
    const courseId=req.params.courseId
   try{
    if(!courseId){
        res.status(400).json({message:"Provide valid course id "})
    }
    const selectedCourse=await CourseForLearning.findById(courseId)
    const foundUser=await UserForElearning.findById(userId)
    if(!foundUser){
        res.status(400).json({message:"User not found"}) 
    }
   
   
     if(!foundUser.isAdmin){
        res.status(400).json({message:`Unauthorised access:Only admins can  add videos to ${selectedCourse.title} course`}) 
     }
     const videoDetails = { name, duration, url };
     selectedCourse.videos.push(videoDetails)
     const savedCourse=await selectedCourse.save()

    res.status(200).json({message:`video added to ${selectedCourse.title}`,data:savedCourse})


   }catch(err){
    res.status(500).json({message:"server side error in adding a video to a cource",err})
   }
}
//updating a video inside a specific course---

const updateVideo = async (req, res) => {
    const userId = req.user._id;
    const dataToBeUpdated = req.body;
    const courseId = req.params.courseId;
    const videoId = req.params.videoId;

    try {
        if (!courseId) {
            return res.status(400).json({ message: "Enter a valid courseId" });
        }

        if (!videoId) {
            return res.status(400).json({ message: "Enter a valid videoId" });
        }

        const foundUser = await UserForElearning.findById(userId);
        const foundCourse = await CourseForLearning.findById(courseId);

        if (!foundUser.isAdmin) {
            return res.status(401).json({ message: "Unauthorized access: Only admins can edit a video inside a course" });
        }

        const foundVideoIndex = foundCourse.videos.findIndex((el) => el._id.toString() === videoId);
       
        if (foundVideoIndex === -1) {
           return  res.status(404).json({ message: "Video not found in the course" });
        }

        
        foundCourse.videos[foundVideoIndex] = { ...foundCourse.videos[foundVideoIndex], ...dataToBeUpdated };

        const updatedCourse = await foundCourse.save();

         res.status(200).json({ message: `Video under ${foundCourse.title} is updated`, data: updatedCourse });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Server side error in updating a video in a course", err });
    }
};
//delete video----
const deleteVideo=async(req,res)=>{
    const userId = req.user._id;
    
    const courseId = req.params.courseId;
    const videoId = req.params.videoId;
    try{
        if (!courseId) {
            return res.status(400).json({ message: "Enter a valid courseId" });
        }

        if (!videoId) {
            return res.status(400).json({ message: "Enter a valid videoId" });
        }

        const foundUser = await UserForElearning.findById(userId);
        let foundCourse = await CourseForLearning.findById(courseId);
        if (!foundUser.isAdmin) {
            return res.status(401).json({ message: "Unauthorized access: Only admins can edit a video inside a course" });
        }
        foundCourse.videos = foundCourse.videos.filter((el) => el._id.toString() !== videoId);
        
    
        const updatedCourse = await foundCourse.save();

        return res.status(200).json({ message: `Video deleted from ${foundCourse.title}`, data: updatedCourse });


    }catch(err){
        return res.status(500).json({ message: "Server side error in updating a video in a course", err });
    }
}


module.exports={
    //course releted
    createCourse,
    getAllCourses,
    updateCourse,
    deleteCourse,
    //video under a specif course releted
    addVideoToCourse,
    updateVideo,
    deleteVideo
}