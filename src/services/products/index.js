import express from "express"
import ProductModel from "../../models/products/index.js"

const { Router } = express

const productsRouter = new Router()

productsRouter.get("/", async (req, res) => {
    const products = await ProductModel.find({})
    res.status(200).send({ products })
})

productsRouter.get('/:id', async (req, res) => {
    try {
        const product = await ProductModel.findById(req.params.id)
        if (!product) {
            res.status(404).send();
            return
        }

        res.status(200).send(product)
    } catch (error) {
        res.status(404).send();
    }
})

productsRouter.post("/", async (req, res) => {

    try {
        const { description, price } = req.body

        if (!description || !price) throw new Error("Invalid data")

        const product = new ProductModel({ description, price })
        await product.save()

        res.status(201).send(product)

    } catch (error) {
        res.status(400).send({ message: error.message })
    }
})


export default productsRouter