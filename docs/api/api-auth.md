---
title: Auth Store API v1.0
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
<h1 id="fake-store-api-auth">Auth</h1>

## User registration

<a id="opIdAuthController_signup"></a>

> Code samples

```javascript
const data = JSON.stringify({
  firstName: 'Evgeny',
  lastName: 'Smirnov',
  login: 'nodewalker',
  email: 'nodewalker@yandex.com',
  password: '**********',
});

const xhr = new XMLHttpRequest();
xhr.withCredentials = true;

xhr.addEventListener('readystatechange', function () {
  if (this.readyState === this.DONE) {
    console.log(this.responseText);
  }
});

xhr.open('POST', 'https://example.com/auth/signup');
xhr.setRequestHeader('Content-Type', 'application/json');
xhr.setRequestHeader('Accept', 'application/json');

xhr.send(data);
```

`POST /auth/signup`

> Body parameter

```json
{
  "firstName": "Evgeny",
  "lastName": "Smirnov",
  "login": "nodewalker",
  "email": "nodewalker@yandex.com",
  "password": "**********"
}
```

<h3 id="user-registration-parameters">Parameters</h3>

| Name | In   | Type                                        | Required | Description |
| ---- | ---- | ------------------------------------------- | -------- | ----------- |
| body | body | [CreateUserDto](../models/CreateUserDto.md) | true     | none        |

> Example responses

> 200 Response

```json
{
  "access_token": "string",
  "refresh_token": "string"
}
```

<h3 id="user-registration-responses">Responses</h3>

| Status | Meaning                                                 | Description             | Schema                                      |
| ------ | ------------------------------------------------------- | ----------------------- | ------------------------------------------- |
| 200    | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | User registered success | [TokensDetails](../models/TokensDetails.md) |
| 5XX    | Unknown                                                 | Server error            | None                                        |
| 4XX    | Unknown                                                 | Check response message  | None                                        |

<aside class="success">
This operation does not require authentication
</aside>

## User login

<a id="opIdAuthController_signin"></a>

> Code samples

```javascript
const data = JSON.stringify({
  login: 'nodewalker',
  password: '**********',
});

const xhr = new XMLHttpRequest();
xhr.withCredentials = true;

xhr.addEventListener('readystatechange', function () {
  if (this.readyState === this.DONE) {
    console.log(this.responseText);
  }
});

xhr.open('POST', 'https://example.com/auth/signin');
xhr.setRequestHeader('Content-Type', 'application/json');
xhr.setRequestHeader('Accept', 'application/json');

xhr.send(data);
```

`POST /auth/signin`

> Body parameter

```json
{
  "login": "nodewalker",
  "password": "**********"
}
```

<h3 id="user-login-parameters">Parameters</h3>

| Name | In   | Type                              | Required | Description |
| ---- | ---- | --------------------------------- | -------- | ----------- |
| body | body | [LoginDto](../models/LoginDto.md) | true     | none        |

> Example responses

> 200 Response

```json
{
  "access_token": "string",
  "refresh_token": "string"
}
```

<h3 id="user-login-responses">Responses</h3>

| Status | Meaning                                                 | Description            | Schema                                      |
| ------ | ------------------------------------------------------- | ---------------------- | ------------------------------------------- |
| 200    | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | User login success     | [TokensDetails](../models/TokensDetails.md) |
| 5XX    | Unknown                                                 | Server error           | None                                        |
| 4XX    | Unknown                                                 | Check response message | None                                        |

<aside class="success">
This operation does not require authentication
</aside>

## Refresh auth tokens

<a id="opIdAuthController_refresh"></a>

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

xhr.open('POST', 'https://example.com/auth/refresh?rt=string');
xhr.setRequestHeader('Accept', 'application/json');

xhr.send(data);
```

`POST /auth/refresh`

<h3 id="refresh-auth-tokens-parameters">Parameters</h3>

| Name | In    | Type   | Required | Description   |
| ---- | ----- | ------ | -------- | ------------- |
| rt   | query | string | true     | Refresh token |

> Example responses

> 200 Response

```json
{
  "access_token": "string",
  "refresh_token": "string"
}
```

<h3 id="refresh-auth-tokens-responses">Responses</h3>

| Status | Meaning                                                 | Description            | Schema                                      |
| ------ | ------------------------------------------------------- | ---------------------- | ------------------------------------------- |
| 200    | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | Refresh tokens success | [TokensDetails](../models/TokensDetails.md) |
| 5XX    | Unknown                                                 | Server error           | None                                        |
| 4XX    | Unknown                                                 | Check response message | None                                        |

<aside class="success">
This operation does not require authentication
</aside>
