import genErr from '../error.js'
import Shoes from '../models/Shoes.js'
import Clothing from '../models/Clothing.js'
import Accessories from '../models/Accessories.js'
import User from '../models/User.js'

export const sellShoes = async (req, res, next) => {
    const newItem = new Shoes({
        ownerId: req.user.id,
        ...req.body
    })
    try {
        const savedItem = await newItem.save()
        res.status(201).json(savedItem)
    } catch (error) {
        console.log(error)
        next(error)
    }
}
export const sellCloths = async (req, res, next) => {
    const newItem = new Clothing({
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
export const sellAccess = async (req, res, next) => {
    const newItem = new Accessories({
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

export const delShoes = async (req, res, next) => {
    const item = await Shoes.findById(req.params.id)
    if (item.ownerId === req.user.id) {
        try {
            Shoes.findByIdAndDelete(req.params.id)
            res.status(200).send("Shoe Deleted Successfully")
        } catch (error) {
            next(error)
        }
    } else {
        next(genErr(401, 'You are not authorized to delete this Item'))
    }
}

export const delCloths = async (req, res, next) => {
    const item = await Clothing.findById(req.params.id)
    if (item.ownerId === req.user.id) {
        try {
            Clothing.findByIdAndDelete(req.params.id)
            res.status(200).send("Cloth Deleted Successfully")
        } catch (error) {
            next(error)
        }
    } else {
        next(genErr(401, 'You are not authorized to delete this Item'))
    }
}

export const delAccess = async (req, res, next) => {
    const item = await Accessories.findById(req.params.id)
    if (item.ownerId === req.user.id) {
        try {
            Accessories.findByIdAndDelete(req.params.id)
            res.status(200).send("Accessory Deleted Successfully")
        } catch (error) {
            next(error)
        }
    } else {
        next(genErr(401, 'You are not authorized to delete this Item'))
    }
}

export const updateShoes = async (req, res, next) => {
    try {
        const item = await Shoes.findById(req.params.id)
        if (!item) next(genErr(404, 'Item Not Found'))
        if (item.ownerId === req.user.id) {
            const updatedItem = await Shoes.findByIdAndUpdate(req.params.id,
                {
                    $set: req.body
                }, { new: true })
            res.status(200).json("Updated Successfully")
        } else {
            next(genErr(403, "You can Update only your item"))
        }
    } catch (error) {
        next(error)
    }
}
export const updateCloths = async (req, res, next) => {
    try {
        const item = await Clothing.findById(req.params.id)
        if (!item) next(genErr(404, 'Item Not Found'))
        if (item.ownerId === req.user.id) {
            const updatedItem = await Clothing.findByIdAndUpdate(req.params.id,
                {
                    $set: req.body
                }, { new: true })
            res.status(200).json("Updated Successfully")
        } else {
            next(genErr(403, "You can Update only your item"))
        }
    } catch (error) {
        next(error)
    }
}
export const updateAccess = async (req, res, next) => {
    try {
        const item = await Accessories.findById(req.params.id)
        if (!item) next(genErr(404, 'Item Not Found'))
        if (item.ownerId === req.user.id) {
            const updatedItem = await Accessories.findByIdAndUpdate(req.params.id,
                {
                    $set: req.body
                }, { new: true })
            res.status(200).json("Updated Successfully")
        } else {
            next(genErr(403, "You can Update only your item"))
        }
    } catch (error) {
        next(error)
    }
}

export const addToCart = async (req, res, next) => {
    const obj = {
        id: req.params.id,
        type: req.params.type
    }
    const user = await User.findById(req.user.id)

    const isItemAlreadyPresent = user.itemCart.some(
        (item) => item.id === obj.id && item.type === obj.type
      );
    if (isItemAlreadyPresent) {
       // Item already exists in the cart
       return res.status(200).json({ message: 'Item already in cart' });
    }

    try {
        await User.findByIdAndUpdate(req.user.id, {
            $push: { itemCart: obj }
        })
        res.status(200).json({ message: true })
    } catch (error) {
        next(genErr(error))
    }
}

export const removeFromCart = async (req, res, next) => {
    const obj = {
        id: req.params.id,
        type: req.params.type
    }

    try {
        await User.findByIdAndUpdate(req.user.id, {
            $pull: { itemCart: obj }
        })
        res.status(200).json({ message: true })
    } catch (error) {
        next(genErr(error))
    }

}

export const buyShoes = async (req, res, next) => {
    try {
        const item = await Shoes.findById(req.params.id)
        if (item.ownerId === req.user.id) next(genErr(400, "You Cannot Buy the Prodeuct You Sold"))
        else {
            await Shoes.findByIdAndUpdate(req.params.id, {
                $set: {
                    buyerId: req.user.id,
                    buyerAddress: req.body.address
                }
            })
            res.status(200).json("You bought this Shoe..")
        }
    } catch (error) {
        next(error)
    }
}
export const buyCloths = async (req, res, next) => {
    try {
        const item = await Clothing.findById(req.params.id)
        if (item.ownerId === req.user.id) next(genErr(400, "You Cannot Buy the Prodeuct You Sold"))
        else {
            await Clothing.findByIdAndUpdate(req.params.id, {
                $set: {
                    buyerId: req.user.id,
                    buyerAddress: req.body.address
                }
            })
            res.status(200).json("You bought this Cloth..")
        }
    } catch (error) {
        next(error)
    }
}
export const buyAccess = async (req, res, next) => {
    try {
        const item = await Accessories.findById(req.params.id)
        if (item.ownerId === req.user.id) next(genErr(400, "You Cannot Buy the Prodeuct You Sold"))
        else {
            await Accessories.findByIdAndUpdate(req.params.id, {
                $set: {
                    buyerId: req.user.id,
                    buyerAddress: req.body.address
                }
            })
            res.status(200).json("You bought this Accessory..")
        }
    } catch (error) {
        next(error)
    }
}

export const getItems = async (req, res, next) => {
    const skip = req.query.skip ? Number(req.query.skip) : 0
    const DEFAULT_LIMIT = 10
    try {
        const shoes = await Shoes.find({ buyerId: '-' }).skip(skip).limit(DEFAULT_LIMIT);
        const clothing = await Clothing.find({ buyerId: '-' }).skip(skip).limit(DEFAULT_LIMIT);
        const accessories = await Accessories.find({ buyerId: '-' }).skip(skip).limit(DEFAULT_LIMIT);

        const obj = [...shoes, ...clothing, ...accessories];

        res.status(200).json({
            success: true,
            data: obj
        });
    } catch (error) {
        next(error)
    }
}


export const get_resale_items = async (req, res, next) => {
    try {
        const shoes = await Shoes.find({ resale: true }).limit(10);
        const clothing = await Clothing.find({ resale: true }).limit(10);
        const accessories = await Accessories.find({ resale: true }).limit(10);

        res.status(200).json({
            success: true,
            shoes,
            clothing,
            accessories,
        });
    } catch (error) {
        next(error);
    }

}

export const get_redesign_items = async (req, res, next) => {
    try {
        const shoes = await Shoes.find({ resale: false }).limit(10);
        const clothing = await Clothing.find({ resale: false }).limit(10);
        const accessories = await Accessories.find({ resale: false }).limit(10);

        res.status(200).json({
            success: true,
            shoes,
            clothing,
            accessories,
        });
    } catch (error) {
        next(error);
    }

}

export const findItem = async (req, res, next) => {
    if (req.params.type == 'FootWear') {
        try {
            const item = await Shoes.findById({ _id: req.params.id })
            res.status(200).json(item)
        } catch (error) {
            next(genErr(error))
        }
    }
    if (req.params.type == 'Clothing') {
        try {
            const item = await Clothing.findById({ _id: req.params.id })
            res.status(200).json(item)
        } catch (error) {
            next(genErr(error))
        }
    }
    if (req.params.type == 'Accessories') {
        try {
            const item = await Accessories.findById({ _id: req.params.id })
            res.status(200).json(item)
        } catch (error) {
            next(genErr(error))
        }
    }

}