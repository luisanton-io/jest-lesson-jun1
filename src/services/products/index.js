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

productsRouter.delete('/:id', async (req, res) => {
    try {
        const product = await ProductModel.findByIdAndDelete(req.params.id)
        if (product) {
            res.status(204).send()
        } else {
            next(createError(404, `product ${req.params.id} not found`))
        }
    } catch (error) {
        console.log(error)
        next(createError(500, "An error occurred while deleting product"))
    }
})

productsRouter.put("/:id", async (req, res, next) => {
    try {
      const product = await ProductModel.findByIdAndUpdate(req.params.id, req.body, {
        runValidators: true,
        new: true,
      })
      if (product) {
        res.send(product)
      } else {
        next(createError(404, `Student ${req.params.id} not found`))
      }
    } catch (error) {
      console.log(error)
      next(createError(500, "An error occurred while modifying student"))
    }
  })
  


export default productsRouter