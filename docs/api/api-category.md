---
title: Category
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

# Authentication

- HTTP Authentication, scheme: bearer

<h1 id="fake-store-api-category">Category</h1>

## Create category

<a id="opIdCategoryController_createCategory"></a>

> Code samples

```javascript
const data = JSON.stringify({
  name: 'Shoes',
  parentId: '17a54659-a06a-464f-a914-190cee7d4b1a',
});

const xhr = new XMLHttpRequest();
xhr.withCredentials = true;

xhr.addEventListener('readystatechange', function () {
  if (this.readyState === this.DONE) {
    console.log(this.responseText);
  }
});

xhr.open('POST', 'https://fakestoreapi.ru/category');
xhr.setRequestHeader('Content-Type', 'application/json');
xhr.setRequestHeader('Authorization', 'Bearer {access-token}');

xhr.send(data);
```

`POST /category`

> Body parameter

```json
{
  "name": "Shoes",
  "parentId": "17a54659-a06a-464f-a914-190cee7d4b1a"
}
```

<h3 id="create-category-parameters">Parameters</h3>

| Name | In   | Type                                                | Required | Description |
| ---- | ---- | --------------------------------------------------- | -------- | ----------- |
| body | body | [CreateCategoryDto](../models/CreateCategoryDto.md) | true     | none        |

<h3 id="create-category-responses">Responses</h3>

| Status | Meaning                                                      | Description            | Schema |
| ------ | ------------------------------------------------------------ | ---------------------- | ------ |
| 201    | [Created](https://tools.ietf.org/html/rfc7231#section-6.3.2) | Category created       | None   |
| 5XX    | Unknown                                                      | Server error           | None   |
| 4XX    | Unknown                                                      | Check response message | None   |

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

xhr.addEventListener('readystatechange', function () {
  if (this.readyState === this.DONE) {
    console.log(this.responseText);
  }
});

xhr.open('GET', 'https://fakestoreapi.ru/category');
xhr.setRequestHeader('Accept', 'application/json');

xhr.send(data);
```

`GET /category`

<h3 id="get-root-categories-parameters">Parameters</h3>

| Name | In    | Type   | Required | Description                          |
| ---- | ----- | ------ | -------- | ------------------------------------ |
| l    | query | number | false    | Items limit on page ( from 1 to 50 ) |
| p    | query | number | false    | Items page ( min 1 )                 |

> Example responses

> 200 Response

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

<h3 id="get-root-categories-responses">Responses</h3>

| Status | Meaning                                                 | Description              | Schema                                                    |
| ------ | ------------------------------------------------------- | ------------------------ | --------------------------------------------------------- |
| 200    | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | Root categories received | [RootCategoriesDetail](../models/RootCategoriesDetail.md) |
| 5XX    | Unknown                                                 | Server error             | None                                                      |
| 4XX    | Unknown                                                 | Check response message   | None                                                      |

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

xhr.addEventListener('readystatechange', function () {
  if (this.readyState === this.DONE) {
    console.log(this.responseText);
  }
});

xhr.open('GET', 'https://fakestoreapi.ru/category/string/children');
xhr.setRequestHeader('Accept', 'application/json');

xhr.send(data);
```

`GET /category/{id}/children`

<h3 id="get-subcategories-parameters">Parameters</h3>

| Name | In    | Type    | Required | Description                                                        |
| ---- | ----- | ------- | -------- | ------------------------------------------------------------------ |
| id   | path  | string  | true     | Parent category id                                                 |
| all  | query | boolean | false    | Retrieve all subcategories at all levels, or just the current one. |

> Example responses

> 200 Response

```json
[
  {
    "_uuid": "17a54659-a06a-464f-a914-190cee7d4b1a",
    "name": "Shoes",
    "Childrens": [{}],
    "hasChildren": true,
    "hasProduct": false
  }
]
```

<h3 id="get-subcategories-responses">Responses</h3>

| Status | Meaning                                                 | Description            | Schema |
| ------ | ------------------------------------------------------- | ---------------------- | ------ |
| 200    | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | Subcategories received | Inline |
| 5XX    | Unknown                                                 | Server error           | None   |
| 4XX    | Unknown                                                 | Check response message | None   |

<h3 id="get-subcategories-responseschema">Response Schema</h3>

Status Code **200**

| Name          | Type                                            | Required | Restrictions | Description                                   |
| ------------- | ----------------------------------------------- | -------- | ------------ | --------------------------------------------- |
| _anonymous_   | [CategoryDetails](../models/CategoryDetails.md) | false    | none         | none                                          |
| » \_uuid      | string                                          | true     | none         | Category id                                   |
| » name        | string                                          | true     | none         | Category name                                 |
| » Childrens   | [CategoryDetails](../models/CategoryDetails.md) | false    | none         | Field for retrieve subcategories at all level |
| » hasChildren | boolean                                         | false    | none         | Is category has children                      |
| » hasProduct  | boolean                                         | false    | none         | Is category has product                       |

<aside class="success">
This operation does not require authentication
</aside>

## Update category

<a id="opIdCategoryController_updateCategory"></a>

> Code samples

```javascript
const data = JSON.stringify({
  name: 'Shoes',
});

const xhr = new XMLHttpRequest();
xhr.withCredentials = true;

xhr.addEventListener('readystatechange', function () {
  if (this.readyState === this.DONE) {
    console.log(this.responseText);
  }
});

xhr.open('PATCH', 'https://fakestoreapi.ru/category/string');
xhr.setRequestHeader('Content-Type', 'application/json');
xhr.setRequestHeader('Authorization', 'Bearer {access-token}');

xhr.send(data);
```

`PATCH /category/{id}`

> Body parameter

```json
{
  "name": "Shoes"
}
```

<h3 id="update-category-parameters">Parameters</h3>

| Name | In   | Type                                                | Required | Description |
| ---- | ---- | --------------------------------------------------- | -------- | ----------- |
| id   | path | string                                              | true     | Category id |
| body | body | [UpdateCategoryDto](../models/UpdateCategoryDto.md) | true     | none        |

<h3 id="update-category-responses">Responses</h3>

| Status | Meaning                                                 | Description            | Schema |
| ------ | ------------------------------------------------------- | ---------------------- | ------ |
| 200    | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | Category updated       | None   |
| 5XX    | Unknown                                                 | Server error           | None   |
| 4XX    | Unknown                                                 | Check response message | None   |

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearer
</aside>

## Remove category by id

<a id="opIdCategoryController_removeCategory"></a>

> Code samples

```javascript
const data = null;

const xhr = new XMLHttpRequest();
xhr.withCredentials = true;

xhr.addEventListener('readystatechange', function () {
  if (this.readyState === this.DONE) {
    console.log(this.responseText);
  }
});

xhr.open('DELETE', 'https://fakestoreapi.ru/category/string?all=true');
xhr.setRequestHeader('Authorization', 'Bearer {access-token}');

xhr.send(data);
```

`DELETE /category/{id}`

<h3 id="remove-category-by-id-parameters">Parameters</h3>

| Name | In    | Type    | Required | Description |
| ---- | ----- | ------- | -------- | ----------- |
| id   | path  | string  | true     | Category id |
| all  | query | boolean | true     | none        |

<h3 id="remove-category-by-id-responses">Responses</h3>

| Status | Meaning                                                 | Description            | Schema |
| ------ | ------------------------------------------------------- | ---------------------- | ------ |
| 200    | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | Category deleted       | None   |
| 5XX    | Unknown                                                 | Server error           | None   |
| 4XX    | Unknown                                                 | Check response message | None   |

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearer
</aside>
