import { Productstore, All, FindFirst } from "../store.js"
import { ProductData } from "../types.js"
import { v4 as uuidv4 } from "uuid";

export class ProductsController {
  static async index(req, res) {

    const models = await All('products');

    return res.json(models);
  }

  static async show(req, res) {
    const id = req.params.id;

    try {
      const { props: model } = await Productstore.get(id);
      res.send(model);
    } catch (e) {
      console.log(`GET /${id}`, e.message);
      res.sendStatus(404);
    }
  }

  static async create(req, res) {
    const modelData = req.body;

    try {
      // Make sure sale data exists
      if (!req.body) {
        throw new Error();
      }

      // Make sure product data contains all required fields
      const modelObject = ProductData.check(modelData);

      // Generate ID and Handle for model
      const modelId = uuidv4();

      // Create full model object
      const model = {
        ...modelObject,
        id: modelId,
      };

      // Save model object
      await Productstore.set(modelId, model);

      res.send(model);
    } catch (e) {
      console.log(e.message);
      res.sendStatus(400);
    }
  }

  static async update(req, res) {
    const modelId = req.params.id;
    const newData = req.body || {};

    try {
      const { props: oldModel } = await Productstore.get(modelId);
      const model = {
        ...oldModel,
        ...newData,
      };

      // Save new model object
      await Productstore.set(modelId, newData);

      res.send(model);
    } catch (e) {
      console.log(e.message);
      res.sendStatus(404);
    }
  }

  static async delete(req, res) {
    const modelId = req.params.id

    try {
      await Productstore.delete(modelId)

      res.send({
        id: modelId
      });
    } catch (e) {
      console.log(e.message);
      res.sendStatus(404);
    }
  }
}
