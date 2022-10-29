const express = require("express");
const { MongoClient } = require("mongodb");
const routes = express.Router();

const uri =
  "mongodb+srv://bratty289:YGTl63QI@pruebamongo.lnhsrdp.mongodb.net/test";
const client = new MongoClient(uri);

routes.get("/:id", async (req, res) => {
  const id = req.params.id * 1.0;
  try {
    await client.connect();
    const resultado = await findUserbyId(client, id);
    res.send(resultado);
  } finally {
    await client.close();
  }
});

routes.get("/", async (req, res) => {
  try {
    await client.connect();
    const resultado = await findProducts(client);
    res.send(resultado);
  } finally {
    await client.close();
  }
});

routes.post("/", async (req, res) => {
  const usuario = [
    {
      idProducto: req.body.idProducto,
      idCategoria: req.body.idCategoria,
      nombreP: req.body.nombreP,
      descripcion: req.body.descripcion,
      precioCosto: req.body.precioCosto,
      precioVentaR: req.body.precioVenta,
      rucProvee: req.body.rucProvee,
      codBarra: req.body.codBarra,
    },
  ];
  try {
    await client.connect();
    const result = await createUser(client, usuario);
    res.send(result);
  } finally {
    await client.close();
  }
});

routes.delete("/:id", async (req, res) => {
  const idProducto = req.params.id * 1.0;
  try {
    await client.connect();
    const result = await deletebyId(client, idProducto);
    res.send(result);
  } finally {
    await client.close();
  }
});

routes.put("/:id", async (req, res) => {
  let idProducto = req.params.id * 1.0;
  const usuario = {
    precioCosto: req.body.precioCosto,
    precioVentaR: req.body.precioVentaR,
  };

  try {
    await client.connect();
    const result = await updatebyId(client, idProducto, usuario);
    res.send(result);
  } finally {
    await client.close();
  }
});

async function createUser(client, newUser) {
  const result = await client
    .db("yarashop")
    .collection("producto")
    .insertMany(newUser);
  return result;
}

async function findUserbyId(client, idProducto) {
  const result = await client
    .db("yarashop")
    .collection("producto")
    .findOne({ idProducto: idProducto });

  return result;
}

async function findProducts(client) {
  const result = await client
    .db("yarashop")
    .collection("producto")
    .find({})
    .toArray();
  if (result) {
    return result;
  } else {
    console.log(`No se encontró productos en yarashop`);
  }
}

async function deletebyId(client, idProducto) {
  const result = await client
    .db("yarashop")
    .collection("producto")
    .deleteOne({ idProducto: idProducto });
  console.log(`${result.deletedCount} document(s) was/were deleted.`);
  return result;
}

async function updatebyId(client, idProducto, modifiedUser) {
  const result = await client
    .db("yarashop")
    .collection("categoria")
    .updateOne({ idProducto: idProducto }, { $set: modifiedUser });

  console.log(`${result.matchedCount} document(s) matched the query criteria.`);
  console.log(`${result.modifiedCount} document(s) was/were updated.`);
  return result;
}

module.exports = routes;
