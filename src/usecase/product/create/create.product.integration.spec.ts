import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import CreateProductUseCase from "./create.product.usecase";

describe("Test create product use case - integration", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });
    await sequelize.addModels([ProductModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should create a product", async () => {
    const productRepository = new ProductRepository();
    const usecase = new CreateProductUseCase(productRepository);

    const input = {
      id: "1",
      name: "John",
      price: 100,
    };

    const output = {
      id: "1",
      name: "John",
      price: 100,
    };

    const result = await usecase.execute(input);
    expect(result).toEqual(output);

    // Verifica se o produto foi persistido no banco
    const productDb = await ProductModel.findOne({ where: { id: input.id } });
    expect(productDb).not.toBeNull();
    expect(productDb!.id).toBe(input.id);
    expect(productDb!.name).toBe(input.name);
    expect(productDb!.price).toBe(input.price);
  });
}); 