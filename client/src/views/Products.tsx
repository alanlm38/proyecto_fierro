import { ActionFunctionArgs, Link, useLoaderData, useSearchParams } from 'react-router-dom'
import { getProducts, updateProductAvailability, exportProductsToExcel } from '../services/ProductService'
import ProductDetails from '../components/ProductDetails'
import { Product } from '../types'

export async function loader({ request }: ActionFunctionArgs) {
  try {
    const url = new URL(request.url)
    const sortBy = url.searchParams.get('sortBy') || 'id'
    const order = url.searchParams.get('order') || 'DESC'
    const products = await getProducts(sortBy, order)
    return products ?? [] // si es null o undefined, retorna []
  } catch (error) {
    console.error('Error en loader de productos:', error)
    return [] // evitar que el loader falle
  }
}

export async function action({ request }: ActionFunctionArgs) {
  const data = Object.fromEntries(await request.formData())
  await updateProductAvailability(+data.id)
  return {}
}

export default function Products() {
  const data = useLoaderData() as Product[]
  const [searchParams, setSearchParams] = useSearchParams()
  const currentSortBy = searchParams.get('sortBy') || 'id'
  const currentOrder = searchParams.get('order') || 'DESC'

  const handleSort = (column: string) => {
    const newOrder =
      currentSortBy === column && currentOrder === 'ASC' ? 'DESC' : 'ASC'
    setSearchParams({ sortBy: column, order: newOrder })
  }

  const handleDownloadExcel = async () => {
    try {
      await exportProductsToExcel()
    } catch (error) {
      console.error(error)
      alert('No se pudo descargar el archivo Excel.')
    }
  }

  return (
    <>
      <div className="flex justify-between items-center">
        <h2 className="text-4xl font-black text-slate-500">Productos</h2>
        <div className="flex gap-2">
          <button
            onClick={handleDownloadExcel}
            className="rounded-md bg-green-600 px-4 py-2 text-sm font-bold text-white shadow-sm hover:bg-green-500"
          >
            📥 Descargar Excel
          </button>
          <Link
            to="productos/nuevo"
            className="rounded-md bg-indigo-600 p-3 text-sm font-bold text-white shadow-sm hover:bg-indigo-500"
          >
            Agregar Producto
          </Link>
        </div>
      </div>

      <div className="p-2">
        <table className="w-full mt-5 table-auto">
          <thead className="bg-slate-800 text-white">
            <tr>
              <th
                className="p-2 cursor-pointer hover:bg-slate-700"
                onClick={() => handleSort('name')}
              >
                Producto{' '}
                {currentSortBy === 'name' &&
                  (currentOrder === 'ASC' ? '↑' : '↓')}
              </th>
              <th
                className="p-2 cursor-pointer hover:bg-slate-700"
                onClick={() => handleSort('price')}
              >
                Precio{' '}
                {currentSortBy === 'price' &&
                  (currentOrder === 'ASC' ? '↑' : '↓')}
              </th>
              <th
                className="p-2 cursor-pointer hover:bg-slate-700"
                onClick={() => handleSort('availability')}
              >
                Disponibilidad{' '}
                {currentSortBy === 'availability' &&
                  (currentOrder === 'ASC' ? '↑' : '↓')}
              </th>
              <th className="p-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {data.map((product) => (
              <ProductDetails key={product.id} product={product} />
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}
