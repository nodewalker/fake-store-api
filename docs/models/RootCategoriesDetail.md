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
      "uuid": "string",
      "name": "string",
      "hasChildren": true,
      "hasProduct": true
    }
  ],
  "pagination": {
    "total": 0,
    "page": 0,
    "limit": 0,
    "totalPage": 0,
    "isLastPage": true
  }
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|tree|[[CategoryDetails](../models/[CategoryDetails.md)]|true|none|Root categories tree|
|pagination|[PaginationDetails](../models/PaginationDetails.md)|true|none|Paggination info|

