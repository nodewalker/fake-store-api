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

