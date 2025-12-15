---
title: CartDetails
language_tabs:
  - javascript: JavaScript,typescript
language_clients:
  - javascript: TypeScript
search: true
---

<h2 id="tocS_CartDetails">CartDetails</h2>

<!-- backwards compatibility -->

<a id="schemacartdetails"></a>
<a id="schema_CartDetails"></a>
<a id="tocScartdetails"></a>
<a id="tocscartdetails"></a>

```json
{
  "_uuid": "17a54659-a06a-464f-a914-190cee7d4b1a",
  "products": [
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
      },
      "unit_count": 0
    }
  ]
}
```

### Properties

| Name     | Type                                              | Required | Restrictions | Description        |
| -------- | ------------------------------------------------- | -------- | ------------ | ------------------ |
| \_uuid   | string                                            | true     | none         | Cart id            |
| products | [CartItemsDetails](../models/CartItemsDetails.md) | true     | none         | Products from cart |
