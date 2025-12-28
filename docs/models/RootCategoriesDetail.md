---
title: RootCategoriesDetail
language_tabs:
  - javascript: JavaScript,typescript
language_clients:
  - javascript: TypeScript
search: true
---

<h2 id="tocS_RootCategoriesDetail">RootCategoriesDetail</h2>

<!-- backwards compatibility -->

<a id="schemarootcategoriesdetail"></a>
<a id="schema_RootCategoriesDetail"></a>
<a id="tocSrootcategoriesdetail"></a>
<a id="tocsrootcategoriesdetail"></a>

```json
{
  "tree": [
    {
      "_uuid": "17a54659-a06a-464f-a914-190cee7d4b1a",
      "name": "Shoes",
      "Childrens": [{}],
      "hasChildren": true,
      "hasProduct": false
    }
  ],
  "pagination": {
    "total": 240,
    "page": 1,
    "limit": 10,
    "totalPage": 24,
    "isLastPage": false
  }
}
```

### Properties

| Name       | Type                                                | Required | Restrictions | Description          |
| ---------- | --------------------------------------------------- | -------- | ------------ | -------------------- |
| tree       | [CategoryDetails](../models/CategoryDetails.md)     | true     | none         | Root categories tree |
| pagination | [PaginationDetails](../models/PaginationDetails.md) | true     | none         | Paggination info     |
