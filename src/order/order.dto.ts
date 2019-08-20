interface OrderProductDTO {
  product: string;
  quantity: number;
}

export interface OrderDTO {
  products: OrderProductDTO[];
}
