
const { MongoClient } = require("mongodb");
const express = require("express");
const routes = express.Router();

routes.get("/:idTienda/:idUsuario/:idProducto/:cantidad/:pago", (req, res) => {
  const idTienda = req.params.idTienda * 1.0;
  const idUsuario = req.params.idUsuario * 1.0;
  var cantidad = req.params.cantidad * 1.0;
  const idProducto = req.params.idProducto * 1.0;
  const pago = req.params.pago * 1.0;

  async function transaccion() {
    const uri =
      "mongodb+srv://bratty289:YGTl63QI@pruebamongo.lnhsrdp.mongodb.net/test";
    const client = new MongoClient(uri);

    try {
      // Connect to the MongoDB cluster
      await client.connect();

      // El 'idUsuario' compra el 'idProducto' en 'cantidad' por el monto de 'pago'.
      await comprar(client, idTienda, idUsuario, idProducto, cantidad, pago);
      res.send("Execution Correct");
    } catch (e) {
      res.send("Unexpected Error: " + e);
    } finally {
      // Close the connection to the MongoDB cluster
      await client.close();
    }
  }

  transaccion().catch(console.error);
});

async function comprar(client, tiendaID, userId, productID, quantity, status) {
  const ordersCollection = client
    .db(`tienda-${tiendaID}`)
    .collection("reportes");

  const inventoryCollection = client
    .db(`tienda-${tiendaID}`)
    .collection("productos");

  const session = client.startSession();

  const transactionOptions = {
    readPreference: "primary",
    readConcern: { level: "local" },
    writeConcern: { w: "majority" },
  };

  try {
    const transactionResults = await session.withTransaction(async () => {
      const updateInventoryResults = await inventoryCollection.updateOne(
        { idProducto: productID },
        { $inc: { cantidad: quantity * -1 } }, //Actualizamos la cantidad
        { session }
      );
      console.log(
        `${updateInventoryResults.matchedCount} document(s) found in the inventory collection with _id ${productID}.`
      );
      console.log(
        `${updateInventoryResults.modifiedCount} document(s) was/were updated.`
      );
      if (updateInventoryResults.modifiedCount !== 1) {
        await session.abortTransaction();
        return;
      }

      // Ingreso Reporte de Venta
      const insertOrderResults = await ordersCollection.insertOne(
        {
          idUsuario: userId,
          idProducto: productID,
          cantidad: quantity,
          pago: status,
        },
        { session }
      );
      console.log(
        `New order recorded with the following id: ${insertOrderResults.insertedId}`
      );
    }, transactionOptions);

    if (transactionResults) {
      console.log(
        "The order was successfully processed. Database operations from the transaction are now visible outside the transaction."
      );
    } else {
      console.log(
        "The order was not successful. The transaction was intentionally aborted."
      );
    }
  } catch (e) {
    console.log(
      "The order was not successful. The transaction was aborted due to an unexpected error: " +
        e
    );
  } finally {
    await session.endSession();
  }
}

module.exports = routes;