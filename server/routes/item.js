import express from 'express'
import getToken  from '../getToken.js'
import {sell,buy,update,del} from '../controllers/item.js'

const router = express.Router()

//Sell an Item
router.post("/",getToken,sell)

//Delete an Item
router.delete("/:id",getToken,del)

//Update an Item
router.put("/:id",getToken,update)

//Buy an Item
router.put("/buy/:id",getToken,buy)

//?? Action on Item After One month

export default router