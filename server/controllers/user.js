import User from "../models/User.js"
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
            const { productId } = req.body;
        
            // Find the user and update the itemCart array
            const user = await User.findById(userId);
            if (!user) {
              return res.status(404).json({ message: 'User not found' });
            }
        
            // Check if the item already exists in the itemCart array
            const existingItem = user.itemCart.find(itemId => itemId.toString() === productId);
        
            if (existingItem) {
              return res.status(400).json({ message: 'Item already exists in the cart' });
            }
        
            // Add the item ID to the itemCart array
            user.itemCart.push(productId);
            await user.save();
        
            res.status(200).json({ message: 'Item added to cart successfully' });
          } catch (error) {
            console.error('Error adding item to cart:', error);
            res.status(500).json({ message: 'An error occurred while adding the item to cart' });
          }
}