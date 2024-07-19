import mongoose from "mongoose";

const conversationModel = new mongoose.Schema({
    participants:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",

    }],
    message:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Message",
    }]
},{timestamps:true} /// kab user create hua hai time store hoga...
);
export const Conversation = mongoose.model("Conversation", conversationModel);