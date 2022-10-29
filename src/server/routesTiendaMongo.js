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
      idTienda: req.body.idTienda,
      idAdministrador: req.body.idAdministrador,
      nombreTienda: req.body.nombreTienda,
      telefono: req.body.telefono,
      ubicacion: req.body.ubicacion,
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
  const idTienda = req.params.id * 1.0;
  try {
    await client.connect();
    const result = await deletebyId(client, idTienda);
    res.send(result);
  } finally {
    await client.close();
  }
});

routes.put("/:id", async (req, res) => {
  let idTienda = req.params.id * 1.0;
  const usuario = {
    telefonoProvee: req.body.telefonoProvee,
    direccionProvee: req.body.direccionProvee,
  };

  try {
    await client.connect();
    const result = await updatebyId(client, idTienda, usuario);
    res.send(result);
  } finally {
    await client.close();
  }
});

async function createUser(client, newUser) {
  const result = await client
    .db("yarashop")
    .collection("tienda")
    .insertMany(newUser);
  return result;
}

async function findUserbyId(client, idTienda) {
  const result = await client
    .db("yarashop")
    .collection("tienda")
    .findOne({ idTienda: idTienda });

  return result;
}

async function findProducts(client) {
  const result = await client
    .db("yarashop")
    .collection("tienda")
    .find({})
    .toArray();
  if (result) {
    return result;
  } else {
    console.log(`No se encontró productos en yarashop`);
  }
}

async function deletebyId(client, idTienda) {
  const result = await client
    .db("yarashop")
    .collection("tienda")
    .deleteOne({ idTienda: idTienda });
  console.log(`${result.deletedCount} document(s) was/were deleted.`);
  return result;
}

async function updatebyId(client, idTienda, modifiedUser) {
  const result = await client
    .db("yarashop")
    .collection("tienda")
    .updateOne({ idTienda: idTienda }, { $set: modifiedUser });

  console.log(`${result.matchedCount} document(s) matched the query criteria.`);
  console.log(`${result.modifiedCount} document(s) was/were updated.`);
  return result;
}

module.exports = routes;
