import { app, sequelize } from "../express";
import request from "supertest";

describe("E2E test for product", () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it("should create a product", async () => {
    const response = await request(app)
      .post("/product")
      .send({
        id: "1",
        name: "Product 1",
        price: 100,
      });

    expect(response.status).toBe(200);
    expect(response.body.id).toBe("1");
    expect(response.body.name).toBe("Product 1");
    expect(response.body.price).toBe(100);
  });

  it("should list all products", async () => {
    await request(app)
      .post("/product")
      .send({ id: "1", name: "Product 1", price: 100 });
    await request(app)
      .post("/product")
      .send({ id: "2", name: "Product 2", price: 200 });

    const listResponse = await request(app).get("/product").send();
    expect(listResponse.status).toBe(200);
    expect(listResponse.body.products.length).toBe(2);
    const product1 = listResponse.body.products.find((p: any) => p.id === "1");
    const product2 = listResponse.body.products.find((p: any) => p.id === "2");
    expect(product1.name).toBe("Product 1");
    expect(product1.price).toBe(100);
    expect(product2.name).toBe("Product 2");
    expect(product2.price).toBe(200);

    const listResponseXML = await request(app)
      .get("/product")
      .set("Accept", "application/xml")
      .send();
    expect(listResponseXML.status).toBe(200);
    expect(listResponseXML.text).toContain(`<?xml version=\"1.0\" encoding=\"UTF-8\"?>`);
    expect(listResponseXML.text).toContain(`<products>`);
    expect(listResponseXML.text).toContain(`<product>`);
    expect(listResponseXML.text).toContain(`<name>Product 1</name>`);
    expect(listResponseXML.text).toContain(`<name>Product 2</name>`);
    expect(listResponseXML.text).toContain(`<price>100</price>`);
    expect(listResponseXML.text).toContain(`<price>200</price>`);
    expect(listResponseXML.text).toContain(`</products>`);
  });
}); 