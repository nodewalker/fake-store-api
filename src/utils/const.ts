export enum Services {
  user = 'USER_PROVIDER',
  auth = 'AUTH_PROVIDER',
  product = 'PRODUCT_PROVIDER',
  category = 'CATEGORY_PROVIDER',
  cart = 'CART_PROVIDER',
}

export enum Controllers {
  auth = 'auth',
  user = 'user',
  product = 'product',
  category = 'category',
  cart = `${Controllers.user}/cart`,
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
