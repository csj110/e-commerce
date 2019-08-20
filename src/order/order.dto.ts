interface OrderProduct {
  product: string;
  quantity: number;
}
export interface OrderDTO {
  products: OrderProduct[];
}
