const { conexion } = require("./BD/conexion");
const express = require("express");
const cors = require("cors");
const fileUpload = require("express-fileupload")

// inicializar app
console.log("app de node arrancada");

// conectar a la base de datos
conexion();

// crear servidor node
const app = express();
const puerto = process.env.PORT || 3000;

// const corsOptions = {
//   origin: "https://northbairesparis.netlify.app", // Reemplaza con tu dominio frontend
//   methods: "GET,POST,PUT,DELETE",
//   allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'X-Access-Token', 'Authorization'],
//   credentials: true // Habilita las credenciales
// };
const corsOptions = {
	allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'X-Access-Token', 'Authorization'],
	credentials: true,
	origin: '*',
	preflightContinue: false,
};

// configurar cors
app.use(cors(corsOptions));

app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : './uploads'
}));

// convertir body a objeto js
app.use(express.json());
app.use(express.urlencoded({extended:true}));

const rutas_usuarios = require('./usuario/rutas/usuarios');
const clave_fiscal = require('./clavesImpositivas/rutas/clavesFiscal')
const egresos = require('./egresosIngresos/egresos/rutas/Egresos')
const ingreso = require('./egresosIngresos/ingresos/rutas/Ingreeso')
app.use("/api/user", rutas_usuarios);
app.use("/api/clave", clave_fiscal);
app.use('/api/egreso', egresos);
app.use('/api/ingreso', ingreso)

// Manejar solicitudes OPTIONS
app.options("/api/user/login", cors(corsOptions));

// crear servidor y escuchar peticiones
app.listen(puerto, ()=>{
    console.log("servidor corriendo en el puerto "+puerto);
});
