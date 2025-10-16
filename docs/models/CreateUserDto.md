---
title: CreateUserDto
language_tabs:
  - javascript: JavaScript,typescript
language_clients:
  - javascript: TypeScript
search: true
---

<h2 id="tocS_CreateUserDto">CreateUserDto</h2>

<!-- backwards compatibility -->
<a id="schemacreateuserdto"></a>
<a id="schema_CreateUserDto"></a>
<a id="tocScreateuserdto"></a>
<a id="tocscreateuserdto"></a>

```json
{
  "firstName": "Evgeny",
  "lastName": "Smirnov",
  "login": "nodewalker",
  "email": "nodewalker@yandex.com",
  "password": "**********"
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|firstName|string|true|none|User first name ( from 1 to 20 symbols )|
|lastName|string|true|none|User last name ( from 1 to 20 symbols )|
|login|string|true|none|User login ( from 3 to 24 symbols )|
|email|string|true|none|User email|
|password|string|true|none|User password ( from 8 to 32 symbols )|

