---
title: PaginationDetails
language_tabs:
  - javascript: JavaScript,typescript
language_clients:
  - javascript: TypeScript
search: true
---

<h2 id="tocS_PaginationDetails">PaginationDetails</h2>

<!-- backwards compatibility -->

<a id="schemapaginationdetails"></a>
<a id="schema_PaginationDetails"></a>
<a id="tocSpaginationdetails"></a>
<a id="tocspaginationdetails"></a>

```json
{
  "total": 240,
  "page": 1,
  "limit": 10,
  "totalPage": 24,
  "isLastPage": false
}
```

### Properties

| Name       | Type    | Required | Restrictions | Description      |
| ---------- | ------- | -------- | ------------ | ---------------- |
| total      | number  | true     | none         | Total items      |
| page       | number  | true     | none         | Current page     |
| limit      | number  | true     | none         | Current limit    |
| totalPage  | number  | true     | none         | Total page count |
| isLastPage | boolean | true     | none         | is last page?    |
