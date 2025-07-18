import Product from "./product";
import NotificationError from "../../@shared/notification/notification.error";

describe("Product unit tests", () => {
  it("should throw error when id is empty", () => {
    expect(() => {
      const product = new Product("", "Product 1", 100);
    }).toThrowError("product: Id is required");
  });

  it("should throw error when name is empty", () => {
    expect(() => {
      const product = new Product("123", "", 100);
    }).toThrowError("product: Name is required");
  });

  it("should throw error when price is less than zero", () => {
    expect(() => {
      const product = new Product("123", "Name", -1);
    }).toThrowError("product: Price must be greater than zero");
  });

  it("should change name", () => {
    const product = new Product("123", "Product 1", 100);
    product.changeName("Product 2");
    expect(product.name).toBe("Product 2");
  });

  it("should change price", () => {
    const product = new Product("123", "Product 1", 100);
    product.changePrice(150);
    expect(product.price).toBe(150);
  });

  it("should accumulate two errors at the same time", () => {
    try {
      new Product("", "", 100);
    } catch (error) {
      const notificationError = error as NotificationError;
      expect(notificationError).toBeInstanceOf(NotificationError);
      expect(notificationError.errors).toEqual([
        { context: "product", message: "Id is required" },
        { context: "product", message: "Name is required" },
      ]);
      expect(notificationError.message).toBe("product: Id is required,product: Name is required");
    }
  });
});
