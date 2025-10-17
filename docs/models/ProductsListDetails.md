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
      "uuid": "17a54659-a06a-464f-a914-190cee7d4b1a",
      "name": "Nike",
      "price": 250,
      "discount": 15,
      "images": [
        {
          "uuid": "string"
        }
      ],
      "category": {
        "uuid": "17a54659-a06a-464f-a914-190cee7d4b1a",
        "name": "Shoes"
      }
    }
  ],
  "pagintaion": {
    "total": 240,
    "page": 1,
    "limit": 10,
    "totalPage": 24,
    "isLastPage": false
  }
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|data|[ProductDetails](../models/ProductDetails.md)|true|none|Product list|
|pagintaion|[PaginationDetails](../models/PaginationDetails.md)|true|none|Paggination info|

