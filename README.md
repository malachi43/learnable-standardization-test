# Project Name

KRYPTONIAN APP

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
  - [Installation](#installation)
  - [Configuration](#configuration)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Deployment](#deployment)

## Introduction

KRYPTONIAN APP is an API that can be used with any type of front end project that needs basic 2FA(2-Factor Authentication). The data are returned in JSON format.

Feel free to enjoy it in your awesome projects!

This API was written using javascript.

## Features

The KRYPTONIAN APP provide the following functionalites:
- file upload with an API key without an auth token.
- images stored in base64 format.
- register a user with email verification.
- login a user using OTP (One Time Password) sent via email.
- API keys generation.
- API keys invalidation.
- use of token.

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
Copy code
cd project
npm install
npm run start:dev
```

## Configuration

Create a .env file in the root directory of your project:

```bash
Copy code
MONGO_URI="your mongodb connection string"
JWT_SECRET="your secret"
NODEMAILER_PASS="your passkey"
NODEMAILER_USER="your email"
NODEMAILER_SERVICE="your service provider"
```

## Usage

See [documentation here]()
