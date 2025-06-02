import { PropsWithChildren } from "react";
//regresa un mensaje de error en caso de que ocurra un error en la aplicacion
export default function ErrorMessage({children} : PropsWithChildren) {
  return (
    <div className="text-center my-4 bg-red-600 text-white font-bold p-3 uppercase">
        {children}
    </div>
  )
}
