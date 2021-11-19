export class OrderItem {
    id: number;
    product_title: string;
    price: number;
    quantity: number;
    influencer_revenue: number;
    admin_revenue: number;

    constructor(id = 0, product_title = '', price = 0, quantity = 0) {
        this.id = id;
        this.product_title = product_title;
        this.price = price;
        this.quantity = quantity;
        this.influencer_revenue = 0;
        this.admin_revenue = 0;
    }
}