# SMS Management Application API

[![Build Status](https://travis-ci.org/pluwum/sms-mgt-api.svg?branch=master)](https://travis-ci.org/pluwum/sms-mgt-api) [![Coverage Status](https://coveralls.io/repos/github/pluwum/sms-mgt-api/badge.svg?branch=master)](https://coveralls.io/github/pluwum/sms-mgt-api?branch=master)

## What does it do

The application mocks sending and receiving of SMS

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

## Endpoints

| Method | Endpoint | Headers                        | Usage |
| ------ | -------- | ------------------------------ | ----- |
| POST   | /contact | Content-Type →application/json |

payload

    {
        "name": "eeee",
        "phoneNumber": "0774644189",
        "passCode": "12345"
    }

returns

    {
        "success": true,
        "data": {
            "_id": "5c161958bcaf48e17ca22c75",
            "name": "eeee",
            "phoneNumber": "0774644182",
            "passCode": "12345",
            "created": "2018-12-16T09:22:32.976Z",
            "__v": 0
        },
        "message": "Contact created successfully"
    }

## Testing

The application's tests can be executed by running the code below within the terminal at the application root directory:

```

yarn test

```
