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

  it("should accumulate two errors - empty name and negative price", () => {
    expect(() => {
      new Product("123", "", -1);
    }).toThrowError("product: Name is required,product: Price must be greater than zero");
  });

  it("should accumulate two errors - empty id and zero price", () => {
    expect(() => {
      new Product("", "Product Name", 0);
    }).toThrowError("product: Id is required,product: Price must be greater than zero");
  });

  it("should accumulate three errors - empty id, empty name and negative price", () => {
    try {
      new Product("", "", -1);
    } catch (error) {
      const notificationError = error as NotificationError;
      expect(notificationError).toBeInstanceOf(NotificationError);
      expect(notificationError.errors).toEqual([
        { context: "product", message: "Id is required" },
        { context: "product", message: "Name is required" },
        { context: "product", message: "Price must be greater than zero" },
      ]);
      expect(notificationError.message).toBe("product: Id is required,product: Name is required,product: Price must be greater than zero");
    }
  });

  it("should throw error when price is zero", () => {
    expect(() => {
      new Product("123", "Product Name", 0);
    }).toThrowError("product: Price must be greater than zero");
  });

  it("should throw error when changing name to empty", () => {
    const product = new Product("123", "Product 1", 100);
    expect(() => {
      product.changeName("");
    }).toThrowError("product: Name is required");
  });

  it("should throw error when changing price to negative value", () => {
    const product = new Product("123", "Product 1", 100);
    expect(() => {
      product.changePrice(-1);
    }).toThrowError("product: Price must be greater than zero");
  });

  it("should throw error when changing price to zero", () => {
    const product = new Product("123", "Product 1", 100);
    expect(() => {
      product.changePrice(0);
    }).toThrowError("product: Price must be greater than zero");
  });

  it("should create product successfully with valid data", () => {
    const product = new Product("123", "Product 1", 100);
    expect(product.id).toBe("123");
    expect(product.name).toBe("Product 1");
    expect(product.price).toBe(100);
  });

  it("should validate successfully with valid data", () => {
    const product = new Product("123", "Product 1", 100);
    expect(() => product.validate()).not.toThrow();
    expect(product.notification.hasErrors()).toBe(false);
  });
});
