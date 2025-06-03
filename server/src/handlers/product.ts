import { Request, Response } from 'express'
import Product from '../models/Product.model'
import ExcelJS from 'exceljs'

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
// ──────────────────────────────────────────────────────────────────
//  NUEVA FUNCIÓN: generar y descargar un archivo .xlsx con todos los productos
// ──────────────────────────────────────────────────────────────────

export const exportProductsToExcel = async (req: Request, res: Response) => {
    try {
        // 1) Obtener todos los productos
        const products = await Product.findAll()

        // 2) Crear un nuevo workbook y una hoja llamada "Productos"
        const workbook = new ExcelJS.Workbook()
        const worksheet = workbook.addWorksheet('Productos')

        // 3) Definir columnas: encabezados y claves (key) para mapear cada campo
        worksheet.columns = [
            { header: 'ID', key: 'id', width: 10 },
            { header: 'Nombre', key: 'name', width: 30 },
            { header: 'Precio', key: 'price', width: 12 },
            { header: 'Disponible', key: 'availability', width: 12 }
        ]

        // 4) Rellenar cada fila con los datos de cada producto
        products.forEach(prod => {
            worksheet.addRow({
                id: prod.id,
                name: prod.name,
                price: prod.price,
                availability: prod.availability ? 'Sí' : 'No'
            })
        })

        // 5) Formatear encabezados (fila 1) en negrita y centrado
        worksheet.getRow(1).font = { bold: true }
        worksheet.getRow(1).alignment = { horizontal: 'center' }

        // 6) Formato de columna “price” como moneda (opcional)
        worksheet.getColumn('price').numFmt = '$#,##0.00'

        // 7) Configurar headers HTTP para descarga de Excel
        res.setHeader(
            'Content-Type',
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        )
        res.setHeader('Content-Disposition', 'attachment; filename=productos.xlsx')

        // 8) Escribir el workbook directamente en la respuesta
        await workbook.xlsx.write(res)
        return res.status(200).end()
    } catch (error) {
        console.error('Error al generar Excel de productos:', error)
        return res.status(500).json({ message: 'Error al generar archivo Excel' })
    }
}