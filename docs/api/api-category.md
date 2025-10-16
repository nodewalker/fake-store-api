---
title: Fake Store API v1.0
language_tabs:
  - javascript: JavaScript,typescript
language_clients:
  - javascript: TypeScript
toc_footers: []
includes: []
search: true
highlight_theme: darkula
headingLevel: 2

---

<!-- Generator: Widdershins v4.0.1 -->
<h1 id="fake-store-api-category">Category</h1>

## Create category

<a id="opIdCategoryController_createCategory"></a>

> Code samples

```javascript
const data = JSON.stringify({
  "name": "Shoes",
  "parentId": "string"
});

const xhr = new XMLHttpRequest();
xhr.withCredentials = true;

xhr.addEventListener("readystatechange", function () {
  if (this.readyState === this.DONE) {
    console.log(this.responseText);
  }
});

xhr.open("POST", "https://example.com/category");
xhr.setRequestHeader("Content-Type", "application/json");
xhr.setRequestHeader("Authorization", "Bearer {access-token}");

xhr.send(data);
```

`POST /category`

> Body parameter

```json
{
  "name": "Shoes",
  "parentId": "string"
}
```

<h3 id="create-category-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|[CreateCategoryDto](../models/CreateCategoryDto.md)|true|none|

<h3 id="create-category-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|201|[Created](https://tools.ietf.org/html/rfc7231#section-6.3.2)|Category created|None|
|5XX|Unknown|Server error|None|
|4XX|Unknown|Check response message|None|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearer
</aside>

## Get root categories

<a id="opIdCategoryController_getRootCategories"></a>

> Code samples

```javascript
const data = null;

const xhr = new XMLHttpRequest();
xhr.withCredentials = true;

xhr.addEventListener("readystatechange", function () {
  if (this.readyState === this.DONE) {
    console.log(this.responseText);
  }
});

xhr.open("GET", "https://example.com/category");
xhr.setRequestHeader("Accept", "application/json");

xhr.send(data);
```

`GET /category`

<h3 id="get-root-categories-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|limit|query|number|false|Items limit on page ( from 1 to 50 )|
|page|query|number|false|Items page ( min 1 )|

> Example responses

> 200 Response

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

<h3 id="get-root-categories-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Root categories received|[RootCategoriesDetail](../models/RootCategoriesDetail.md)|
|5XX|Unknown|Server error|None|
|4XX|Unknown|Check response message|None|

<aside class="success">
This operation does not require authentication
</aside>

## Get subcategories

<a id="opIdCategoryController_getChildrenByParentId"></a>

> Code samples

```javascript
const data = null;

const xhr = new XMLHttpRequest();
xhr.withCredentials = true;

xhr.addEventListener("readystatechange", function () {
  if (this.readyState === this.DONE) {
    console.log(this.responseText);
  }
});

xhr.open("GET", "https://example.com/category/string/children");
xhr.setRequestHeader("Accept", "application/json");

xhr.send(data);
```

`GET /category/{id}/children`

<h3 id="get-subcategories-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|id|path|string|true|Parent category id|

> Example responses

> 200 Response

```json
[
  {
    "uuid": "string",
    "name": "string",
    "hasChildren": true,
    "hasProduct": true
  }
]
```

<h3 id="get-subcategories-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Subcategories received|Inline|
|5XX|Unknown|Server error|None|
|4XX|Unknown|Check response message|None|

<h3 id="get-subcategories-responseschema">Response Schema</h3>

Status Code **200**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|*anonymous*|[[CategoryDetails](../models/[CategoryDetails.md)]|false|none|none|
|» uuid|string|true|none|Category id|
|» name|string|true|none|Category name|
|» hasChildren|boolean|false|none|Is category has children|
|» hasProduct|boolean|false|none|Is category has product|

<aside class="success">
This operation does not require authentication
</aside>

## Remove category by id

<a id="opIdCategoryController_removeCategory"></a>

> Code samples

```javascript
const data = null;

const xhr = new XMLHttpRequest();
xhr.withCredentials = true;

xhr.addEventListener("readystatechange", function () {
  if (this.readyState === this.DONE) {
    console.log(this.responseText);
  }
});

xhr.open("DELETE", "https://example.com/category/string?all=true");
xhr.setRequestHeader("Authorization", "Bearer {access-token}");

xhr.send(data);
```

`DELETE /category/{id}`

<h3 id="remove-category-by-id-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|id|path|string|true|Category id|
|all|query|boolean|true|none|

<h3 id="remove-category-by-id-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Category deleted|None|
|5XX|Unknown|Server error|None|
|4XX|Unknown|Check response message|None|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearer
</aside>

