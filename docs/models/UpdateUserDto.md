---
title: UpdateUserDto
language_tabs:
  - javascript: JavaScript,typescript
language_clients:
  - javascript: TypeScript
search: true
---

<h2 id="tocS_UpdateUserDto">UpdateUserDto</h2>

<!-- backwards compatibility -->

<a id="schemaupdateuserdto"></a>
<a id="schema_UpdateUserDto"></a>
<a id="tocSupdateuserdto"></a>
<a id="tocsupdateuserdto"></a>

```json
{
  "firstName": "Evgeny",
  "lastName": "Smirnov",
  "login": "nodewalker",
  "email": "nodewalker@yandex.com",
  "avatar": "string"
}
```

### Properties

| Name      | Type           | Required | Restrictions | Description                              |
| --------- | -------------- | -------- | ------------ | ---------------------------------------- |
| firstName | string         | false    | none         | User first name ( from 1 to 20 symbols ) |
| lastName  | string         | false    | none         | User last name ( from 1 to 20 symbols )  |
| login     | string         | false    | none         | User login ( from 3 to 24 symbols )      |
| email     | string         | false    | none         | User email                               |
| avatar    | string(binary) | false    | none         | User avatar                              |
