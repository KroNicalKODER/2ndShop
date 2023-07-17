import express from 'express'
import {update, del, get, cartItems} from '../controllers/user.js'
import getToken from '../getToken.js'

const router = express.Router()

//Update User Info
router.put('/:id',getToken,update)

//Delete Self Id
router.delete('/:id',getToken,del)

//Get a user
router.get('/find/:id',get)

router.get('/cart',getToken,cartItems)
//Buy an Item

export default router