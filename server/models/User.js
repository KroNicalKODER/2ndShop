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
    },
    fromGoogle: {
        type: Boolean,
        default: false
    },
    itemCart: {
        type:[Object]
    },
    itemBought: {                   //URLS FOR ITEM BOUGHT
        type: [Object],
    },
    pincode: {
        type: String
    },
    itemSold: {
        type: [Object]
    },
    itemRequested: {
        type: [Object]
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