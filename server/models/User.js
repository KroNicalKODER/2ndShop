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
    },
    email : {
        type: String,
        required: true,
        unique: true
    },
    password : {
        type: String,
    },
    phone : {
        type: String,
        required: true,
        unique: true
    },
    formGoogle: {
        type: Boolean,
        default: false
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