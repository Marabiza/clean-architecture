import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import UpdateProductUseCase from "./update.product.usecase";
import Product from "../../../domain/product/entity/product";

describe("Test update product use case - integration", () => {
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

  it("should update a product", async () => {
    const productRepository = new ProductRepository();
    const usecase = new UpdateProductUseCase(productRepository);

    // Cria e persiste produto inicial
    const product = new Product("1", "John", 300);
    await productRepository.create(product);

    const input = {
      id: product.id,
      name: "John Updated",
      price: 350,
    };

    const output = {
      id: product.id,
      name: "John Updated",
      price: 350,
    };

    const result = await usecase.execute(input);
    expect(result).toEqual(output);

    // Verifica se o produto foi atualizado no banco
    const productDb = await ProductModel.findOne({ where: { id: input.id } });
    expect(productDb).not.toBeNull();
    expect(productDb!.id).toBe(input.id);
    expect(productDb!.name).toBe(input.name);
    expect(productDb!.price).toBe(input.price);
  });
}); 