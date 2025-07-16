import ProductInterface from "./product.interface";
import Notification from "../../@shared/notification/notification";
import NotificationError from "../../@shared/notification/notification.error";

export default class Product implements ProductInterface {
  private _id: string;
  private _name: string;
  private _price: number;
  public notification: Notification;

  constructor(id: string, name: string, price: number) {
    this.notification = new Notification();
    this._id = id;
    this._name = name;
    this._price = price;
    this.validate();
    if (this.notification.hasErrors()) {
      throw new NotificationError(this.notification.getErrors());
    }
  }

  get id(): string {
    return this._id;
  }
  
  get name(): string {
    return this._name;
  }

  get price(): number {
    return this._price;
  }

  changeName(name: string): void {
    this._name = name;
    this.validate();
    if (this.notification.hasErrors()) {
      throw new NotificationError(this.notification.getErrors());
    }
  }

  changePrice(price: number): void {
    this._price = price;
    this.validate();
    if (this.notification.hasErrors()) {
      throw new NotificationError(this.notification.getErrors());
    }
  }

  validate(): boolean {
    this.notification = new Notification();
    if (this._id.length === 0) {
      this.notification.addError({
        context: "product",
        message: "Id is required",
      });
    }
    if (this._name.length === 0) {
      this.notification.addError({
        context: "product",
        message: "Name is required",
      });
    }
    if (this._price < 0) {
      this.notification.addError({
        context: "product",
        message: "Price must be greater than zero",
      });
    }
    return !this.notification.hasErrors();
  }
}
