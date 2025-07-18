import ProductRepositoryInterface from "../../../domain/product/repository/product-repository.interface";
import {
  InputCreateProductDto,
  OutputCreateProductDto,
} from "./create.product.dto";
import { v4 as uuid } from "uuid";
import ProductFactory from "../../../domain/product/factory/product.factory";

export default class CreateProductUseCase {
  private productRepository: ProductRepositoryInterface;

  constructor(productRepository: ProductRepositoryInterface) {
    this.productRepository = productRepository;
  }

  async execute(
    input: InputCreateProductDto
  ): Promise<OutputCreateProductDto> {
    const product = ProductFactory.create(
      input.id,
      input.name,
      input.price
  );

    return {
      id: product.id,
      name: product.name,
      price: product.price
      };
  }
}
