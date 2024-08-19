const express = require('express');
const multer = require('multer');
const router = express.Router();
const EgresosControlador = require('../controladores/Egresos');
const middlewares = require('../../../middlewares/auth')

router.post("/crear", EgresosControlador.crear);
router.get("/egreso", middlewares.auth, EgresosControlador.listar);
// router.put("/editar/:id", middlewares.auth, ClaveControlador.editar);
// router.get("/clave/:id", middlewares.auth, ClaveControlador.uno);
// router.get("/buscar/:busqueda",  ClaveControlador.buscador);
// router.get("/buscarpersona/:busqueda", middlewares.auth, ClaveControlador.buscadorPersona);

module.exports = router;