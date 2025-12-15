---
title: ReviewListDetails
language_tabs:
  - javascript: JavaScript,typescript
language_clients:
  - javascript: TypeScript
search: true
---

<h2 id="tocS_ReviewListDetails">ReviewListDetails</h2>

<!-- backwards compatibility -->

<a id="schemareviewlistdetails"></a>
<a id="schema_ReviewListDetails"></a>
<a id="tocSreviewlistdetails"></a>
<a id="tocsreviewlistdetails"></a>

```json
{
  "data": [
    {
      "_uuid": "17a54659-a06a-464f-a914-190cee7d4b1a",
      "content": "Best shoes",
      "rating": 5,
      "user": {}
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

| Name       | Type                                                | Required | Restrictions | Description      |
| ---------- | --------------------------------------------------- | -------- | ------------ | ---------------- |
| data       | [ReviewDetails](../models/ReviewDetails.md)         | true     | none         | Review list      |
| pagintaion | [PaginationDetails](../models/PaginationDetails.md) | true     | none         | Paggination info |
