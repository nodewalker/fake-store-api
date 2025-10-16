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

