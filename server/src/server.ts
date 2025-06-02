import express from 'express' 
import colors from 'colors'
import cors, { CorsOptions } from 'cors'
import morgan from 'morgan'
import swaggerUi from 'swagger-ui-express'
import swaggerSpec, { swaggerUiOptions } from './config/swagger'
import router  from './router'
import db from './config/db'

// Conectar a base de datos
export async function connectDB() {
    try {
       await db.authenticate()
await db.sync({ force: true }) // Esto recreará las tablas


        // console.log( colors.blue( 'Conexión exitosa a la BD'))
    } catch (error) {
        console.log(error)
        console.log( colors.red.bold( 'Hubo un error al conectar a la BD') )
    }
}
connectDB()

// Instancia de express
const server = express()

// Permitir conexiones
const corsOptions: CorsOptions = {
  origin: function (origin, callback) {
    if (!origin || origin === process.env.FRONTEND_URL) {
      callback(null, true);
    } else {
      callback(new Error('Error de CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  credentials: true
};

server.use(cors(corsOptions))

// Leer datos de formularios
server.use(express.json())

server.use(morgan('dev'))

server.use('/api/products', router)

// Docs
server.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, swaggerUiOptions) )

server.get('/', (req, res) => {
  res.send('✅ API RESTful funcionando correctamente en Render 🚀');
});


export default server