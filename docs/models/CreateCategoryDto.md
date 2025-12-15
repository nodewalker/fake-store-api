---
title: CreateCategoryDto
language_tabs:
  - javascript: JavaScript,typescript
language_clients:
  - javascript: TypeScript
search: true
---

<h2 id="tocS_CreateCategoryDto">CreateCategoryDto</h2>

<!-- backwards compatibility -->

<a id="schemacreatecategorydto"></a>
<a id="schema_CreateCategoryDto"></a>
<a id="tocScreatecategorydto"></a>
<a id="tocscreatecategorydto"></a>

```json
{
  "name": "Shoes",
  "parentId": "17a54659-a06a-464f-a914-190cee7d4b1a"
}
```

### Properties

| Name     | Type   | Required | Restrictions | Description                               |
| -------- | ------ | -------- | ------------ | ----------------------------------------- |
| name     | string | true     | none         | Name of category ( from 2 to 50 symbols ) |
| parentId | string | false    | none         | Parent category id                        |
