import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import ListProductUseCase from "./list.product.usecase";
import Product from "../../../domain/product/entity/product";

describe("Test list product use case - integration", () => {
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

  it("should list all products", async () => {
    const productRepository = new ProductRepository();
    const usecase = new ListProductUseCase(productRepository);

    // Cria e persiste produtos
    const product1 = new Product("1", "John Doe", 250);
    const product2 = new Product("2", "Jane Doe", 280);
    await productRepository.create(product1);
    await productRepository.create(product2);

    const result = await usecase.execute({});

    expect(result.products.length).toBe(2);
    expect(result.products).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ id: "1", name: "John Doe", price: 250 }),
        expect.objectContaining({ id: "2", name: "Jane Doe", price: 280 }),
      ])
    );
  });
}); 