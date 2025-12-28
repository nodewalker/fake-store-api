---
title: CategoryDetails
language_tabs:
  - javascript: JavaScript,typescript
language_clients:
  - javascript: TypeScript
search: true
---

<h2 id="tocS_CategoryDetails">CategoryDetails</h2>

<!-- backwards compatibility -->

<a id="schemacategorydetails"></a>
<a id="schema_CategoryDetails"></a>
<a id="tocScategorydetails"></a>
<a id="tocscategorydetails"></a>

```json
{
  "_uuid": "17a54659-a06a-464f-a914-190cee7d4b1a",
  "name": "Shoes",
  "Childrens": [
    {
      "_uuid": "17a54659-a06a-464f-a914-190cee7d4b1a",
      "name": "Shoes",
      "Childrens": [],
      "hasChildren": true,
      "hasProduct": false
    }
  ],
  "hasChildren": true,
  "hasProduct": false
}
```

### Properties

| Name        | Type                                            | Required | Restrictions | Description                                   |
| ----------- | ----------------------------------------------- | -------- | ------------ | --------------------------------------------- |
| \_uuid      | string                                          | true     | none         | Category id                                   |
| name        | string                                          | true     | none         | Category name                                 |
| Childrens   | [CategoryDetails](../models/CategoryDetails.md) | false    | none         | Field for retrieve subcategories at all level |
| hasChildren | boolean                                         | false    | none         | Is category has children                      |
| hasProduct  | boolean                                         | false    | none         | Is category has product                       |
