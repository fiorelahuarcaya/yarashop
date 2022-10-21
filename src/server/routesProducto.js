const express = require("express");
const { db } = require("./db.js");
const routes = express.Router();

routes.get("/", (req, res) => {
  db("SELECT * FROM [dbo].[producto];", (record) => {
    const r = record.recordsets;
    res.send(r);
  });
});

//SELECT según ID Producto
routes.get("/:id", (req, res) => {
  let id = req.params.id;
  db(`SELECT * FROM [dbo].[producto] WHERE idProducto = ${id};`, (record) => {
    const r = record.recordsets;
    res.send(r);
  });
});

//SELECT según ID Categoria
routes.get("/categoria/:id", (req, res) => {
  let id = req.params.id;
  db(`SELECT * FROM [dbo].[producto] WHERE idCategoria = ${id};`, (record) => {
    const r = record.recordsets;
    res.send(r);
  });
});

//INSERT ONE ROW
routes.post("/", (req, res) => {
  const {
    idProducto,
    idCategoria,
    nombreP,
    descripcion,
    precioCosto,
    precioVentaR,
    rucProvee,
    codBarra,
  } = req.body;
  db(
    `INSERT INTO [dbo].[producto] (idCategoria, nombreP, descripcion, precioCosto, precioVentaR, rucProvee, codBarra) VALUES (${idCategoria}, '${nombreP}', '${descripcion}', ${precioCosto}, ${precioVentaR}, '${rucProvee}', '${codBarra}')`,
    (record) => {
      res.send(record);
    }
  );
});

//DELETE según ID Producto
routes.delete("/:id", (req, res) => {
  let id = req.params.id;
  db(`DELETE FROM [dbo].[producto] WHERE idProducto = ${id}`, (record) => {
    res.send(record);
  });
});

//UPDATE según ID Producto (Se especifican las variables a editar)
routes.put("/:id", (req, res) => {
  let id = req.params.id;
  const {
    idCategoria,
    nombreP,
    descripcion,
    precioCosto,
    precioVentaR,
    rucProvee,
    codBarra,
  } = req.body;

  let str = "";

  if (idCategoria != null) str += ` idCategoria ='${idCategoria}' ,`;

  if (nombreP != null) str += ` nombreP ='${nombreP}' ,`;

  if (descripcion != null) str += ` descripcion ='${descripcion}' ,`;

  if (precioCosto != null) str += ` precioCosto ='${precioCosto}' ,`;

  if (precioVentaR != null) str += ` precioVentaR ='${precioVentaR}' ,`;

  if (rucProvee != null) str += ` rucProvee ='${rucProvee}' ,`;

  if (codBarra != null) str += ` codBarra ='${codBarra}' ,`;

  str = str.substring(0, str.length - 1);

  db(
    `UPDATE [dbo].[producto] SET ${str} WHERE idProducto = ${id}`,
    (record) => {
      res.send(record);
    }
  );
});

module.exports = routes;
