import mongoose from "mongoose";

const ItemSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    ownerId:{
        type: String,
    },
    passedMonth:{
        type: Boolean,
        default: false
    },
    delivered: {
        type: Boolean,
        default: false
    },
    buyerId: {
        type: String,
        default: 'null'
    },
    brandName: {
        type: String,
        required: true
    },
    age:{
        type: Number,
        required: true
    },
    imgs: {
        type: [String],
        required: true
    },
    oldCost:{
        type: String,
        required: true
    },
    newCost: {
        type: String,
        required: true
    },
    orgLink: {
        type: String,
    },
    pickupAddress: {
        type: String,
        required: true
    },
    noteForBuyer: {
        type: String,
    },
    itemType: {
        type: String,
        required: true
    },
    itemSize: {
        type: String,
        required: true
    },
    buyerAddress: {
        type: String
    }

},
{
    timestamps:true
}
)

export default mongoose.model("item",ItemSchema)