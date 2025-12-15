---
title: cart
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

<h1 id="fake-store-api-cart">cart</h1>

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

xhr.open('GET', 'https://fakestoreapi.ru/user/cart');
xhr.setRequestHeader('Accept', 'application/json');
xhr.setRequestHeader('Authorization', 'Bearer {access-token}');

xhr.send(data);
```

`GET /user/cart`

<h3 id="get-user-cart-parameters">Parameters</h3>

| Name | In    | Type   | Required | Description                          |
| ---- | ----- | ------ | -------- | ------------------------------------ |
| l    | query | number | false    | Items limit on page ( from 1 to 50 ) |
| p    | query | number | false    | Items page ( min 1 )                 |

> Example responses

> 200 Response

```json
{
  "_uuid": "17a54659-a06a-464f-a914-190cee7d4b1a",
  "products": [
    {
      "uuid": "17a54659-a06a-464f-a914-190cee7d4b1a",
      "name": "Nike",
      "price": 250,
      "discount": 15,
      "images": [
        {
          "_uuid": "string"
        }
      ],
      "rating": 0,
      "review_count": 0,
      "category": {
        "_uuid": "17a54659-a06a-464f-a914-190cee7d4b1a",
        "name": "Shoes"
      },
      "unit_count": 0
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
const data = JSON.stringify({
  items: [
    '17a54659-a06a-464f-a914-190cee7d4b1a',
    '17a54659-a06a-464f-a914-190cee7d4b1a',
  ],
});

const xhr = new XMLHttpRequest();
xhr.withCredentials = true;

xhr.addEventListener('readystatechange', function () {
  if (this.readyState === this.DONE) {
    console.log(this.responseText);
  }
});

xhr.open('POST', 'https://fakestoreapi.ru/user/cart');
xhr.setRequestHeader('Content-Type', 'application/json');
xhr.setRequestHeader('Authorization', 'Bearer {access-token}');

xhr.send(data);
```

`POST /user/cart`

> Body parameter

```json
{
  "items": [
    "17a54659-a06a-464f-a914-190cee7d4b1a",
    "17a54659-a06a-464f-a914-190cee7d4b1a"
  ]
}
```

<h3 id="add-product-to-user-cart-parameters">Parameters</h3>

| Name | In   | Type                                      | Required | Description |
| ---- | ---- | ----------------------------------------- | -------- | ----------- |
| body | body | [CartItemsDto](../models/CartItemsDto.md) | true     | none        |

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

## Remove products from user cart

<a id="opIdCartController_removeProductFromCart"></a>

> Code samples

```javascript
const data = JSON.stringify({
  items: [
    '17a54659-a06a-464f-a914-190cee7d4b1a',
    '17a54659-a06a-464f-a914-190cee7d4b1a',
  ],
});

const xhr = new XMLHttpRequest();
xhr.withCredentials = true;

xhr.addEventListener('readystatechange', function () {
  if (this.readyState === this.DONE) {
    console.log(this.responseText);
  }
});

xhr.open('DELETE', 'https://fakestoreapi.ru/user/cart');
xhr.setRequestHeader('Content-Type', 'application/json');
xhr.setRequestHeader('Authorization', 'Bearer {access-token}');

xhr.send(data);
```

`DELETE /user/cart`

> Body parameter

```json
{
  "items": [
    "17a54659-a06a-464f-a914-190cee7d4b1a",
    "17a54659-a06a-464f-a914-190cee7d4b1a"
  ]
}
```

<h3 id="remove-products-from-user-cart-parameters">Parameters</h3>

| Name | In   | Type                                      | Required | Description |
| ---- | ---- | ----------------------------------------- | -------- | ----------- |
| body | body | [CartItemsDto](../models/CartItemsDto.md) | true     | none        |

<h3 id="remove-products-from-user-cart-responses">Responses</h3>

| Status | Meaning                                                 | Description            | Schema |
| ------ | ------------------------------------------------------- | ---------------------- | ------ |
| 200    | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | Success removed        | None   |
| 5XX    | Unknown                                                 | Server error           | None   |
| 4XX    | Unknown                                                 | Check response message | None   |

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearer
</aside>
