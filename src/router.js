import express from 'express'

import { AuthController } from "./controllers/auth-controller.js"
import { SalesController } from "./controllers/sales-controller.js"
import { ProductsController } from "./controllers/products-controller.js"

export const router = express.Router()

router.get('/', (req, res) => {
    res.send("Its working!")
})

router.post('/register', AuthController.register)
router.post('/login', AuthController.authenticate)

router.get('/sales', SalesController.index)
router.get('/sales/:id', SalesController.show)
router.post('/sales', SalesController.create)
router.patch('/sales/:id', SalesController.update)
router.delete('/sales/:id', SalesController.delete)

router.get('/products', ProductsController.index)
router.get('/products/:id', ProductsController.show)
router.post('/products', ProductsController.create)
router.patch('/products/:id', ProductsController.update)
router.delete('/products/:id', ProductsController.delete)