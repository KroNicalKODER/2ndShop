import User from "../models/User.js"
import genError from "../error.js"
import Shoes from '../models/Shoes.js'
import Clothing from '../models/Clothing.js'
import Accessories from '../models/Accessories.js'

export const update = async (req,res,next) => {
    if(req.params.id === req.user.id){
        try {
            const updatedUser = await User.findByIdAndUpdate(req.params.id,{
                $set: req.body
            },{new : true})
            res.status(200).json(updatedUser)
        } catch (error) {
            next(genError(error))
        }
    }else {
        next(genError(403,"User can Update only its own account"))
    }

}

export const del = async (req,res,next)=>{
    if(req.params.id === req.user.id){
        try {
            const deletedUser = await User.findByIdAndDelete(req.params.id)
            res.status(200).json(deletedUser)
        } catch (error) {
            next(genError(error))
        }
    } else {
        next(genError(403,"User can Delete only its own account"))
    }
}

export const get = async (req,res,next) => {
    try {
        const user = await User.findById(req.params.id)
        if(user){
            res.status(200).json(user)
        }else {
            next(genError(404,"User not found"))
        }
    } catch (error) {
        next(genError(error))
    }
}

export const cartItems = async (req,res,next) => {
    const user = await User.findById(req.user.id)
    const arr = user.itemCart
    let resArr = []
    for (let index = 0; index < arr.length; index++) {
        const obj1 = arr[index]
        let item={};
        if(obj1.type === 'FootWear') {
            resArr.push(await Shoes.findById(obj1.id ))
        }
        if(obj1.type === 'Accessories') {
            resArr.push(await Accessories.findById(obj1.id))
        }
        if(obj1.type === 'Clothing') {
            resArr.push(await Clothing.findById(obj1.id))
        }
    }
    res.status(200).json(resArr)
}
