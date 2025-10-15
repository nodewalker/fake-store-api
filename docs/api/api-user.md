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
  "uuid": "string",
  "firstName": "string",
  "lastName": "string",
  "login": "string",
  "email": "string",
  "avatarURL": "string"
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
  "firstName": "Evgeny",
  "lastName": "Smirnov",
  "login": "nodewalker",
  "email": "nodewalker@yandex.com",
  "avatar": "string"
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
  "firstName": "Evgeny",
  "lastName": "Smirnov",
  "login": "nodewalker",
  "email": "nodewalker@yandex.com",
  "avatar": "string"
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
  "currentPassword": "**********",
  "newPassword": "**********",
  "repeatNewPassword": "**********"
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
  "currentPassword": "**********",
  "newPassword": "**********",
  "repeatNewPassword": "**********"
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

# Schemas

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

<h2 id="tocS_TokensDetails">TokensDetails</h2>
<!-- backwards compatibility -->
<a id="schematokensdetails"></a>
<a id="schema_TokensDetails"></a>
<a id="tocStokensdetails"></a>
<a id="tocstokensdetails"></a>

```json
{
  "access_token": "string",
  "refresh_token": "string"
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
  "login": "nodewalker",
  "password": "**********"
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|login|string|true|none|User login ( from 3 to 24 symbols )|
|password|string|true|none|User password ( from 8 to 32 symbols )|

<h2 id="tocS_ProductImageEntity">ProductImageEntity</h2>
<!-- backwards compatibility -->
<a id="schemaproductimageentity"></a>
<a id="schema_ProductImageEntity"></a>
<a id="tocSproductimageentity"></a>
<a id="tocsproductimageentity"></a>

```json
{
  "uuid": "string"
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
  "uuid": "string",
  "name": "string",
  "hasChildren": true,
  "hasProduct": true
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

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|uuid|string|true|none|Product id|
|name|string|true|none|Product name|
|price|string|true|none|Product price|
|discount|string|true|none|Product discount|
|images|[[ProductImageEntity](#schemaproductimageentity)]|true|none|Product images|
|category|[CategoryDetails](#schemacategorydetails)|true|none|Product category|

<h2 id="tocS_PaginationDetails">PaginationDetails</h2>
<!-- backwards compatibility -->
<a id="schemapaginationdetails"></a>
<a id="schema_PaginationDetails"></a>
<a id="tocSpaginationdetails"></a>
<a id="tocspaginationdetails"></a>

```json
{
  "total": 0,
  "page": 0,
  "limit": 0,
  "totalPage": 0,
  "isLastPage": true
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
  "name": "New Balance 1906",
  "price": 1000,
  "categoryId": "string",
  "discount": 25,
  "images": [
    "string"
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
  "name": "Shoes",
  "parentId": "string"
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

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|tree|[[CategoryDetails](#schemacategorydetails)]|true|none|Root categories tree|
|pagination|[PaginationDetails](#schemapaginationdetails)|true|none|Paggination info|

<h2 id="tocS_ReturnUserProfileDetails">ReturnUserProfileDetails</h2>
<!-- backwards compatibility -->
<a id="schemareturnuserprofiledetails"></a>
<a id="schema_ReturnUserProfileDetails"></a>
<a id="tocSreturnuserprofiledetails"></a>
<a id="tocsreturnuserprofiledetails"></a>

```json
{
  "uuid": "string",
  "firstName": "string",
  "lastName": "string",
  "login": "string",
  "email": "string",
  "avatarURL": "string"
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
  "firstName": "Evgeny",
  "lastName": "Smirnov",
  "login": "nodewalker",
  "email": "nodewalker@yandex.com",
  "avatar": "string"
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
  "currentPassword": "**********",
  "newPassword": "**********",
  "repeatNewPassword": "**********"
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|currentPassword|string|true|none|User old password ( from 8 to 32 symbols )|
|newPassword|string|true|none|User new password ( from 8 to 32 symbols )|
|repeatNewPassword|string|true|none|Repeat new password ( from 8 to 32 symbols )|

<h2 id="tocS_CartDetails">CartDetails</h2>
<!-- backwards compatibility -->
<a id="schemacartdetails"></a>
<a id="schema_CartDetails"></a>
<a id="tocScartdetails"></a>
<a id="tocscartdetails"></a>

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
        "name": "string",
        "hasChildren": true,
        "hasProduct": true
      }
    }
  ]
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|uuid|string|true|none|Cart id|
|products|[[ProductDetails](#schemaproductdetails)]|true|none|Products from cart|

