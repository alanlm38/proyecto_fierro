import { Request, Response } from 'express'
import Product from '../models/Product.model'

export const getProducts = async (req: Request, res: Response) => {
    const { sortBy = 'id', order = 'DESC' } = req.query
    
    // Validar que sortBy sea una columna válida
    const validColumns = ['id', 'name', 'price', 'availability']
    if (!validColumns.includes(sortBy as string)) {
        return res.status(400).json({
            error: 'Columna de ordenamiento inválida'
        })
    }

    // Validar que order sea válido
    const validOrders = ['ASC', 'DESC']
    if (!validOrders.includes((order as string).toUpperCase())) {
        return res.status(400).json({
            error: 'Orden inválido'
        })
    }

    const products = await Product.findAll({
        order: [
            [sortBy as string, (order as string).toUpperCase()]
        ]
    })
    res.json({data: products})
}

export const getProductById = async (req: Request, res: Response) => {
    const { id } = req.params
    const product = await Product.findByPk(id)
    if(!product) {
        return res.status(404).json({
            error: 'Producto No Encontrado'
        })
    }
    res.json({data: product})
}

export const createProduct = async (req : Request, res : Response) => {
    const product = await Product.create(req.body)
    res.status(201).json({data: product})
}

export const updateProduct = async (req: Request, res: Response) => {
    const { id } = req.params
    const product = await Product.findByPk(id)

    if(!product) {
        return res.status(404).json({
            error: 'Producto No Encontrado'
        })
    }
    
    // Actualizar
    await product.update(req.body)
    await product.save()
    res.json({data: product})
}

export const updateAvailability = async (req: Request, res: Response) => {
    const { id } = req.params
    const product = await Product.findByPk(id)

    if(!product) {
        return res.status(404).json({
            error: 'Producto No Encontrado'
        })
    }
    
    // Actualizar
    product.availability = !product.dataValues.availability
    await product.save()
    res.json({data: product})
}

export const deleteProduct = async (req: Request, res: Response) => {
    const { id } = req.params
    const product = await Product.findByPk(id)

    if(!product) {
        return res.status(404).json({
            error: 'Producto No Encontrado'
        })
    }
    
    await product.destroy()
    res.json({data: 'Producto Eliminado'})
}