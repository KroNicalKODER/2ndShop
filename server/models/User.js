import { Timestamp } from "mongodb";
import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name : {
        type: String,
        required: true
    },
    avatarUrl: {
        type: String,
    },
    address : {
        type: String,
        required: true
    },
    email : {
        type: String,
        required: true
    },
    password : {
        type: String,
        required: true
    },
    phone : {
        type: String,
        required: true
    },
    itemCart: {
        type:[String]
    },
    itemBought: {                   //URLS FOR ITEM BOUGHT
        type: [String],
    },
    itemSold: {
        type: [String]
    },
    itemRequested: {
        type: [String]
    },
    reportedBy: {
        type: [String]
    }

},
{
    timestamps:true
}
)
export default mongoose.model('user', UserSchema)