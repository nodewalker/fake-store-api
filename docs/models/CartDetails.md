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
  "uuid": "string",
  "products": [
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
  ]
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|uuid|string|true|none|Cart id|
|products|[[ProductDetails](../models/[ProductDetails.md)]|true|none|Products from cart|

