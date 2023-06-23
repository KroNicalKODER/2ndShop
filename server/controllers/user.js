import User from "../models/User.js"
import Cart from '../models/Cart.js'
import genError from "../error.js"

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

export const buy = async (req,res,next) => {
    
}


//add to cart
export const add_to_cart = async(req,res,next)=>{
    try {
        
        const userId = req.params.id;
        // console.log(userId);
        const { productType, productId, quantity, price, productName, productImage } = req.body;
    
        // Find the user's cart or create a new one if it doesn't exist
        let cart = await Cart.findOne({ userId });
        if (!cart) {
          cart = new Cart({ userId, items: [] });
        }
    
        // Check if the item already exists in the cart
        const existingItem = cart.items.find(item => item.productId.toString() === productId);
    
        if (existingItem) {
          // Update the quantity if the item already exists
          existingItem.quantity += quantity;
        } else {
          // Add the new item to the cart
          cart.items.push({ productType, productId, quantity, price, productName, productImage });
        }
    
        // Save the updated cart
        await cart.save();
    
        res.status(200).json({ message: 'Item added to cart successfully' });
      } catch (error) {
        console.error('Error adding item to cart:', error);
        res.status(500).json({ message: 'An error occurred while adding the item to cart' });
      }
}