import mongoose ,{ Schema } from 'mongoose';
import mongooseAggregatePaginate from 'mongoose-aggregate-paginate-v2';// Import mongoose and the pagination plugin

const videoSchema = new Schema({
    title: {
        type: String,
        required: [true, "Title is required"],
        trim: true
    },
    description: {
        type: String,
        required: [true, "Description is required"],
        trim: true
    },
    videofile: {
        type: String,
        required: [true, "Video file is required"],//cloudinary url
        trim: true
    },
    thumbnail: {
        type: String,
        required: [true, "Thumbnail URL is required"],//cloudinary url
        trim: true
    },
   duration: {
       type: Number,
       required: [true, "Duration is required"]
   },
   views:{
       type: Number,
       default: 0
   },

    owner: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: [true, "User ID is required"]
    },
    ispublished: {
        type: Boolean,
        default: false
    }

}, {
    timestamps: true,// Automatically manage createdAt and updatedAt fields
    
});
videoSchema.plugin(mongooseAggregatePaginate);// Add pagination support to the video schema

export const Video = mongoose.model("Video", videoSchema);// Export the Video model for use in other parts of the application