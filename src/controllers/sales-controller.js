import { SalesStore } from "../store.js"
import { SaleData } from "../types.js"
import { v4 as uuidv4 } from "uuid";

export class SalesController {
  static async index(req, res) {
    const { results: salesMetadata } = await SalesStore.list();

    const sales = await Promise.all(
      salesMetadata.map(async ({ key }) => (await SalesStore.get(key)).props)
    );

    return res.json(sales);
  }

  static async show(req, res) {
    const id = req.params.id;

    try {
      const { props: sale } = await SalesStore.get(id);
      res.send(sale);
    } catch (e) {
      console.log(`GET /${id}`, e.message);
      res.sendStatus(404);
    }
  }

  static async create(req, res) {
    const saleData = req.body;

    try {
      // Make sure sale data exists
      if (!req.body) {
        throw new Error();
      }

      // Make sure sale data contains all required fields
      const saleObject = SaleData.check(saleData);

      // Generate ID and Handle for sale
      const saleId = uuidv4();

      // Create full sale object
      const sale = {
        ...saleObject,
        id: saleId,
      };

      // Save sale object
      await SalesStore.set(saleId, sale);

      res.send(sale);
    } catch (e) {
      console.log(e.message);
      res.sendStatus(400);
    }
  }

  static async update(req, res) {
    const saleId = req.params.id;
    const newData = req.body || {};

    try {
      const { props: oldsale } = await SalesStore.get(saleId);
      const sale = {
        ...oldsale,
        ...newData,
      };

      // Save new sale object
      await SalesStore.set(saleId, newData);

      res.send(sale);
    } catch (e) {
      console.log(e.message);
      res.sendStatus(404);
    }
  }

  static async delete(req, res) {
    const saleId = req.params.id;

    try {
      await SalesStore.delete(saleId);

      res.send({
        id: saleId,
      });
    } catch (e) {
      console.log(e.message);
      res.sendStatus(404);
    }
  }
}
