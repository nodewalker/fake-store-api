---
title: Fake Store API v1.0
language_tabs:
  - javascript: JavaScript
toc_footers: []
includes: []
search: true
highlight_theme: darkula
headingLevel: 2

---

<!-- Generator: Widdershins v4.0.1 -->

<h1 id="fake-store-api">Fake Store API v1.0</h1>

> Scroll down for code samples, example requests and responses. Select a language for code samples from the tabs above or the mobile navigation menu.

A simple REST API that simulates an online store — provides fake products, categories, and users for testing, prototyping, and learning purposes.

Base URLs:

# Authentication

- HTTP Authentication, scheme: bearer 

<h1 id="fake-store-api-user">User</h1>

## Get user info

<a id="opIdUserController_getUserProfile"></a>

> Code samples

```javascript

const headers = {
  'Accept':'application/json',
  'Authorization':'Bearer {access-token}'
};

fetch('/user',
{
  method: 'GET',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`GET /user`

> Example responses

> 200 Response

```json
{
  "type": "object",
  "properties": {
    "uuid": {
      "type": "string",
      "description": "User id"
    },
    "firstName": {
      "type": "string",
      "description": "User first name"
    },
    "lastName": {
      "type": "string",
      "description": "User last name"
    },
    "login": {
      "type": "string",
      "description": "User login"
    },
    "email": {
      "type": "string",
      "description": "User email"
    },
    "avatarURL": {
      "type": "string",
      "description": "User avatar url"
    }
  },
  "required": [
    "uuid",
    "firstName",
    "lastName",
    "login",
    "email",
    "avatarURL"
  ]
}
```

<h3 id="get-user-info-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|User info recived|[ReturnUserProfileDetails](#schemareturnuserprofiledetails)|
|5XX|Unknown|Server error|None|
|4XX|Unknown|Check response message|None|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearer
</aside>

## Update user info

<a id="opIdUserController_updateUser"></a>

> Code samples

```javascript
const inputBody = '{
  "type": "object",
  "properties": {
    "firstName": {
      "type": "string",
      "description": "User first name ( from 1 to 20 symbols )",
      "example": "Evgeny"
    },
    "lastName": {
      "type": "string",
      "description": "User last name ( from 1 to 20 symbols )",
      "example": "Smirnov"
    },
    "login": {
      "type": "string",
      "description": "User login ( from 3 to 24 symbols )",
      "example": "nodewalker"
    },
    "email": {
      "type": "string",
      "description": "User email",
      "example": "nodewalker@yandex.com"
    },
    "avatar": {
      "type": "string",
      "format": "binary",
      "description": "User avatar"
    }
  }
}';
const headers = {
  'Content-Type':'application/json',
  'Authorization':'Bearer {access-token}'
};

fetch('/user',
{
  method: 'PATCH',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`PATCH /user`

> Body parameter

```json
{
  "type": "object",
  "properties": {
    "firstName": {
      "type": "string",
      "description": "User first name ( from 1 to 20 symbols )",
      "example": "Evgeny"
    },
    "lastName": {
      "type": "string",
      "description": "User last name ( from 1 to 20 symbols )",
      "example": "Smirnov"
    },
    "login": {
      "type": "string",
      "description": "User login ( from 3 to 24 symbols )",
      "example": "nodewalker"
    },
    "email": {
      "type": "string",
      "description": "User email",
      "example": "nodewalker@yandex.com"
    },
    "avatar": {
      "type": "string",
      "format": "binary",
      "description": "User avatar"
    }
  }
}
```

<h3 id="update-user-info-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|[UpdateUserDto](#schemaupdateuserdto)|true|none|

<h3 id="update-user-info-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|User info updated|None|
|5XX|Unknown|Server error|None|
|4XX|Unknown|Check response message|None|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearer
</aside>

## Update user password

<a id="opIdUserController_updateUserPassword"></a>

> Code samples

```javascript
const inputBody = '{
  "type": "object",
  "properties": {
    "currentPassword": {
      "type": "string",
      "description": "User old password ( from 8 to 32 symbols )",
      "example": "**********"
    },
    "newPassword": {
      "type": "string",
      "description": "User new password ( from 8 to 32 symbols )",
      "example": "**********"
    },
    "repeatNewPassword": {
      "type": "string",
      "description": "Repeat new password ( from 8 to 32 symbols )",
      "example": "**********"
    }
  },
  "required": [
    "currentPassword",
    "newPassword",
    "repeatNewPassword"
  ]
}';
const headers = {
  'Content-Type':'application/json',
  'Authorization':'Bearer {access-token}'
};

fetch('/user/password',
{
  method: 'PATCH',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`PATCH /user/password`

> Body parameter

```json
{
  "type": "object",
  "properties": {
    "currentPassword": {
      "type": "string",
      "description": "User old password ( from 8 to 32 symbols )",
      "example": "**********"
    },
    "newPassword": {
      "type": "string",
      "description": "User new password ( from 8 to 32 symbols )",
      "example": "**********"
    },
    "repeatNewPassword": {
      "type": "string",
      "description": "Repeat new password ( from 8 to 32 symbols )",
      "example": "**********"
    }
  },
  "required": [
    "currentPassword",
    "newPassword",
    "repeatNewPassword"
  ]
}
```

<h3 id="update-user-password-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|[UpdateUserPasswordDto](#schemaupdateuserpassworddto)|true|none|

<h3 id="update-user-password-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|User password updated|None|
|5XX|Unknown|Server error|None|
|4XX|Unknown|Check response message|None|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearer
</aside>

<h1 id="fake-store-api-cart">Cart</h1>

## Get user cart

<a id="opIdCartController_getCart"></a>

> Code samples

```javascript

const headers = {
  'Accept':'application/json',
  'Authorization':'Bearer {access-token}'
};

fetch('/user/cart',
{
  method: 'GET',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`GET /user/cart`

<h3 id="get-user-cart-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|limit|query|number|false|Items limit on page ( from 1 to 50 )|
|page|query|number|false|Items page ( min 1 )|

> Example responses

> 200 Response

```json
{
  "type": "object",
  "properties": {
    "uuid": {
      "type": "string",
      "description": "Cart id"
    },
    "products": {
      "description": "Products from cart",
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "uuid": {
            "type": "string",
            "description": "Product id"
          },
          "name": {
            "type": "string",
            "description": "Product name"
          },
          "price": {
            "type": "string",
            "description": "Product price"
          },
          "discount": {
            "type": "string",
            "description": "Product discount"
          },
          "images": {
            "description": "Product images",
            "type": "array",
            "items": {
              "type": "object",
              "properties": {
                "uuid": {
                  "type": "string",
                  "description": "Image url"
                }
              },
              "required": [
                "uuid"
              ]
            }
          },
          "category": {
            "description": "Product category",
            "allOf": [
              {
                "type": "object",
                "properties": {
                  "uuid": {
                    "type": "string",
                    "description": "Category id"
                  },
                  "name": {
                    "type": "string",
                    "description": "Category name"
                  },
                  "hasChildren": {
                    "type": "boolean",
                    "description": "Is category has children"
                  },
                  "hasProduct": {
                    "type": "boolean",
                    "description": "Is category has product"
                  }
                },
                "required": [
                  "uuid",
                  "name"
                ]
              }
            ]
          }
        },
        "required": [
          "uuid",
          "name",
          "price",
          "discount",
          "images",
          "category"
        ]
      }
    }
  },
  "required": [
    "uuid",
    "products"
  ]
}
```

<h3 id="get-user-cart-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|User cart recived|[CartDetails](#schemacartdetails)|
|5XX|Unknown|Server error|None|
|4XX|Unknown|Check response message|None|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearer
</aside>

## Add product to user cart

<a id="opIdCartController_addProductToUserCart"></a>

> Code samples

```javascript

const headers = {
  'Authorization':'Bearer {access-token}'
};

fetch('/user/cart?pid=type,string',
{
  method: 'POST',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`POST /user/cart`

<h3 id="add-product-to-user-cart-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|pid|query|string|true|Product id|

<h3 id="add-product-to-user-cart-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Success added|None|
|5XX|Unknown|Server error|None|
|4XX|Unknown|Check response message|None|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearer
</aside>

## Remove product from user cart

<a id="opIdCartController_removeProductFromCart"></a>

> Code samples

```javascript

const headers = {
  'Authorization':'Bearer {access-token}'
};

fetch('/user/cart?pid=type,string',
{
  method: 'DELETE',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`DELETE /user/cart`

<h3 id="remove-product-from-user-cart-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|pid|query|string|true|Product id|

<h3 id="remove-product-from-user-cart-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Success removed|None|
|5XX|Unknown|Server error|None|
|4XX|Unknown|Check response message|None|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearer
</aside>

<h1 id="fake-store-api-auth">Auth</h1>

## User registration

<a id="opIdAuthController_signup"></a>

> Code samples

```javascript
const inputBody = '{
  "type": "object",
  "properties": {
    "firstName": {
      "type": "string",
      "description": "User first name ( from 1 to 20 symbols )",
      "example": "Evgeny"
    },
    "lastName": {
      "type": "string",
      "description": "User last name ( from 1 to 20 symbols )",
      "example": "Smirnov"
    },
    "login": {
      "type": "string",
      "description": "User login ( from 3 to 24 symbols )",
      "example": "nodewalker"
    },
    "email": {
      "type": "string",
      "description": "User email",
      "example": "nodewalker@yandex.com"
    },
    "password": {
      "type": "string",
      "description": "User password ( from 8 to 32 symbols )",
      "example": "**********"
    }
  },
  "required": [
    "firstName",
    "lastName",
    "login",
    "email",
    "password"
  ]
}';
const headers = {
  'Content-Type':'application/json',
  'Accept':'application/json'
};

fetch('/auth/signup',
{
  method: 'POST',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`POST /auth/signup`

> Body parameter

```json
{
  "type": "object",
  "properties": {
    "firstName": {
      "type": "string",
      "description": "User first name ( from 1 to 20 symbols )",
      "example": "Evgeny"
    },
    "lastName": {
      "type": "string",
      "description": "User last name ( from 1 to 20 symbols )",
      "example": "Smirnov"
    },
    "login": {
      "type": "string",
      "description": "User login ( from 3 to 24 symbols )",
      "example": "nodewalker"
    },
    "email": {
      "type": "string",
      "description": "User email",
      "example": "nodewalker@yandex.com"
    },
    "password": {
      "type": "string",
      "description": "User password ( from 8 to 32 symbols )",
      "example": "**********"
    }
  },
  "required": [
    "firstName",
    "lastName",
    "login",
    "email",
    "password"
  ]
}
```

<h3 id="user-registration-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|[CreateUserDto](#schemacreateuserdto)|true|none|

> Example responses

> 200 Response

```json
{
  "type": "object",
  "properties": {
    "access_token": {
      "type": "string",
      "description": "access token"
    },
    "refresh_token": {
      "type": "string",
      "description": "refresh token"
    }
  },
  "required": [
    "access_token",
    "refresh_token"
  ]
}
```

<h3 id="user-registration-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|User registered success|[TokensDetails](#schematokensdetails)|
|5XX|Unknown|Server error|None|
|4XX|Unknown|Check response message|None|

<aside class="success">
This operation does not require authentication
</aside>

## User login

<a id="opIdAuthController_signin"></a>

> Code samples

```javascript
const inputBody = '{
  "type": "object",
  "properties": {
    "login": {
      "type": "string",
      "description": "User login ( from 3 to 24 symbols )",
      "example": "nodewalker"
    },
    "password": {
      "type": "string",
      "description": "User password ( from 8 to 32 symbols )",
      "example": "**********"
    }
  },
  "required": [
    "login",
    "password"
  ]
}';
const headers = {
  'Content-Type':'application/json',
  'Accept':'application/json'
};

fetch('/auth/signin',
{
  method: 'POST',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`POST /auth/signin`

> Body parameter

```json
{
  "type": "object",
  "properties": {
    "login": {
      "type": "string",
      "description": "User login ( from 3 to 24 symbols )",
      "example": "nodewalker"
    },
    "password": {
      "type": "string",
      "description": "User password ( from 8 to 32 symbols )",
      "example": "**********"
    }
  },
  "required": [
    "login",
    "password"
  ]
}
```

<h3 id="user-login-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|[LoginDto](#schemalogindto)|true|none|

> Example responses

> 200 Response

```json
{
  "type": "object",
  "properties": {
    "access_token": {
      "type": "string",
      "description": "access token"
    },
    "refresh_token": {
      "type": "string",
      "description": "refresh token"
    }
  },
  "required": [
    "access_token",
    "refresh_token"
  ]
}
```

<h3 id="user-login-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|User login success|[TokensDetails](#schematokensdetails)|
|5XX|Unknown|Server error|None|
|4XX|Unknown|Check response message|None|

<aside class="success">
This operation does not require authentication
</aside>

## Refresh auth tokens

<a id="opIdAuthController_refresh"></a>

> Code samples

```javascript

const headers = {
  'Accept':'application/json'
};

fetch('/auth/refresh?rt=type,string',
{
  method: 'POST',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`POST /auth/refresh`

<h3 id="refresh-auth-tokens-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|rt|query|string|true|Refresh token|

> Example responses

> 200 Response

```json
{
  "type": "object",
  "properties": {
    "access_token": {
      "type": "string",
      "description": "access token"
    },
    "refresh_token": {
      "type": "string",
      "description": "refresh token"
    }
  },
  "required": [
    "access_token",
    "refresh_token"
  ]
}
```

<h3 id="refresh-auth-tokens-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Refresh tokens success|[TokensDetails](#schematokensdetails)|
|5XX|Unknown|Server error|None|
|4XX|Unknown|Check response message|None|

<aside class="success">
This operation does not require authentication
</aside>

<h1 id="fake-store-api-product">Product</h1>

## Get list of products

<a id="opIdProductController_getProducts"></a>

> Code samples

```javascript

const headers = {
  'Accept':'application/json'
};

fetch('/product',
{
  method: 'GET',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

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
  "type": "object",
  "properties": {
    "data": {
      "description": "Product list",
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "uuid": {
            "type": "string",
            "description": "Product id"
          },
          "name": {
            "type": "string",
            "description": "Product name"
          },
          "price": {
            "type": "string",
            "description": "Product price"
          },
          "discount": {
            "type": "string",
            "description": "Product discount"
          },
          "images": {
            "description": "Product images",
            "type": "array",
            "items": {
              "type": "object",
              "properties": {
                "uuid": {
                  "type": "string",
                  "description": "Image url"
                }
              },
              "required": [
                "uuid"
              ]
            }
          },
          "category": {
            "description": "Product category",
            "allOf": [
              {
                "type": "object",
                "properties": {
                  "uuid": {
                    "type": "string",
                    "description": "Category id"
                  },
                  "name": {
                    "type": "string",
                    "description": "Category name"
                  },
                  "hasChildren": {
                    "type": "boolean",
                    "description": "Is category has children"
                  },
                  "hasProduct": {
                    "type": "boolean",
                    "description": "Is category has product"
                  }
                },
                "required": [
                  "uuid",
                  "name"
                ]
              }
            ]
          }
        },
        "required": [
          "uuid",
          "name",
          "price",
          "discount",
          "images",
          "category"
        ]
      }
    },
    "pagintaion": {
      "description": "Paggination info",
      "allOf": [
        {
          "type": "object",
          "properties": {
            "total": {
              "type": "number",
              "description": "Total items"
            },
            "page": {
              "type": "number",
              "description": "Current page"
            },
            "limit": {
              "type": "number",
              "description": "Current limit"
            },
            "totalPage": {
              "type": "number",
              "description": "Total page count"
            },
            "isLastPage": {
              "type": "boolean",
              "description": "is last page?"
            }
          },
          "required": [
            "total",
            "page",
            "limit",
            "totalPage",
            "isLastPage"
          ]
        }
      ]
    }
  },
  "required": [
    "data",
    "pagintaion"
  ]
}
```

<h3 id="get-list-of-products-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Products recived|[ProductsListDetails](#schemaproductslistdetails)|
|5XX|Unknown|Server error|None|
|4XX|Unknown|Check response message|None|

<aside class="success">
This operation does not require authentication
</aside>

## Create product

<a id="opIdProductController_createProduct"></a>

> Code samples

```javascript
const inputBody = '{
  "type": "object",
  "properties": {
    "name": {
      "type": "string",
      "description": "Name of product ( from 2 to 50 symbols )",
      "example": "New Balance 1906"
    },
    "price": {
      "type": "number",
      "description": "Price of product ( min 1 )",
      "example": 1000
    },
    "categoryId": {
      "type": "string",
      "description": "Category id"
    },
    "discount": {
      "type": "number",
      "description": "Discount of product ( from 0 to 100 )",
      "default": 0,
      "example": 25
    },
    "images": {
      "type": "array",
      "items": {
        "type": "string",
        "format": "binary"
      },
      "description": "Product images",
      "minItems": 1,
      "maxItems": 3
    }
  },
  "required": [
    "name",
    "price",
    "categoryId",
    "discount",
    "images"
  ]
}';
const headers = {
  'Content-Type':'multipart/form-data',
  'Accept':'application/json',
  'Authorization':'Bearer {access-token}'
};

fetch('/product',
{
  method: 'POST',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`POST /product`

> Body parameter

```yaml
type: object
properties:
  name:
    type: string
    description: Name of product ( from 2 to 50 symbols )
    example: New Balance 1906
  price:
    type: number
    description: Price of product ( min 1 )
    example: 1000
  categoryId:
    type: string
    description: Category id
  discount:
    type: number
    description: Discount of product ( from 0 to 100 )
    default: 0
    example: 25
  images:
    type: array
    items:
      type: string
      format: binary
    description: Product images
    minItems: 1
    maxItems: 3
required:
  - name
  - price
  - categoryId
  - discount
  - images

```

<h3 id="create-product-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|[CreateProductDto](#schemacreateproductdto)|true|none|

> Example responses

> 201 Response

```json
{
  "type": "object",
  "properties": {
    "uuid": {
      "type": "string",
      "description": "Product id"
    },
    "name": {
      "type": "string",
      "description": "Product name"
    },
    "price": {
      "type": "string",
      "description": "Product price"
    },
    "discount": {
      "type": "string",
      "description": "Product discount"
    },
    "images": {
      "description": "Product images",
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "uuid": {
            "type": "string",
            "description": "Image url"
          }
        },
        "required": [
          "uuid"
        ]
      }
    },
    "category": {
      "description": "Product category",
      "allOf": [
        {
          "type": "object",
          "properties": {
            "uuid": {
              "type": "string",
              "description": "Category id"
            },
            "name": {
              "type": "string",
              "description": "Category name"
            },
            "hasChildren": {
              "type": "boolean",
              "description": "Is category has children"
            },
            "hasProduct": {
              "type": "boolean",
              "description": "Is category has product"
            }
          },
          "required": [
            "uuid",
            "name"
          ]
        }
      ]
    }
  },
  "required": [
    "uuid",
    "name",
    "price",
    "discount",
    "images",
    "category"
  ]
}
```

<h3 id="create-product-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|201|[Created](https://tools.ietf.org/html/rfc7231#section-6.3.2)|Product created|[ProductDetails](#schemaproductdetails)|
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

const headers = {
  'Accept':'application/json'
};

fetch('/product/{id}',
{
  method: 'GET',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

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
  "type": "object",
  "properties": {
    "uuid": {
      "type": "string",
      "description": "Product id"
    },
    "name": {
      "type": "string",
      "description": "Product name"
    },
    "price": {
      "type": "string",
      "description": "Product price"
    },
    "discount": {
      "type": "string",
      "description": "Product discount"
    },
    "images": {
      "description": "Product images",
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "uuid": {
            "type": "string",
            "description": "Image url"
          }
        },
        "required": [
          "uuid"
        ]
      }
    },
    "category": {
      "description": "Product category",
      "allOf": [
        {
          "type": "object",
          "properties": {
            "uuid": {
              "type": "string",
              "description": "Category id"
            },
            "name": {
              "type": "string",
              "description": "Category name"
            },
            "hasChildren": {
              "type": "boolean",
              "description": "Is category has children"
            },
            "hasProduct": {
              "type": "boolean",
              "description": "Is category has product"
            }
          },
          "required": [
            "uuid",
            "name"
          ]
        }
      ]
    }
  },
  "required": [
    "uuid",
    "name",
    "price",
    "discount",
    "images",
    "category"
  ]
}
```

<h3 id="get-product-by-id-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Product recived|[ProductDetails](#schemaproductdetails)|
|5XX|Unknown|Server error|None|
|4XX|Unknown|Check response message|None|

<aside class="success">
This operation does not require authentication
</aside>

## Remove product

<a id="opIdProductController_removeProduct"></a>

> Code samples

```javascript

const headers = {
  'Authorization':'Bearer {access-token}'
};

fetch('/product/{id}',
{
  method: 'DELETE',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

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

<h1 id="fake-store-api-category">Category</h1>

## Create category

<a id="opIdCategoryController_createCategory"></a>

> Code samples

```javascript
const inputBody = '{
  "type": "object",
  "properties": {
    "name": {
      "type": "string",
      "description": "Name of category ( from 2 to 50 symbols )",
      "example": "Shoes"
    },
    "parentId": {
      "type": "string",
      "description": "Parent category id"
    }
  },
  "required": [
    "name"
  ]
}';
const headers = {
  'Content-Type':'application/json',
  'Authorization':'Bearer {access-token}'
};

fetch('/category',
{
  method: 'POST',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`POST /category`

> Body parameter

```json
{
  "type": "object",
  "properties": {
    "name": {
      "type": "string",
      "description": "Name of category ( from 2 to 50 symbols )",
      "example": "Shoes"
    },
    "parentId": {
      "type": "string",
      "description": "Parent category id"
    }
  },
  "required": [
    "name"
  ]
}
```

<h3 id="create-category-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|[CreateCategoryDto](#schemacreatecategorydto)|true|none|

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

const headers = {
  'Accept':'application/json'
};

fetch('/category',
{
  method: 'GET',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

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
  "type": "object",
  "properties": {
    "tree": {
      "description": "Root categories tree",
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "uuid": {
            "type": "string",
            "description": "Category id"
          },
          "name": {
            "type": "string",
            "description": "Category name"
          },
          "hasChildren": {
            "type": "boolean",
            "description": "Is category has children"
          },
          "hasProduct": {
            "type": "boolean",
            "description": "Is category has product"
          }
        },
        "required": [
          "uuid",
          "name"
        ]
      }
    },
    "pagination": {
      "description": "Paggination info",
      "allOf": [
        {
          "type": "object",
          "properties": {
            "total": {
              "type": "number",
              "description": "Total items"
            },
            "page": {
              "type": "number",
              "description": "Current page"
            },
            "limit": {
              "type": "number",
              "description": "Current limit"
            },
            "totalPage": {
              "type": "number",
              "description": "Total page count"
            },
            "isLastPage": {
              "type": "boolean",
              "description": "is last page?"
            }
          },
          "required": [
            "total",
            "page",
            "limit",
            "totalPage",
            "isLastPage"
          ]
        }
      ]
    }
  },
  "required": [
    "tree",
    "pagination"
  ]
}
```

<h3 id="get-root-categories-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Root categories received|[RootCategoriesDetail](#schemarootcategoriesdetail)|
|5XX|Unknown|Server error|None|
|4XX|Unknown|Check response message|None|

<aside class="success">
This operation does not require authentication
</aside>

## Get subcategories

<a id="opIdCategoryController_getChildrenByParentId"></a>

> Code samples

```javascript

const headers = {
  'Accept':'application/json'
};

fetch('/category/{id}/children',
{
  method: 'GET',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`GET /category/{id}/children`

<h3 id="get-subcategories-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|id|path|string|true|Parent category id|

> Example responses

> 200 Response

```json
{
  "type": "array",
  "items": {
    "type": "object",
    "properties": {
      "uuid": {
        "type": "string",
        "description": "Category id"
      },
      "name": {
        "type": "string",
        "description": "Category name"
      },
      "hasChildren": {
        "type": "boolean",
        "description": "Is category has children"
      },
      "hasProduct": {
        "type": "boolean",
        "description": "Is category has product"
      }
    },
    "required": [
      "uuid",
      "name"
    ]
  }
}
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
|*anonymous*|[[CategoryDetails](#schemacategorydetails)]|false|none|none|
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

const headers = {
  'Authorization':'Bearer {access-token}'
};

fetch('/category/{id}?all=type,boolean',
{
  method: 'DELETE',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

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

# Schemas

<h2 id="tocS_ReturnUserProfileDetails">ReturnUserProfileDetails</h2>
<!-- backwards compatibility -->
<a id="schemareturnuserprofiledetails"></a>
<a id="schema_ReturnUserProfileDetails"></a>
<a id="tocSreturnuserprofiledetails"></a>
<a id="tocsreturnuserprofiledetails"></a>

```json
{
  "type": "object",
  "properties": {
    "uuid": {
      "type": "string",
      "description": "User id"
    },
    "firstName": {
      "type": "string",
      "description": "User first name"
    },
    "lastName": {
      "type": "string",
      "description": "User last name"
    },
    "login": {
      "type": "string",
      "description": "User login"
    },
    "email": {
      "type": "string",
      "description": "User email"
    },
    "avatarURL": {
      "type": "string",
      "description": "User avatar url"
    }
  },
  "required": [
    "uuid",
    "firstName",
    "lastName",
    "login",
    "email",
    "avatarURL"
  ]
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|uuid|string|true|none|User id|
|firstName|string|true|none|User first name|
|lastName|string|true|none|User last name|
|login|string|true|none|User login|
|email|string|true|none|User email|
|avatarURL|string|true|none|User avatar url|

<h2 id="tocS_UpdateUserDto">UpdateUserDto</h2>
<!-- backwards compatibility -->
<a id="schemaupdateuserdto"></a>
<a id="schema_UpdateUserDto"></a>
<a id="tocSupdateuserdto"></a>
<a id="tocsupdateuserdto"></a>

```json
{
  "type": "object",
  "properties": {
    "firstName": {
      "type": "string",
      "description": "User first name ( from 1 to 20 symbols )",
      "example": "Evgeny"
    },
    "lastName": {
      "type": "string",
      "description": "User last name ( from 1 to 20 symbols )",
      "example": "Smirnov"
    },
    "login": {
      "type": "string",
      "description": "User login ( from 3 to 24 symbols )",
      "example": "nodewalker"
    },
    "email": {
      "type": "string",
      "description": "User email",
      "example": "nodewalker@yandex.com"
    },
    "avatar": {
      "type": "string",
      "format": "binary",
      "description": "User avatar"
    }
  }
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|firstName|string|false|none|User first name ( from 1 to 20 symbols )|
|lastName|string|false|none|User last name ( from 1 to 20 symbols )|
|login|string|false|none|User login ( from 3 to 24 symbols )|
|email|string|false|none|User email|
|avatar|string(binary)|false|none|User avatar|

<h2 id="tocS_UpdateUserPasswordDto">UpdateUserPasswordDto</h2>
<!-- backwards compatibility -->
<a id="schemaupdateuserpassworddto"></a>
<a id="schema_UpdateUserPasswordDto"></a>
<a id="tocSupdateuserpassworddto"></a>
<a id="tocsupdateuserpassworddto"></a>

```json
{
  "type": "object",
  "properties": {
    "currentPassword": {
      "type": "string",
      "description": "User old password ( from 8 to 32 symbols )",
      "example": "**********"
    },
    "newPassword": {
      "type": "string",
      "description": "User new password ( from 8 to 32 symbols )",
      "example": "**********"
    },
    "repeatNewPassword": {
      "type": "string",
      "description": "Repeat new password ( from 8 to 32 symbols )",
      "example": "**********"
    }
  },
  "required": [
    "currentPassword",
    "newPassword",
    "repeatNewPassword"
  ]
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|currentPassword|string|true|none|User old password ( from 8 to 32 symbols )|
|newPassword|string|true|none|User new password ( from 8 to 32 symbols )|
|repeatNewPassword|string|true|none|Repeat new password ( from 8 to 32 symbols )|

<h2 id="tocS_ProductImageEntity">ProductImageEntity</h2>
<!-- backwards compatibility -->
<a id="schemaproductimageentity"></a>
<a id="schema_ProductImageEntity"></a>
<a id="tocSproductimageentity"></a>
<a id="tocsproductimageentity"></a>

```json
{
  "type": "object",
  "properties": {
    "uuid": {
      "type": "string",
      "description": "Image url"
    }
  },
  "required": [
    "uuid"
  ]
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|uuid|string|true|none|Image url|

<h2 id="tocS_CategoryDetails">CategoryDetails</h2>
<!-- backwards compatibility -->
<a id="schemacategorydetails"></a>
<a id="schema_CategoryDetails"></a>
<a id="tocScategorydetails"></a>
<a id="tocscategorydetails"></a>

```json
{
  "type": "object",
  "properties": {
    "uuid": {
      "type": "string",
      "description": "Category id"
    },
    "name": {
      "type": "string",
      "description": "Category name"
    },
    "hasChildren": {
      "type": "boolean",
      "description": "Is category has children"
    },
    "hasProduct": {
      "type": "boolean",
      "description": "Is category has product"
    }
  },
  "required": [
    "uuid",
    "name"
  ]
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|uuid|string|true|none|Category id|
|name|string|true|none|Category name|
|hasChildren|boolean|false|none|Is category has children|
|hasProduct|boolean|false|none|Is category has product|

<h2 id="tocS_ProductDetails">ProductDetails</h2>
<!-- backwards compatibility -->
<a id="schemaproductdetails"></a>
<a id="schema_ProductDetails"></a>
<a id="tocSproductdetails"></a>
<a id="tocsproductdetails"></a>

```json
{
  "type": "object",
  "properties": {
    "uuid": {
      "type": "string",
      "description": "Product id"
    },
    "name": {
      "type": "string",
      "description": "Product name"
    },
    "price": {
      "type": "string",
      "description": "Product price"
    },
    "discount": {
      "type": "string",
      "description": "Product discount"
    },
    "images": {
      "description": "Product images",
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "uuid": {
            "type": "string",
            "description": "Image url"
          }
        },
        "required": [
          "uuid"
        ]
      }
    },
    "category": {
      "description": "Product category",
      "allOf": [
        {
          "type": "object",
          "properties": {
            "uuid": {
              "type": "string",
              "description": "Category id"
            },
            "name": {
              "type": "string",
              "description": "Category name"
            },
            "hasChildren": {
              "type": "boolean",
              "description": "Is category has children"
            },
            "hasProduct": {
              "type": "boolean",
              "description": "Is category has product"
            }
          },
          "required": [
            "uuid",
            "name"
          ]
        }
      ]
    }
  },
  "required": [
    "uuid",
    "name",
    "price",
    "discount",
    "images",
    "category"
  ]
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|uuid|string|true|none|Product id|
|name|string|true|none|Product name|
|price|string|true|none|Product price|
|discount|string|true|none|Product discount|
|images|[[ProductImageEntity](#schemaproductimageentity)]|true|none|Product images|
|category|[CategoryDetails](#schemacategorydetails)|true|none|Product category|

<h2 id="tocS_CartDetails">CartDetails</h2>
<!-- backwards compatibility -->
<a id="schemacartdetails"></a>
<a id="schema_CartDetails"></a>
<a id="tocScartdetails"></a>
<a id="tocscartdetails"></a>

```json
{
  "type": "object",
  "properties": {
    "uuid": {
      "type": "string",
      "description": "Cart id"
    },
    "products": {
      "description": "Products from cart",
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "uuid": {
            "type": "string",
            "description": "Product id"
          },
          "name": {
            "type": "string",
            "description": "Product name"
          },
          "price": {
            "type": "string",
            "description": "Product price"
          },
          "discount": {
            "type": "string",
            "description": "Product discount"
          },
          "images": {
            "description": "Product images",
            "type": "array",
            "items": {
              "type": "object",
              "properties": {
                "uuid": {
                  "type": "string",
                  "description": "Image url"
                }
              },
              "required": [
                "uuid"
              ]
            }
          },
          "category": {
            "description": "Product category",
            "allOf": [
              {
                "type": "object",
                "properties": {
                  "uuid": {
                    "type": "string",
                    "description": "Category id"
                  },
                  "name": {
                    "type": "string",
                    "description": "Category name"
                  },
                  "hasChildren": {
                    "type": "boolean",
                    "description": "Is category has children"
                  },
                  "hasProduct": {
                    "type": "boolean",
                    "description": "Is category has product"
                  }
                },
                "required": [
                  "uuid",
                  "name"
                ]
              }
            ]
          }
        },
        "required": [
          "uuid",
          "name",
          "price",
          "discount",
          "images",
          "category"
        ]
      }
    }
  },
  "required": [
    "uuid",
    "products"
  ]
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|uuid|string|true|none|Cart id|
|products|[[ProductDetails](#schemaproductdetails)]|true|none|Products from cart|

<h2 id="tocS_CreateUserDto">CreateUserDto</h2>
<!-- backwards compatibility -->
<a id="schemacreateuserdto"></a>
<a id="schema_CreateUserDto"></a>
<a id="tocScreateuserdto"></a>
<a id="tocscreateuserdto"></a>

```json
{
  "type": "object",
  "properties": {
    "firstName": {
      "type": "string",
      "description": "User first name ( from 1 to 20 symbols )",
      "example": "Evgeny"
    },
    "lastName": {
      "type": "string",
      "description": "User last name ( from 1 to 20 symbols )",
      "example": "Smirnov"
    },
    "login": {
      "type": "string",
      "description": "User login ( from 3 to 24 symbols )",
      "example": "nodewalker"
    },
    "email": {
      "type": "string",
      "description": "User email",
      "example": "nodewalker@yandex.com"
    },
    "password": {
      "type": "string",
      "description": "User password ( from 8 to 32 symbols )",
      "example": "**********"
    }
  },
  "required": [
    "firstName",
    "lastName",
    "login",
    "email",
    "password"
  ]
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

<h2 id="tocS_TokensDetails">TokensDetails</h2>
<!-- backwards compatibility -->
<a id="schematokensdetails"></a>
<a id="schema_TokensDetails"></a>
<a id="tocStokensdetails"></a>
<a id="tocstokensdetails"></a>

```json
{
  "type": "object",
  "properties": {
    "access_token": {
      "type": "string",
      "description": "access token"
    },
    "refresh_token": {
      "type": "string",
      "description": "refresh token"
    }
  },
  "required": [
    "access_token",
    "refresh_token"
  ]
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|access_token|string|true|none|access token|
|refresh_token|string|true|none|refresh token|

<h2 id="tocS_LoginDto">LoginDto</h2>
<!-- backwards compatibility -->
<a id="schemalogindto"></a>
<a id="schema_LoginDto"></a>
<a id="tocSlogindto"></a>
<a id="tocslogindto"></a>

```json
{
  "type": "object",
  "properties": {
    "login": {
      "type": "string",
      "description": "User login ( from 3 to 24 symbols )",
      "example": "nodewalker"
    },
    "password": {
      "type": "string",
      "description": "User password ( from 8 to 32 symbols )",
      "example": "**********"
    }
  },
  "required": [
    "login",
    "password"
  ]
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|login|string|true|none|User login ( from 3 to 24 symbols )|
|password|string|true|none|User password ( from 8 to 32 symbols )|

<h2 id="tocS_PaginationDetails">PaginationDetails</h2>
<!-- backwards compatibility -->
<a id="schemapaginationdetails"></a>
<a id="schema_PaginationDetails"></a>
<a id="tocSpaginationdetails"></a>
<a id="tocspaginationdetails"></a>

```json
{
  "type": "object",
  "properties": {
    "total": {
      "type": "number",
      "description": "Total items"
    },
    "page": {
      "type": "number",
      "description": "Current page"
    },
    "limit": {
      "type": "number",
      "description": "Current limit"
    },
    "totalPage": {
      "type": "number",
      "description": "Total page count"
    },
    "isLastPage": {
      "type": "boolean",
      "description": "is last page?"
    }
  },
  "required": [
    "total",
    "page",
    "limit",
    "totalPage",
    "isLastPage"
  ]
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|total|number|true|none|Total items|
|page|number|true|none|Current page|
|limit|number|true|none|Current limit|
|totalPage|number|true|none|Total page count|
|isLastPage|boolean|true|none|is last page?|

<h2 id="tocS_ProductsListDetails">ProductsListDetails</h2>
<!-- backwards compatibility -->
<a id="schemaproductslistdetails"></a>
<a id="schema_ProductsListDetails"></a>
<a id="tocSproductslistdetails"></a>
<a id="tocsproductslistdetails"></a>

```json
{
  "type": "object",
  "properties": {
    "data": {
      "description": "Product list",
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "uuid": {
            "type": "string",
            "description": "Product id"
          },
          "name": {
            "type": "string",
            "description": "Product name"
          },
          "price": {
            "type": "string",
            "description": "Product price"
          },
          "discount": {
            "type": "string",
            "description": "Product discount"
          },
          "images": {
            "description": "Product images",
            "type": "array",
            "items": {
              "type": "object",
              "properties": {
                "uuid": {
                  "type": "string",
                  "description": "Image url"
                }
              },
              "required": [
                "uuid"
              ]
            }
          },
          "category": {
            "description": "Product category",
            "allOf": [
              {
                "type": "object",
                "properties": {
                  "uuid": {
                    "type": "string",
                    "description": "Category id"
                  },
                  "name": {
                    "type": "string",
                    "description": "Category name"
                  },
                  "hasChildren": {
                    "type": "boolean",
                    "description": "Is category has children"
                  },
                  "hasProduct": {
                    "type": "boolean",
                    "description": "Is category has product"
                  }
                },
                "required": [
                  "uuid",
                  "name"
                ]
              }
            ]
          }
        },
        "required": [
          "uuid",
          "name",
          "price",
          "discount",
          "images",
          "category"
        ]
      }
    },
    "pagintaion": {
      "description": "Paggination info",
      "allOf": [
        {
          "type": "object",
          "properties": {
            "total": {
              "type": "number",
              "description": "Total items"
            },
            "page": {
              "type": "number",
              "description": "Current page"
            },
            "limit": {
              "type": "number",
              "description": "Current limit"
            },
            "totalPage": {
              "type": "number",
              "description": "Total page count"
            },
            "isLastPage": {
              "type": "boolean",
              "description": "is last page?"
            }
          },
          "required": [
            "total",
            "page",
            "limit",
            "totalPage",
            "isLastPage"
          ]
        }
      ]
    }
  },
  "required": [
    "data",
    "pagintaion"
  ]
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|data|[[ProductDetails](#schemaproductdetails)]|true|none|Product list|
|pagintaion|[PaginationDetails](#schemapaginationdetails)|true|none|Paggination info|

<h2 id="tocS_CreateProductDto">CreateProductDto</h2>
<!-- backwards compatibility -->
<a id="schemacreateproductdto"></a>
<a id="schema_CreateProductDto"></a>
<a id="tocScreateproductdto"></a>
<a id="tocscreateproductdto"></a>

```json
{
  "type": "object",
  "properties": {
    "name": {
      "type": "string",
      "description": "Name of product ( from 2 to 50 symbols )",
      "example": "New Balance 1906"
    },
    "price": {
      "type": "number",
      "description": "Price of product ( min 1 )",
      "example": 1000
    },
    "categoryId": {
      "type": "string",
      "description": "Category id"
    },
    "discount": {
      "type": "number",
      "description": "Discount of product ( from 0 to 100 )",
      "default": 0,
      "example": 25
    },
    "images": {
      "type": "array",
      "items": {
        "type": "string",
        "format": "binary"
      },
      "description": "Product images",
      "minItems": 1,
      "maxItems": 3
    }
  },
  "required": [
    "name",
    "price",
    "categoryId",
    "discount",
    "images"
  ]
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|name|string|true|none|Name of product ( from 2 to 50 symbols )|
|price|number|true|none|Price of product ( min 1 )|
|categoryId|string|true|none|Category id|
|discount|number|true|none|Discount of product ( from 0 to 100 )|
|images|[string]|true|none|Product images|

<h2 id="tocS_CreateCategoryDto">CreateCategoryDto</h2>
<!-- backwards compatibility -->
<a id="schemacreatecategorydto"></a>
<a id="schema_CreateCategoryDto"></a>
<a id="tocScreatecategorydto"></a>
<a id="tocscreatecategorydto"></a>

```json
{
  "type": "object",
  "properties": {
    "name": {
      "type": "string",
      "description": "Name of category ( from 2 to 50 symbols )",
      "example": "Shoes"
    },
    "parentId": {
      "type": "string",
      "description": "Parent category id"
    }
  },
  "required": [
    "name"
  ]
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|name|string|true|none|Name of category ( from 2 to 50 symbols )|
|parentId|string|false|none|Parent category id|

<h2 id="tocS_RootCategoriesDetail">RootCategoriesDetail</h2>
<!-- backwards compatibility -->
<a id="schemarootcategoriesdetail"></a>
<a id="schema_RootCategoriesDetail"></a>
<a id="tocSrootcategoriesdetail"></a>
<a id="tocsrootcategoriesdetail"></a>

```json
{
  "type": "object",
  "properties": {
    "tree": {
      "description": "Root categories tree",
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "uuid": {
            "type": "string",
            "description": "Category id"
          },
          "name": {
            "type": "string",
            "description": "Category name"
          },
          "hasChildren": {
            "type": "boolean",
            "description": "Is category has children"
          },
          "hasProduct": {
            "type": "boolean",
            "description": "Is category has product"
          }
        },
        "required": [
          "uuid",
          "name"
        ]
      }
    },
    "pagination": {
      "description": "Paggination info",
      "allOf": [
        {
          "type": "object",
          "properties": {
            "total": {
              "type": "number",
              "description": "Total items"
            },
            "page": {
              "type": "number",
              "description": "Current page"
            },
            "limit": {
              "type": "number",
              "description": "Current limit"
            },
            "totalPage": {
              "type": "number",
              "description": "Total page count"
            },
            "isLastPage": {
              "type": "boolean",
              "description": "is last page?"
            }
          },
          "required": [
            "total",
            "page",
            "limit",
            "totalPage",
            "isLastPage"
          ]
        }
      ]
    }
  },
  "required": [
    "tree",
    "pagination"
  ]
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|tree|[[CategoryDetails](#schemacategorydetails)]|true|none|Root categories tree|
|pagination|[PaginationDetails](#schemapaginationdetails)|true|none|Paggination info|

