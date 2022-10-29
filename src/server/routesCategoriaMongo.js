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
      idCategoria: req.body.idCategoria,
      nombreCat: req.body.nombreCat,
      descripcion: req.body.descripcion,
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
  const idCategoria = req.params.id * 1.0;
  try {
    await client.connect();
    const result = await deletebyId(client, idCategoria);
    res.send(result);
  } finally {
    await client.close();
  }
});

routes.put("/:id", async (req, res) => {
  let idCategoria = req.params.id * 1.0;
  const usuario = {
    nombreCat: req.body.nombreCat,
    descripcion: req.body.descripcion,
  };

  try {
    await client.connect();
    const result = await updatebyId(client, idCategoria, usuario);
    res.send(result);
  } finally {
    await client.close();
  }
});

async function createUser(client, newUser) {
  const result = await client
    .db("yarashop")
    .collection("categoria")
    .insertMany(newUser);
  return result;
}

async function findUserbyId(client, idCategoria) {
  const result = await client
    .db("yarashop")
    .collection("categoria")
    .findOne({ idCategoria: idCategoria });

  return result;
}

async function findProducts(client) {
  const result = await client
    .db("yarashop")
    .collection("categoria")
    .find({})
    .toArray();
  if (result) {
    return result;
  } else {
    console.log(`No se encontró productos en yarashop`);
  }
}

async function deletebyId(client, idCategoria) {
  const result = await client
    .db("yarashop")
    .collection("categoria")
    .deleteOne({ idCategoria: idCategoria });
  console.log(`${result.deletedCount} document(s) was/were deleted.`);
  return result;
}

async function updatebyId(client, idCategoria, modifiedUser) {
  const result = await client
    .db("yarashop")
    .collection("categoria")
    .updateOne({ idCategoria: idCategoria }, { $set: modifiedUser });

  console.log(`${result.matchedCount} document(s) matched the query criteria.`);
  console.log(`${result.modifiedCount} document(s) was/were updated.`);
  return result;
}

module.exports = routes;
