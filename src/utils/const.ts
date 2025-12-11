export enum Services {
  user = 'USER_PROVIDER',
  auth = 'AUTH_PROVIDER',
  product = 'PRODUCT_PROVIDER',
  category = 'CATEGORY_PROVIDER',
  cart = 'CART_PROVIDER',
  review = 'REVIEW_PROVIDER',
  order = 'ORDER_PROVIDER',
}

export enum Controllers {
  auth = 'auth',
  user = 'user',
  product = 'product',
  category = 'category',
  cart = 'user/cart',
  order = 'user/order',
}

export enum OrderBy {
  PRICE = 'price',
  DISCOUNT = 'discount',
  NAME = 'name',
}

export enum SortType {
  ASC = 'ASC',
  DESC = 'DESC',
}

export enum OrderStatus {
  WAITING_FOR_PAYMENT = 'wating_for_payment',
  COMPLETE = 'complete',
  IN_PROGRESS = 'in_progress',
}
