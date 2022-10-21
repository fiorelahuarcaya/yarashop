const express = require("express");
const { db } = require("./db.js");
const routes = express.Router();

routes.get("/", (req, res) => {
  db("SELECT * FROM [dbo].[proveedor];", (record) => {
    const r = record.recordsets;
    res.send(r);
  });
});

//SELECT según ID
routes.get("/:id", (req, res) => {
  let id = req.params.id;
  db(`SELECT * FROM [dbo].[proveedor] WHERE rucProvee = '${id}';`, (record) => {
    const r = record.recordsets;
    res.send(r);
  });
});

routes.post("/", (req, res) => {
  //INSERT INTO categoria (idCategoria, nombreCat, descripcion) VALUES
  //(9, 'Tubérculos', 'papas, camotes'),
  // "idCategoria":9,"nombreCat":"Tubérculos","descripcion":"papas, camotes"
  const {
    rucProvee,
    RazonSocial,
    telefonoProvee,
    direccionProvee,
    paginaProvee,
  } = req.body;
  db(
    `INSERT INTO [dbo].[proveedor] (rucProvee, RazonSocial, telefonoProvee, direccionProvee, paginaProvee) VALUES ('${rucProvee}', '${RazonSocial}', '${telefonoProvee}', '${direccionProvee}', '${paginaProvee}')`,
    (record) => {
      res.send(record);
    }
  );
});

routes.delete("/:id", (req, res) => {
  let id = req.params.id;
  db(`DELETE FROM [dbo].[proveedor] WHERE rucProvee = '${id}'`, (record) => {
    res.send(record);
  });
});

routes.put("/:id", (req, res) => {
  let id = req.params.id;
  const {
    rucProvee,
    RazonSocial,
    telefonoProvee,
    direccionProvee,
    paginaProvee,
  } = req.body;

  let str = "";

  if (rucProvee != null) str += ` rucProvee ='${rucProvee}' ,`;

  if (RazonSocial != null) str += ` RazonSocial ='${RazonSocial}' ,`;

  if (telefonoProvee != null) str += ` telefonoProvee ='${telefonoProvee}' ,`;

  if (direccionProvee != null)
    str += ` direccionProvee ='${direccionProvee}' ,`;

  if (paginaProvee != null) str += ` paginaProvee ='${paginaProvee}' ,`;

  str = str.substring(0, str.length - 1);

  db(
    `UPDATE [dbo].[proveedor] SET ${str} WHERE rucProvee = '${id}'`,
    (record) => {
      res.send(record);
    }
  );
});

module.exports = routes;
