---
title: CreateProductDto
language_tabs:
  - javascript: JavaScript,typescript
language_clients:
  - javascript: TypeScript
search: true
---

<h2 id="tocS_CreateProductDto">CreateProductDto</h2>

<!-- backwards compatibility -->
<a id="schemacreateproductdto"></a>
<a id="schema_CreateProductDto"></a>
<a id="tocScreateproductdto"></a>
<a id="tocscreateproductdto"></a>

```json
{
  "name": "New Balance 1906",
  "price": 1000,
  "categoryId": "17a54659-a06a-464f-a914-190cee7d4b1a",
  "discount": 25,
  "images": [
    []
  ]
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|name|string|true|none|Name of product ( from 2 to 50 symbols )|
|price|number|true|none|Price of product ( min 1 )|
|categoryId|string|true|none|Category id|
|discount|number|true|none|Discount of product ( from 0 to 100 )|
|images|[array]|true|none|Product images|

