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
  "uuid": "string",
  "name": "string",
  "price": "string",
  "discount": "string",
  "images": [
    {
      "uuid": "string"
    }
  ],
  "category": {
    "uuid": "string",
    "name": "string"
  }
}
```

### Properties

| Name     | Type                                                          | Required | Restrictions | Description                                                  |
| -------- | ------------------------------------------------------------- | -------- | ------------ | ------------------------------------------------------------ |
| uuid     | string                                                        | true     | none         | Product id                                                   |
| name     | string                                                        | true     | none         | Product name                                                 |
| price    | string                                                        | true     | none         | Product price                                                |
| discount | string                                                        | true     | none         | Product discount                                             |
| images   | [ProductImageEntity](../models/ProductImageEntity.md)         | true     | none         | Product images ( /files/products/:id for get product image ) |
| category | [ProductCategoryDetails](../models/ProductCategoryDetails.md) | true     | none         | Product category                                             |
