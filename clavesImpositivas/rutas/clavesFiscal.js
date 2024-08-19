const express = require('express');
const multer = require('multer');
const router = express.Router();
const ClaveControlador = require('../controladores/ClavesImpositivas');
const middlewares = require('../../middlewares/auth')

router.post("/crear", ClaveControlador.crear);
router.get("/claves", middlewares.auth, ClaveControlador.listar);
router.put("/editar/:id", middlewares.auth, ClaveControlador.editar);
router.get("/clave/:id", middlewares.auth, ClaveControlador.uno);
router.get("/buscar/:busqueda",  ClaveControlador.buscador);
router.get("/buscarpersona/:busqueda", middlewares.auth, ClaveControlador.buscadorPersona);

module.exports = router;