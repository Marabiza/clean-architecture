import CreateProductUseCase from "./create.product.usecase";
const input = {
  id: "1",
  name: "John",
  price: 100
};

const MockRepository = () => {
  return {
    find: jest.fn(),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  };
};

describe("Unit test create product use case", () => {
  it("should create a product", async () => {
    const productRepository = MockRepository();
    const productCreateUseCase = new CreateProductUseCase(productRepository);

    const output = await productCreateUseCase.execute(input);

    expect(output).toEqual({
      id: expect.any(String),
      name: input.name,
      price: input.price

    });
  });

  it("should thrown an error when name is missing", async () => {
    const productRepository = MockRepository();
    const productCreateUseCase = new CreateProductUseCase(productRepository);

    input.name = "";

    await expect(productCreateUseCase.execute(input)).rejects.toThrow(
      "Name is required"
    );
  });

it("should throw an error when price is missing", async () => {
  const productRepository = MockRepository();
  const productCreateUseCase = new CreateProductUseCase(productRepository);

  input.price = null;

  await expect(productCreateUseCase.execute(input)).rejects.toThrow(
    "Price is required"
  );
  });
});
