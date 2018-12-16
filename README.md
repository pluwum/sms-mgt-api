# SMS Management Application API

[![Build Status](https://travis-ci.org/pluwum/sms-mgt-api.svg?branch=master)](https://travis-ci.org/pluwum/sms-mgt-api) [![Coverage Status](https://coveralls.io/repos/github/pluwum/sms-mgt-api/badge.svg?branch=master)](https://coveralls.io/github/pluwum/sms-mgt-api?branch=master)

## What does it do

SMS Management Application is an API that manages sending and receiving of SMS messages. With this API, you can manage contacts, send SMS, receive SMS, view an SMS and SMS status

## requirements

- [Node (stable)](https://nodejs.org/en/)

- [MongoDB](https://www.mongodb.com/)

- [Postman](https://www.getpostman.com/)

- Some knowledge of terminal

## How to set it up

1. Clone the repository.

```

git clone git@github.com:pluwum/sms-mgt-api.git

```

2. Install the dependencies:

```

yarn install

```

3. Set up some global variables

```

mv .env.example .env

```

4. Start you mongodb service

```

mongod & > /dev/null

```

5. Atlast, you are ready to go

```

yarn start

```

6. you can now access the application using postman

```

http://localhost:3000

```

## Testing

The application's tests can be executed by running the code below within the terminal at the application root directory:

```

yarn test

```

## Endpoints

## _CONTACTS_

#### **_/contact_**

description: Creates a contact
method : POST
headers: content-Type →application/json
sample payload:

    `{
        "name": "eeee",
        "phoneNumber": "0774644189",
        "passCode": "12345"
     }`

#### **_/contact_**

description: Updates user contact information
method : PUT
headers: content-Type →application/json
sample payload:

    `{
        "phoneNumber": "0774644189"
     }`

#### **_/contact_**

description: Retrieves a user's contact information
method : GET
headers: content-Type →application/json
returns:

    `{
    "success": true,
    "data": {
        "_id": "5c155afb60bf0f0518328497",
        "name": "Trizzyn",
        "phoneNumber": "0774644189",
        "passCode": "12345",
        "created": "2018-12-15T19:50:19.775Z",
        "__v": 0
    }

}`

#### **_/contact/:contactId_**

description: Deletes a contact along with sms associated to them
method : DELETE
headers: content-Type →application/json

## _SMS_

#### **_/sms_**

description: Sends an SMS
method : POST
headers: content-Type →application/json
sample payload:

    `{
        "receiver": "5c1337021fbf86ef244f8534",
        "message": "Test massage 3"
    }`

#### **_/sms_**

description: Retrieves all SMS belonging to authenticated user
method : GET
headers: content-Type →application/json
returns:

    `
    `{
        "success": true,
        "data": [
        {
            "status": "sent",
            "_id": "5c162261bcaf48e17ca22c76",
            "sender": "5c155afb60bf0f0518328497",
            "receiver": "5c1337021fbf86ef244f8534",
            "message": "Test massage 3",
            "created": "2018-12-16T10:01:05.372Z",
            "__v": 0
        }
        ],
        "message": "SMS collected succefully"
    }`

#### **_/sms_**

description: Updates an SMS
method : PUT
headers: content-Type →application/json
sample payload:

    `{
        "status": "delivered"
    }`

#### **_/sms/:smsId_**

description: Retrieves SMS associated with the ID

method : GET
headers: content-Type →application/json
returns:

    `
    `{
            "status": "sent",
            "_id": "5c162261bcaf48e17ca22c76",
            "sender": "5c155afb60bf0f0518328497",
            "receiver": "5c1337021fbf86ef244f8534",
            "message": "Test massage 3",
            "created": "2018-12-16T10:01:05.372Z",
            "__v": 0
    }`

## AUTHENTICATION

#### **_/authenticate_**

description: Log in the user
method : POST
headers: content-Type →application/json
sample payload:

     `{
    	"phoneNumber": "0774644189",
    	"passCode": "12345"
      }`

returns

    {
        "success": true,
        "data": "eyJhpXVCJ9.eyiI6IjFTAxNjkwM30.NP79T474Yqs",
        "message": "Successfully authenticated" }
