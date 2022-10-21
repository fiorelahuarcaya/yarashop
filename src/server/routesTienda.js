const express = require("express");
const { db } = require("./db.js");
const routes = express.Router();

routes.get("/", (req, res) => {
  db("SELECT * FROM [dbo].[tienda];", (record) => {
    const r = record.recordsets;
    res.send(r);
  });
});

//SELECT según ID
routes.get("/:id", (req, res) => {
  let id = req.params.id;
  db(`SELECT * FROM [dbo].[tienda] WHERE idTienda = ${id};`, (record) => {
    const r = record.recordsets;
    res.send(r);
  });
});

//SELECT según ID ADMIN
routes.get("/admin/:id", (req, res) => {
  let id = req.params.id;
  db(
    `SELECT * FROM [dbo].[tienda] WHERE idAdministrador = ${id};`,
    (record) => {
      const r = record.recordsets;
      res.send(r);
    }
  );
});

routes.post("/", (req, res) => {
  //INSERT INTO categoria (idCategoria, nombreCat, descripcion) VALUES
  //(9, 'Tubérculos', 'papas, camotes'),
  // "idCategoria":9,"nombreCat":"Tubérculos","descripcion":"papas, camotes"
  const { idAdministrador, nombreTienda, telefono, ubicacion } = req.body;
  db(
    `INSERT INTO [dbo].[tienda] (idAdministrador, nombreTienda, telefono, direccionProvee, ubicacion) VALUES (${idAdministrador}, '${nombreTienda}', '${telefono}', '${direccionProvee}', '${ubicacion}')`,
    (record) => {
      res.send(record);
    }
  );
});

routes.delete("/:id", (req, res) => {
  let id = req.params.id;
  db(`DELETE FROM [dbo].[tienda] WHERE idTienda = ${id}`, (record) => {
    res.send(record);
  });
});

routes.put("/:id", (req, res) => {
  let id = req.params.id;
  const { idAdministrador, nombreTienda, telefono, ubicacion } = req.body;

  let str = "";

  if (idAdministrador != null) str += ` idAdministrador = ${idAdministrador} ,`;

  if (nombreTienda != null) str += ` nombreTienda ='${nombreTienda}' ,`;

  if (telefono != null) str += ` telefono ='${telefono}' ,`;

  if (ubicacion != null) str += ` ubicacion ='${ubicacion}' ,`;

  str = str.substring(0, str.length - 1);

  db(`UPDATE [dbo].[tienda] SET ${str} WHERE idTienda = ${id}`, (record) => {
    res.send(record);
  });
});

module.exports = routes;
