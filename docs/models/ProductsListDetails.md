---
title: ProductsListDetails
language_tabs:
  - javascript: JavaScript,typescript
language_clients:
  - javascript: TypeScript
search: true
---

<h2 id="tocS_ProductsListDetails">ProductsListDetails</h2>

<!-- backwards compatibility -->

<a id="schemaproductslistdetails"></a>
<a id="schema_ProductsListDetails"></a>
<a id="tocSproductslistdetails"></a>
<a id="tocsproductslistdetails"></a>

```json
{
  "data": [
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
        "name": "string",
        "hasChildren": true,
        "hasProduct": true
      }
    }
  ],
  "pagintaion": {
    "total": 0,
    "page": 0,
    "limit": 0,
    "totalPage": 0,
    "isLastPage": true
  }
}
```

### Properties

| Name       | Type                                                | Required | Restrictions | Description      |
| ---------- | --------------------------------------------------- | -------- | ------------ | ---------------- |
| data       | [[ProductDetails](../models/[ProductDetails.md)]    | true     | none         | Product list     |
| pagintaion | [PaginationDetails](../models/PaginationDetails.md) | true     | none         | Paggination info |
