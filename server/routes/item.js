import express from 'express'
import getToken from '../getToken.js'
import {
    sellShoes,sellCloths, sellAccess, 
    buyShoes,buyAccess,buyCloths, 
    delAccess,delShoes,delCloths,
    updateShoes,updateAccess,updateCloths, 
    get_resale_items, get_redesign_items, getItems, findItem
} from '../controllers/item.js'

const router = express.Router()

//get resale items
router.get("/resale", get_resale_items)
//get redesign items
router.get("/redesign", get_redesign_items)

//get the items
router.get("/",getItems)

//Sell an Item
router.post("/shoes", getToken, sellShoes)
router.post("/cloths", getToken, sellCloths)
router.post("/access", getToken, sellAccess)

//Delete an Item
router.delete("/shoes/:id", getToken, delShoes)
router.delete("/cloths/:id", getToken, delCloths)
router.delete("/access/:id", getToken, delAccess)

//Update an Item
router.put("/shoes/:id", getToken, updateShoes)
router.put("/cloths/:id", getToken, updateCloths)
router.put("/access/:id", getToken, updateAccess)

//Buy an Item
router.put("/buy/shoes/:id", getToken, buyShoes)
router.put("/buy/cloths/:id", getToken, buyCloths)
router.put("/buy/access/:id", getToken, buyAccess)

//Find an Item
router.get("/:id/:type",findItem)

//?? Action on Item After One month

export default router