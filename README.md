# Project Name

KRYPTONIAN APP

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
  - [Installation](#installation)
  - [Configuration](#configuration)
- [API Endpoints](#api-endpoints)
- [Documentation](#documentation)

## Introduction

KRYPTONIAN APP is an API that can be used with any type of front end project that needs basic 2FA (2-Factor Authentication) with file upload (images only) functionality. The data are returned in JSON format.

Feel free to enjoy it in your awesome projects!

This API was written using javascript.

## Features

The KRYPTONIAN APP provide the following functionalites:
- file upload using an API key only.
- images are stored in base64 format.
- register a user with email verification.
- login a user using OTP (One Time Password) sent via email.
- use of authentication token to generate api key.
- api key invalidation.


## Prerequisites

List of software and tools required to run your project.

- Node.js
- MongoDB
- Postman (optional, for testing API endpoints)

## Getting Started

You need to have node js installed. [For installation visit the guide](https://nodejs.org/en/download). The follow the guide thereafter.

### Installation

1. Clone the repository:

   ```bash
   git clone <git@github.com:malachi43/learnable-standardization-test.git>
   ```

## Install dependencies:

```bash
npm install
npm run start:dev
```

## Configuration

Create a .env file in the root directory of your project:

```bash
MONGO_URI="your mongodb connection string"
JWT_SECRET="your secret"
NODEMAILER_PASS="your passkey"
NODEMAILER_USER="your email to send messages from"
NODEMAILER_SERVICE="your service provider, e.g gmail"
```
## API ENDPOINTS
- Endpoint: https://learnable-standardization-test.onrender.com/api/v1/register [ REGISTER A USER ]  METHOD => POST.
- Endpoint: https://learnable-standardization-test.onrender.com/api/v1/login/otp [ GENERATE TOKEN FOR USER ]  METHOD => POST
- Endpoint: https://learnable-standardization-test.onrender.com/api/v1/images [ RETRIEVE ALL UPLOADED USER IMAGES ]  METHOD => GET
- Endpoint: https://learnable-standardization-test.onrender.com/api/v1/images/{id} [ RETRIEVE A SPECIFIC UPLOADED USER IMAGE ]  METHOD => GET
- Endpoint: https://learnable-standardization-test.onrender.com/api/v1/api-key [ GENERATE API-KEY FOR USER ]  METHOD => GET
- Endpoint: https://learnable-standardization-test.onrender.com/api/v1/api-key/invalidate [ INVALIDATE USER API-KEY ]  METHOD => GET
- Endpoint: https://learnable-standardization-test.onrender.com/api/v1/uploads [ UPLOADS USER FILE TO SERVER ]  METHOD => POST  NOTE: The "form" html tag must have the enctype="multipart/form-data" attribute and name attribute should be name="image_file"

## Documentation

See [documentation here](https://documenter.getpostman.com/view/23505718/2sA3QwbVKZ)
