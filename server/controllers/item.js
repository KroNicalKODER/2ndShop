import genErr from '../error.js'
import Item from '../models/Item.js'
import User from '../models/User.js'

export const sell = async (req,res,next) => {
    const newItem = new Item({
        ownerId: req.user.id,
        ...req.body
    })
    try {
        const savedItem = await newItem.save()
        res.status(201).json(savedItem)
    } catch (error) {
        next(error)
    }
}

export const del = async(req,res,next)=> {
    const item = await Item.findById(req.params.id)
    if(item.ownerId === req.user.id) {
        try {
            Item.findByIdAndDelete(req.params.id)
            res.status(200).send("Video Deleted Successfully")
        } catch (error) {
            next(error)
        }
    } else {
        next(genErr(401,'You are not authorized to delete this Item'))
    }
}

export const update = async (req,res,next) => {
    try {
        const item = await Item.findById(req.params.id)
        if(!item) next(genErr(404,'Item Not Found'))
        if(item.ownerId === req.user.id) {
            const updatedItem = await Item.findByIdAndUpdate(req.params.id,
                {
                    $set: req.body
                },{new:true})
            res.status(200).json("Updated Successfully")
        } else {
            next(genErr(403,"You can Update only your item"))
        }
    } catch (error) {
        next(error)
    }
}

export const buy = async(req,res,next) => {
    try {
        const item = await Item.findById(req.params.id)
        if(item.ownerId === req.user.id) next(genErr(400,"You Cannot Buy the Prodeuct You Sold"))
        else{
            await Item.findByIdAndUpdate(req.params.id,{
                $set: {
                    buyerId: req.user.id,
                    buyerAddress: req.body.address
                }
            })
            res.status(200).json("You bought this item..")
        }
    } catch (error) {
        next(error)
    }
}
