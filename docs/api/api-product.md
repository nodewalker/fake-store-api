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
<h1 id="fake-store-api-product">Product</h1>

## Get list of products

<a id="opIdProductController_getProducts"></a>

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

xhr.open("GET", "https://example.com/product");
xhr.setRequestHeader("Accept", "application/json");

xhr.send(data);
```

`GET /product`

<h3 id="get-list-of-products-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|limit|query|number|false|Items limit on page ( from 1 to 50 )|
|page|query|number|false|Items page ( min 1 )|
|name|query|string|false|Product name|
|orderBy|query|string|false|Sort by ( name, price, discount )|
|sort|query|string|false|Sort method ( ASC | DESC )|
|priceFrom|query|number|false|Product price from ( min 0 )|
|priceTo|query|number|false|Product price to ( min 1 )|
|categoryName|query|string|false|Product category name|
|categoryId|query|string|false|Product category id|

> Example responses

> 200 Response

```json
{
  "data": [
    {
      "uuid": "string",
      "name": "string",
      "price": "string",
      "discount": "string",
      "images": [
        {
          "uuid": "string"
        }
      ],
      "category": {
        "uuid": "string",
        "name": "string",
        "hasChildren": true,
        "hasProduct": true
      }
    }
  ],
  "pagintaion": {
    "total": 0,
    "page": 0,
    "limit": 0,
    "totalPage": 0,
    "isLastPage": true
  }
}
```

<h3 id="get-list-of-products-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Products recived|[ProductsListDetails](../models/ProductsListDetails.md)|
|5XX|Unknown|Server error|None|
|4XX|Unknown|Check response message|None|

<aside class="success">
This operation does not require authentication
</aside>

## Create product

<a id="opIdProductController_createProduct"></a>

> Code samples

`POST /product`

> Body parameter

```yaml
name: New Balance 1906
price: 1000
categoryId: string
discount: 25
images:
  - string

```

<h3 id="create-product-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|[CreateProductDto](../models/CreateProductDto.md)|true|none|

> Example responses

> 201 Response

```json
{
  "uuid": "string",
  "name": "string",
  "price": "string",
  "discount": "string",
  "images": [
    {
      "uuid": "string"
    }
  ],
  "category": {
    "uuid": "string",
    "name": "string",
    "hasChildren": true,
    "hasProduct": true
  }
}
```

<h3 id="create-product-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|201|[Created](https://tools.ietf.org/html/rfc7231#section-6.3.2)|Product created|[ProductDetails](../models/ProductDetails.md)|
|5XX|Unknown|Server error|None|
|4XX|Unknown|Check response message|None|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearer
</aside>

## Get product by id

<a id="opIdProductController_getOneById"></a>

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

xhr.open("GET", "https://example.com/product/string");
xhr.setRequestHeader("Accept", "application/json");

xhr.send(data);
```

`GET /product/{id}`

<h3 id="get-product-by-id-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|id|path|string|true|Product id|

> Example responses

> 200 Response

```json
{
  "uuid": "string",
  "name": "string",
  "price": "string",
  "discount": "string",
  "images": [
    {
      "uuid": "string"
    }
  ],
  "category": {
    "uuid": "string",
    "name": "string",
    "hasChildren": true,
    "hasProduct": true
  }
}
```

<h3 id="get-product-by-id-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Product recived|[ProductDetails](../models/ProductDetails.md)|
|5XX|Unknown|Server error|None|
|4XX|Unknown|Check response message|None|

<aside class="success">
This operation does not require authentication
</aside>

## Remove product

<a id="opIdProductController_removeProduct"></a>

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

xhr.open("DELETE", "https://example.com/product/string");
xhr.setRequestHeader("Authorization", "Bearer {access-token}");

xhr.send(data);
```

`DELETE /product/{id}`

<h3 id="remove-product-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|id|path|string|true|Product id|

<h3 id="remove-product-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Product removed|None|
|5XX|Unknown|Server error|None|
|4XX|Unknown|Check response message|None|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearer
</aside>

