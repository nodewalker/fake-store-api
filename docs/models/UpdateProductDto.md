---
title: UpdateProductDto
language_tabs:
  - javascript: JavaScript,typescript
language_clients:
  - javascript: TypeScript
search: true
---

<h2 id="tocS_UpdateProductDto">UpdateProductDto</h2>

<!-- backwards compatibility -->

<a id="schemaupdateproductdto"></a>
<a id="schema_UpdateProductDto"></a>
<a id="tocSupdateproductdto"></a>
<a id="tocsupdateproductdto"></a>

```json
{
  "name": "New Balance 1906",
  "price": 1000,
  "discount": 25,
  "removeImages": [
    "17a54659-a06a-464f-a914-190cee7d4b1a",
    "17a54659-a06a-464f-a914-190cee7d4b1a"
  ],
  "images": [[]]
}
```

### Properties

| Name         | Type     | Required | Restrictions | Description                              |
| ------------ | -------- | -------- | ------------ | ---------------------------------------- |
| name         | string   | false    | none         | Name of product ( from 2 to 50 symbols ) |
| price        | number   | false    | none         | Price of product ( min 1 )               |
| discount     | number   | false    | none         | Discount of product ( from 0 to 100 )    |
| removeImages | [string] | false    | none         | Images to remove                         |
| images       | [array]  | true     | none         | Product images                           |
