---
title: Cart
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
<h1 id="fake-store-api-cart">Cart</h1>

## Get user cart

<a id="opIdCartController_getCart"></a>

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

xhr.open('GET', 'https://example.com/user/cart');
xhr.setRequestHeader('Accept', 'application/json');
xhr.setRequestHeader('Authorization', 'Bearer {access-token}');

xhr.send(data);
```

`GET /user/cart`

<h3 id="get-user-cart-parameters">Parameters</h3>

| Name  | In    | Type   | Required | Description                          |
| ----- | ----- | ------ | -------- | ------------------------------------ |
| limit | query | number | false    | Items limit on page ( from 1 to 50 ) |
| page  | query | number | false    | Items page ( min 1 )                 |

> Example responses

> 200 Response

```json
{
  "uuid": "string",
  "products": [
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
        "name": "string"
      }
    }
  ]
}
```

<h3 id="get-user-cart-responses">Responses</h3>

| Status | Meaning                                                 | Description            | Schema                                  |
| ------ | ------------------------------------------------------- | ---------------------- | --------------------------------------- |
| 200    | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | User cart recived      | [CartDetails](../models/CartDetails.md) |
| 5XX    | Unknown                                                 | Server error           | None                                    |
| 4XX    | Unknown                                                 | Check response message | None                                    |

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearer
</aside>

## Add product to user cart

<a id="opIdCartController_addProductToUserCart"></a>

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

xhr.open('POST', 'https://example.com/user/cart?pid=string');
xhr.setRequestHeader('Authorization', 'Bearer {access-token}');

xhr.send(data);
```

`POST /user/cart`

<h3 id="add-product-to-user-cart-parameters">Parameters</h3>

| Name | In    | Type   | Required | Description |
| ---- | ----- | ------ | -------- | ----------- |
| pid  | query | string | true     | Product id  |

<h3 id="add-product-to-user-cart-responses">Responses</h3>

| Status | Meaning                                                 | Description            | Schema |
| ------ | ------------------------------------------------------- | ---------------------- | ------ |
| 200    | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | Success added          | None   |
| 5XX    | Unknown                                                 | Server error           | None   |
| 4XX    | Unknown                                                 | Check response message | None   |

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearer
</aside>

## Remove product from user cart

<a id="opIdCartController_removeProductFromCart"></a>

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

xhr.open('DELETE', 'https://example.com/user/cart?pid=string');
xhr.setRequestHeader('Authorization', 'Bearer {access-token}');

xhr.send(data);
```

`DELETE /user/cart`

<h3 id="remove-product-from-user-cart-parameters">Parameters</h3>

| Name | In    | Type   | Required | Description |
| ---- | ----- | ------ | -------- | ----------- |
| pid  | query | string | true     | Product id  |

<h3 id="remove-product-from-user-cart-responses">Responses</h3>

| Status | Meaning                                                 | Description            | Schema |
| ------ | ------------------------------------------------------- | ---------------------- | ------ |
| 200    | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | Success removed        | None   |
| 5XX    | Unknown                                                 | Server error           | None   |
| 4XX    | Unknown                                                 | Check response message | None   |

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearer
</aside>
