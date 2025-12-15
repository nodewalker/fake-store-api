---
title: ReviewDetails
language_tabs:
  - javascript: JavaScript,typescript
language_clients:
  - javascript: TypeScript
search: true
---

<h2 id="tocS_ReviewDetails">ReviewDetails</h2>

<!-- backwards compatibility -->

<a id="schemareviewdetails"></a>
<a id="schema_ReviewDetails"></a>
<a id="tocSreviewdetails"></a>
<a id="tocsreviewdetails"></a>

```json
{
  "_uuid": "17a54659-a06a-464f-a914-190cee7d4b1a",
  "content": "Best shoes",
  "rating": 5,
  "user": {}
}
```

### Properties

| Name    | Type                                                | Required | Restrictions | Description             |
| ------- | --------------------------------------------------- | -------- | ------------ | ----------------------- |
| \_uuid  | string                                              | true     | none         | Review d                |
| content | string                                              | true     | none         | Content of review       |
| rating  | string                                              | true     | none         | Reting of product (1-5) |
| user    | [ReviewUserDetails](../models/ReviewUserDetails.md) | true     | none         | Review owner info       |
