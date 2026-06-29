import mongoose from "mongoose";

const imageScgema = mongoose.Schema({
    path:{type:String, required:true},
    fileName:{type:String, required:true}
}, { timestamps: true })

const ImageModel = mongoose.model("image", imageScgema)

export default ImageModel