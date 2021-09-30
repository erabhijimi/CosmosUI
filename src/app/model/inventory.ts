import { Product } from "./Product";

export class Inventory {
    public productId: number;
    public product:Product;
    public quantityOfProduct: number;
    public bestBeforeDays: string;
    public comments: string;
    public mfgDate:Date;
    public purchaseDate:Date;
    constructor() {}
}