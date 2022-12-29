import { Salestore, Paymentstore } from "../store.js"
import { SaleData } from "../types.js"
import { v4 as uuidv4 } from "uuid";

export class SalesController {
  static async index(req, res) {
    const { results: salesMetadata } = await Salestore.list();

    const sales = await Promise.all(
      salesMetadata.map(async ({ key }) => (await Salestore.get(key)).props)
    );

    return res.json(sales);
  }

  static async show(req, res) {
    const id = req.params.id;

    try {
      const { props: sale } = await Salestore.get(id);
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

      const { date, customerId, itens, priceTotal, discounts, payments } = saleObject

      // Create full sale object
      const sale = {
        date,
        customerId,
        itens,
        priceTotal,
        discounts,
        id: saleId,
      };

      // Save sale object
      await Salestore.set(saleId, sale);

      // Save payments
      payments.forEach(async ({ date, price }) => {
        const paymentId = uuidv4();
        const newData = { paymentId, date, price, handle: saleId }

        await Paymentstore.set(paymentId, newData);
      });

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
      const { props: oldsale } = await Salestore.get(saleId);
      const sale = {
        ...oldsale,
        ...newData,
      };

      // Save new sale object
      await Salestore.set(saleId, newData);

      res.send(sale);
    } catch (e) {
      console.log(e.message);
      res.sendStatus(404);
    }
  }

  static async delete(req, res) {
    const saleId = req.params.id

    try {
      await Salestore.delete(saleId)

      const payments = await Paymentstore.filter({ handle: saleId })
      .map(({ props }) => (props))

      const paymentIds = payments.map(async ({ id }) => {
        await Paymentstore.delete(id)
        return id
      });

      res.send({
        id: saleId,
        paymentIds
      });
    } catch (e) {
      console.log(e.message);
      res.sendStatus(404);
    }
  }
}
