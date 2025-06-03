import { safeParse, coerce, number, parse } from 'valibot';
import axios from 'axios';
import { DraftProductSchema, ProductsSchema, Product, ProductSchema } from "../types";
import { toBoolean } from '../utils';

type ProductData = {
    [k: string]: FormDataEntryValue;
}

export async function addProduct(data : ProductData) {
    try {
        const result = safeParse(DraftProductSchema, {
            name: data.name,
            price: +data.price
        })
        if(result.success) {
            const url = `${import.meta.env.VITE_API_URL}/api/products`
            await axios.post(url, {
                name: result.output.name,
                price: result.output.price
            })
        } else {
            throw new Error('Datos no válidos')
        }
    } catch (error) {
        console.log(error)
    }
}

export async function getProducts(sortBy: string = 'id', order: string = 'DESC') {
    try {
        const url = `${import.meta.env.VITE_API_URL}/api/products?sortBy=${sortBy}&order=${order}`
        const { data } = await axios(url)
        const result = safeParse(ProductsSchema, data.data)
        if(result.success) {
            return result.output
        } else {
            throw new Error('Hubo un error...')
        }
    } catch (error) {
        console.log(error)
        return []
    }
}

export async function getProductById(id : Product['id']) {
    try {
        const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`
        const { data } = await axios(url)
        const result = safeParse(ProductSchema, data.data)
        if(result.success) {
            return result.output
        } else {
            throw new Error('Hubo un error...')
        }
    } catch (error) {
        console.log(error)
    }
}

export async function updateProduct(data : ProductData, id: Product['id'] ) {
    try {
        const NumberSchema = coerce(number(), Number)

        const result = safeParse(ProductSchema, {
            id,
            name: data.name,
            price: parse(NumberSchema, data.price),
            availability: toBoolean(data.availability.toString())
        })
       
        if(result.success) {
            const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`
            await axios.put(url, result.output)
        }
    } catch (error) {
        console.log(error)
    }
}

export async function deleteProduct(id: Product['id']) {
    try {
        const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`
        await axios.delete(url)
    } catch (error) {
        console.log(error)
    }
}

export async function updateProductAvailability(id: Product['id']) {
    try {
        const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`
        await axios.patch(url)
    } catch (error) {
        console.log(error)
    }
}

export async function exportProductsToExcel() {
  try {
    // 1) Construir la URL completa al endpoint de exportación
    const url = `${import.meta.env.VITE_API_URL}/api/products/export/excel`;
    
    // 2) Hacer la petición con responseType = 'blob' para recibir datos binarios
    const response = await axios.get(url, {
      responseType: 'blob',
      headers: {
        Accept: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      }
    });
    
    // 3) Crear un objeto Blob con el contenido y tipo MIME adecuado
    const blob = new Blob([response.data], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    });
    
    // 4) Crear una URL temporal para el Blob y forzar la descarga
    const downloadUrl = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = downloadUrl;
    a.download = 'productos.xlsx'; // nombre sugerido para el archivo
    document.body.appendChild(a);
    a.click();
    URL.revokeObjectURL(downloadUrl);
    document.body.removeChild(a);
  } catch (error) {
    console.error('Error al descargar el Excel de productos:', error);
    throw error;
  }
}