import { Product } from "../types"

type ProductFormProps = {
    product?: Product
}
// This component is used to create or edit a product
// It receives a product prop which is optional 
// If the product prop is provided, it will be used to populate the form fields
// If the product prop is not provided, the form will be empty

export default function ProductForm({product} : ProductFormProps) {
  return (
    <>
        <div className="mb-4">
            <label
                className="text-gray-800"
                htmlFor="name"
            >Nombre Producto:</label>
            <input 
                id="name"
                type="text"
                className="mt-2 block w-full p-3 bg-gray-50"
                placeholder="Nombre del Producto"
                name="name"
                defaultValue={product?.name}
            />
        </div>

        <div className="mb-4">
            <label
                className="text-gray-800"
                htmlFor="price"
            >Precio:</label>
            <input 
                id="price"
                type="number"
                className="mt-2 block w-full p-3 bg-gray-50"
                placeholder="Precio Producto. ej. 200, 300"
                name="price"
                defaultValue={product?.price}
            />
        </div>
    
    </>
  )
}
