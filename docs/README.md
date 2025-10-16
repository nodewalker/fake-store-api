---
title: Docs
search: true
---

<h1 id="fake-store-api">Fake Store API v1.0</h1>

> Scroll down for code samples, example requests and responses. Select a language for code samples from the tabs above or the mobile navigation menu.

Welcome to the **Fake Store API** documentation.  
A simple REST API that simulates an online store — provides fake products, categories, and users for testing, prototyping, and learning purposes.

Base URLs:

    api.fakestoreapi.ru

# Authentication

- HTTP Authentication, scheme: bearer

---

The API provides functionality for:

- User authentication (`Auth`)
- User (`User`)
- Products (`Products`)
- Categories (`Categories`)
- Cart (`Cart`)

> Use the sidebar to navigate to the desired API section.  
> Each section corresponds to an `@ApiTags` tag in the NestJS controllers.

## How to Use the Documentation

1. Select the desired section from the sidebar.
2. View the list of endpoints and their descriptions.
3. For each endpoint, examples of requests and responses are available in **JavaScript** and **TypeScript**.
4. All fields and object structures are documented through DTOs and `@ApiProperty` decorators.

## Project Purpose

The Fake Store API is designed for testing and learning:

- Can be used for frontend development without a custom backend
- A great base for learning NestJS, Swagger, TypeORM, and GitBook integration

---

> Automatically generated using NestJS + Swagger + Widdershins
