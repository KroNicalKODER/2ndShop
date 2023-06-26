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

export const del = async (req, res, next) => {
    if (req.params.type === 'shoes') {
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
    else if (req.params.type === 'cloths') {
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
    else if (req.params.type === 'access') {
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

}

export const update = async (req, res, next) => {
    if (req.params.type === 'shoes') {
        try {
            const item = await Item.findById(req.params.id)
            if (!item) next(genErr(404, 'Item Not Found'))
            if (item.ownerId === req.user.id) {
                const updatedItem = await Item.findByIdAndUpdate(req.params.id,
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
    else if (req.params.type === 'cloths') {
        try {
            const item = await Item.findById(req.params.id)
            if (!item) next(genErr(404, 'Item Not Found'))
            if (item.ownerId === req.user.id) {
                const updatedItem = await Item.findByIdAndUpdate(req.params.id,
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
    else if (req.params.type === 'access') {
        try {
            const item = await Item.findById(req.params.id)
            if (!item) next(genErr(404, 'Item Not Found'))
            if (item.ownerId === req.user.id) {
                const updatedItem = await Item.findByIdAndUpdate(req.params.id,
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
}

export const buy = async (req, res, next) => {
    if (req.params.type === 'shoes') {
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
    else if (req.params.type === 'cloths') {
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
    else if (req.params.type === 'access') {
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
}
