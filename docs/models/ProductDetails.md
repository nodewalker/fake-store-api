---
title: ProductDetails
language_tabs:
  - javascript: JavaScript,typescript
language_clients:
  - javascript: TypeScript
search: true
---

<h2 id="tocS_ProductDetails">ProductDetails</h2>

<!-- backwards compatibility -->

<a id="schemaproductdetails"></a>
<a id="schema_ProductDetails"></a>
<a id="tocSproductdetails"></a>
<a id="tocsproductdetails"></a>

```json
{
  "uuid": "17a54659-a06a-464f-a914-190cee7d4b1a",
  "name": "Nike",
  "price": 250,
  "discount": 15,
  "images": [
    {
      "_uuid": "string"
    }
  ],
  "rating": 0,
  "review_count": 0,
  "category": {
    "_uuid": "17a54659-a06a-464f-a914-190cee7d4b1a",
    "name": "Shoes"
  }
}
```

### Properties

| Name         | Type                                                          | Required | Restrictions | Description                                                  |
| ------------ | ------------------------------------------------------------- | -------- | ------------ | ------------------------------------------------------------ |
| uuid         | string                                                        | true     | none         | Product id                                                   |
| name         | string                                                        | true     | none         | Product name                                                 |
| price        | string                                                        | true     | none         | Product price                                                |
| discount     | string                                                        | true     | none         | Product discount                                             |
| images       | [ProductImageEntity](../models/ProductImageEntity.md)         | true     | none         | Product images ( /files/products/:id for get product image ) |
| rating       | number                                                        | true     | none         | Product rating                                               |
| review_count | number                                                        | true     | none         | Product review count                                         |
| category     | [ProductCategoryDetails](../models/ProductCategoryDetails.md) | true     | none         | Product category                                             |
