import express from 'express'
import { SalesController } from "./controllers/sales-controller.js"

export const router = express.Router()

router.get('/', (req, res) => {
    res.send("Its working!")
})

router.get('/sales', SalesController.index)
router.get('/sales/:id', SalesController.show)
router.post('/sales', SalesController.create)
router.patch('/sales/:id', SalesController.update)
router.delete('/sales/:id', SalesController.delete)