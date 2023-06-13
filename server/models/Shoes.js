import mongoose from "mongoose";

const shoeSchema = mongoose.Schema({
    name: {
        type: String,
    },
    ownerId: {
        type: String,
        required: true
    },
    brandName: {
        type: String,
        required: true
    },
    size:{
        type: String,
        required: true
    },
    images: {
        type: [String],
        required: true
    },
    oldCost: {
        type: Number,
    },
    newCost: {
        type: Number,
        required: true
    },
    resale: {
        type: Boolean,
        required: true
    },
    orgLink: {
        type: String
    },
    pickupAddress: {
        type: String,
        required: true
    },
    noteForBuyer: {
        type: String,
        required: true
    },
    buyerId : {
        type: String,
    },
    buyerAddress: {
        type: String,
    },
    gender: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    delivered:{
        type: Boolean,
        default: false
    }
},{
    timestamps: true
})

export default mongoose.model("shoes",shoeSchema)