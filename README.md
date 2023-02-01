# patient_register_ltc

####  Frameworks/Libraries/Packages used
- Express: Used for handling requests, responses, routing, port setting etc.
- bcryptjs: Enables storing of passwords as hashed passwords instead of plaintext.
- body-parser: Extracts the entire body portion of incoming request stream and exposes it on req.body.
- cors: A package used to allow or restrict requested resources depending on from where the request was originated. In our case, we allow requests from all clients.
- express-validator: A middleware used for incoming request data validation and sanitization.
- jsonwebtoken: A package implementing JWT standar for secure data transmission. Generate a token to be used in headers when signing in to allow access to restricted resources.
- mysql2: A MySQL driver, used for connection with msyql database in native JS.
## Postman API Documentation

```http
    https://documenter.getpostman.com/view/22922367/VUqoSKKG
```

## Postman Collection

```http
    https://www.postman.com/dark-escape-962054/workspace/patient-registration-ltc
```

## API Reference

#### Signup a new psychiatrist

```http
  POST /api/psychiatrist/signup
```

| Body Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `psychiatrist_email` | `string` | **Required**.|
| `psychiatrist_password` | `string` | **Required**.|
| `psychiatrist_hospital_id` | `string` | **Required**.|
| `psychiatrist_name` | `string` | **Required**.|

#### Signin as a psychiatrist

```http
  POST /api/psychiatrist/signup
```

| Body Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `psychiatrist_email` | `string` | **Required**.|
| `psychiatrist_password` | `string` | **Required**.|

| Return  | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `token` | `string` | **Signin header token**.|


```http
  POST /api/psychiatrist/auth/patient-signup
```

| Body Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `patient_name` | `string` | **Required**.|
| `patient_address` | `string` | **Required**.|
| `patient_email` | `string` | **Required**.|
| `patient_password` | `string` | **Required**.|
| `patient_phone` | `string` | *Optional*.|
| `patient_photo` | `base 64 image` | **Required**.|

| Headers  | Description                |
| :-------- | :------------------------- |
| `x-access-token`| **Signin header token returned as token during Psychiatrist Signin**.|


```http
  GET /api/hospital/{hospital-id}/full-details
```
| URL Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `hospital-id` | `number` | **Required**.|
