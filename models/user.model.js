const mongoose=require("mongoose")

const userSchema=new mongoose.Schema({
firstName:{
    type:String,
    require:true
},
lastName:{
    type:String,
    require:true
},
    userName:{
        type:String,
        require:true,
        unique:true
    },
    email:{
        type:String,
        require:true
    },
    phoneNumber:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
    profilePicture:{
        type:String,
        default:"data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAIMAgwMBIgACEQEDEQH/xAAbAAEAAwEBAQEAAAAAAAAAAAAABQYHBAEDAv/EADgQAAICAQICBgYHCQAAAAAAAAABAgMEBREGQRIhMXGhsSIyQlJhgSNDUWJjkdETFBU0U3OiweH/xAAWAQEBAQAAAAAAAAAAAAAAAAAAAQL/xAAWEQEBAQAAAAAAAAAAAAAAAAAAARH/2gAMAwEAAhEDEQA/ANSABpkAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA8bSTb6kgPzbZCmuVl04whFbylJ7JFczeMceqTjh48r9vbk+gvLcguJNZnqeU4VyaxK36EfefvMhymrZTxpLpbX4K6P3LOvxRYtM1TE1OtyxbN5L1oSW0o/IzE+mNfbjXwvom4Wwe8ZIDVwcGi6jDVMCGRFKM16NkF7Mv0O8gAAAAAAAAAAAAABE8U5TxdEvcHtKzatPv7fDcliv8AG6b0eD5K6PkwKIADSAAJSLHwRlOvU7MZ+pdW3t96PZ4bl4M94RTevUbclN/4s0IigAAAAAAAAAAAAAR3EOI8zRsmqCbmo9OKXNrr/wBEiAMkBZuI+HLarp5eBU7KZPpTriuuD57LmvIrPMoAHdpelZWp2qONW+gvWtfqx+fPuAmuBcVyy78tr0a4dCL+L6/JeJczl03Bq07DrxqPVj2yfbJ82zqIAAAAAAAAAAAAAAAROra/h6Y3CUnbf/Shtuu98gJY58jBxMp9LIxabH704Jv8+0o+dxRqWS2qrI48OSqXX+b6/IibcnIue919s39+bZTWkV6RpsHvDBx91+Gn5nakopJLZLl9hk8bJxe8ZyT+1M78XXNTxX9Hl2Sj7tj6a8Qa0oFX0zi+q1xr1GtUyf1sOuHzXavEs0JxshGdclKElupRe6fcQfoAAAAAAAAAAACJ4k1T+Gae5Vva+19Gr4Pm/kBHcT8QvGlLCwJ/Tdllq9j4L4+RTG223Jtt9bb7Txtt7ttt9bbBSgAKgAABLaFrl+lWqEm7MWT9Ov7PjH4+ZEgitXouryKYXUTU65reMlzR9CkcHaq8fK/cLpb03P6Pf2Z/9LuQAAAAAAAADPeLMx5WsWQT9Chfs49/Px8jQZS6Kcn2JbmUW2O22dsu2cnJ97e4H4ABpAAAAAAAAHsZOMlKLaknumuTNQ0zLWdp9GT1b2QTaXJ8/Hcy4vXBFrnpEq39Xc0u5pP9SKsIAIAAAAAD5ZXVi3f25eRlEfVXcAEr0AGgAAAAAAAALnwH/JZa/FXkeglFnABGgABH/9k="
    },
    age:{
        type:Number,
        
    },
    about:{
        type:String
    },
    gender:{
        type:String
    },
   
   
    bookmark: {
        type: [mongoose.Schema.Types.Mixed],
        default: [],
    }

},{
    timestamps:true
})
const UserForElearning=new mongoose.model("UserForElearning",userSchema)
module.exports=UserForElearning; 