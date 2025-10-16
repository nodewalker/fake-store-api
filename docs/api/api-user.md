---
title: User
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
<h1 id="fake-store-api-user">User</h1>

## Get user info

<a id="opIdUserController_getUserProfile"></a>

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

xhr.open('GET', 'https://example.com/user');
xhr.setRequestHeader('Accept', 'application/json');
xhr.setRequestHeader('Authorization', 'Bearer {access-token}');

xhr.send(data);
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

| Status | Meaning                                                 | Description            | Schema                                                            |
| ------ | ------------------------------------------------------- | ---------------------- | ----------------------------------------------------------------- |
| 200    | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | User info recived      | [ReturnUserProfileDetails](../models/ReturnUserProfileDetails.md) |
| 5XX    | Unknown                                                 | Server error           | None                                                              |
| 4XX    | Unknown                                                 | Check response message | None                                                              |

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearer
</aside>

## Update user info

<a id="opIdUserController_updateUser"></a>

> Code samples

```javascript
const data = JSON.stringify({
  firstName: 'Evgeny',
  lastName: 'Smirnov',
  login: 'nodewalker',
  email: 'nodewalker@yandex.com',
  avatar: 'string',
});

const xhr = new XMLHttpRequest();
xhr.withCredentials = true;

xhr.addEventListener('readystatechange', function () {
  if (this.readyState === this.DONE) {
    console.log(this.responseText);
  }
});

xhr.open('PATCH', 'https://example.com/user');
xhr.setRequestHeader('Content-Type', 'application/json');
xhr.setRequestHeader('Authorization', 'Bearer {access-token}');

xhr.send(data);
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

| Name | In   | Type                                        | Required | Description |
| ---- | ---- | ------------------------------------------- | -------- | ----------- |
| body | body | [UpdateUserDto](../models/UpdateUserDto.md) | true     | none        |

<h3 id="update-user-info-responses">Responses</h3>

| Status | Meaning                                                 | Description            | Schema |
| ------ | ------------------------------------------------------- | ---------------------- | ------ |
| 200    | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | User info updated      | None   |
| 5XX    | Unknown                                                 | Server error           | None   |
| 4XX    | Unknown                                                 | Check response message | None   |

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearer
</aside>

## Update user password

<a id="opIdUserController_updateUserPassword"></a>

> Code samples

```javascript
const data = JSON.stringify({
  currentPassword: '**********',
  newPassword: '**********',
  repeatNewPassword: '**********',
});

const xhr = new XMLHttpRequest();
xhr.withCredentials = true;

xhr.addEventListener('readystatechange', function () {
  if (this.readyState === this.DONE) {
    console.log(this.responseText);
  }
});

xhr.open('PATCH', 'https://example.com/user/password');
xhr.setRequestHeader('Content-Type', 'application/json');
xhr.setRequestHeader('Authorization', 'Bearer {access-token}');

xhr.send(data);
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

| Name | In   | Type                                                        | Required | Description |
| ---- | ---- | ----------------------------------------------------------- | -------- | ----------- |
| body | body | [UpdateUserPasswordDto](../models/UpdateUserPasswordDto.md) | true     | none        |

<h3 id="update-user-password-responses">Responses</h3>

| Status | Meaning                                                 | Description            | Schema |
| ------ | ------------------------------------------------------- | ---------------------- | ------ |
| 200    | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | User password updated  | None   |
| 5XX    | Unknown                                                 | Server error           | None   |
| 4XX    | Unknown                                                 | Check response message | None   |

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearer
</aside>
