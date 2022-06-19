
# Express app

API for hospital, where patients can be registered



## Run Locally

Clone the project

```bash
  git clone https://github.com/abhinav-root/abhinav_NodejsTask
```

Go to the project directory

```bash
  cd my-project
```

Install dependencies

```bash
  npm install
```

Set environment variables: see example.env

Start the server

```bash
  npm run start
```

## Tech used

* Express.JS for building API
* MySQL database 
* express-validator for validating API request 
* Sequelizee - Very popular JS ORM
* bcrypt for hashing passwords
* jsonwebtoken for authentication
* faker.js for seeding

## API
This Express app  is deployed at: **52.91.196.16**

### Postman collection Link: 
[Link](https://www.getpostman.com/collections/784af94ea0792f0b277d)	(*import via JSON link*)


baseUrl: **52.91.196.16/api/v1**

### Patients
*Get patient by Id*
```bash
 GET {{baseUrl}}/patients/:patiendId
```

*Register patient*
```bash
POST {{baseUrl}}/patients
```

```bash
{
'name': 'patient'
'address': 'House 123 Sector 45'
'email': `patient5@gmail.com`
'phone': `+91-1111122222`
'password': `pass@123`
'psychiatristId': 81
}
```

*Delete patient by id*
```bash
DELETE {{baseUrl}}/patients/:patiendId
```


### Psychiatrists


*Register psychiatrist*
```bash
POST {{baseUrl}}/psychiatrists
```

```bash
{
    "firstName": "Amit",
    "lastName": "sharma",
    "hospital": "Apollo Hospitals",
    "phone": "+91-5555566661",
    "pincode": null,
    "state": "Delhi"
}
````

*Get all patients of psychiatrist*
```bash
GET {{baseUrl}}/psychiatrists/:psychiatristId/patients
```

*Get patients count for each psychiatrist*
```
GET {{baseUrl}}/psychiatrists
````
