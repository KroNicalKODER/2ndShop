import express from 'express'
import getToken  from '../getToken.js'
import {sellShoes,sellCloths,sellAccess,buy,update,del, get_resale_items, get_redesign_items} from '../controllers/item.js'

const router = express.Router()

//get resale items
router.get("/resale",get_resale_items)

//get redesign items
router.get("/redesign",get_redesign_items)
//Sell an Item
router.post("/shoes",getToken,sellShoes)
router.post("/cloths",getToken,sellCloths)
router.post("/access",getToken,sellAccess)

//Delete an Item
router.delete("/:id",getToken,del)

//Update an Item
router.put("/:id",getToken,update)

//Buy an Item
router.put("/buy/:id",getToken,buy)

//?? Action on Item After One month

export default router