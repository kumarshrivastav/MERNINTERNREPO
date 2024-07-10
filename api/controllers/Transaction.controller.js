import productModel from "../models/ProductModel.js";
import ErrorHandler from "../services/error.handler.js";
import pkg from "lodash";
const { uniq, sortBy } = pkg;
class TransactionController {
  async getProducts(req, res, next) {
    const { month } = req.query;
    try {
      const page = month > -1 ? 1 : parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const skip = (page - 1) * limit;
      const searchQuery = {
        ...(req.query.searchTerm && {
          $or: [
            { title: { $regex: req.query.searchTerm, $options: "i" } },
            { description: { $regex: req.query.searchTerm, $options: "i" } },
            {
              price:
                !isNaN(req.query.searchTerm) && Number(req.query.searchTerm),
            },
            { category: { $regex: req.query.searchTerm, $options: "i" } },
          ],
        }),
        ...(req.query.month > -1 &&
          req.query.month && { monthOfSale: req.query.month }),
      };
      var products = await productModel
        .find(searchQuery)
        .skip(skip)
        .limit(limit)
        .sort({ id: 1 });
      const count = await productModel.countDocuments(searchQuery);
      const monthSpecificData = await productModel.find({
        ...(req.query.month > -1 &&
          req.query.month && { monthOfSale: req.query.month }),
      });
      let totalSale = 0;
      let totalSoldItem = 0;
      let totalNotSoldItem = 0;
      monthSpecificData.forEach((product) => {
        totalSale += product.price;
        if (product.sold) {
          totalSoldItem += 1;
        } else {
          totalNotSoldItem += 1;
        }
      });
      const categoryResult = sortBy(
        uniq(monthSpecificData.map((product) => product.category))
      );
      const categories = categoryResult.map((category) => ({
        category,
        count: 0,
      }));
      monthSpecificData.forEach((product) => {
        const categoryItem = categories.find(
          (item) => item.category === product.category
        );
        if (categoryItem) {
          categoryItem.count += 1;
        }
      });
      const priceRanges = [
        { min: 0, max: 100 },
        { min: 101, max: 200 },
        { min: 201, max: 300 },
        { min: 301, max: 400 },
        { min: 401, max: 500 },
        { min: 501, max: 600 },
        { min: 601, max: 700 },
        { min: 701, max: 800 },
        { min: 801, max: 900 },
        { min: 901, max: Infinity },
      ];
      const result = priceRanges.map((range) => {
        return {
          range: `${range.min}-${range.max === Infinity ? "above" : range.max}`,
          count: 0,
        };
      });
      monthSpecificData.forEach((product) => {
        const range = priceRanges.find(
          (r) => product.price >= r.min && product.price <= r.max
        );
        if (range) {
          const index = priceRanges.indexOf(range);
          result[index].count++;
        }
      });
      return res.status(200).send({
        products,
        totalPages: Math.ceil(count / limit),
        currentPage: page,
        totalSoldItem,
        totalSale,
        totalNotSoldItem,
        dataOfBarChart: result,
        categoriesFreq: categories,
      });
    } catch (error) {
      next(error);
    }
  }
  async addProduct(req, res, next) {
    const products = req.body;
    try {
      products.forEach(async (product) => {
        let eachProduct = await productModel.findOne({ id: product.id });
        if (eachProduct) {
          next(
            ErrorHandler(401, `Product with Id ${product.id} already present`)
          );
        }
        eachProduct = new productModel(product);
        eachProduct.monthOfSale = new Date(product.dateOfSale).getMonth();
        await eachProduct.save();
      });
      return res.status(201).send("Products added successfully");
    } catch (error) {
      next(error);
    }
  }
}

export default new TransactionController();
