# Lending Service App

Fintech financial app that enable users to lend and
borrow money. Lenders will benefit from a fixed annual yield, whereas borrowers will be
subject to a fixed annual fee.

## Description

This application provides users with a comprehensive overview of their financial activities related to loans. Users can monitor their active loans, check their account balance, view current earned fees, and track outstanding debt.

To include the additional details about the backend handling user requests, user authentication, financial details, loan list, and actions, you can update the description as follows:

## Backend Details

The backend handles user requests and includes the following features:

- User Authentication
- Financial Details
- Loan List including details such as loan status, type (lend or borrow), and actions available to the user, such as withdrawing lent loans or repaying borrowed loans.
- Users can perform actions supplying funds or applying for new loans

## Frontend Details

The frontend allows user to:

- Sign up using email and password
- Supply liquidity to the firm
- Withdraw lent money
- Apply for a loan with collateral
- Repay loans
- Track outstanding debts
- Check current earned fees

## Setup

Get the code by either cloning this repository using git

```
git clone https://github.com/Lazar996F/fintech_lending_service.git
```

... or [downloading source code](https://github.com/Lazar996F/fintech_lending_service/archive/refs/heads/main.zip) code as a zip archive.

Once downloaded, open the terminal in the project directory, and create Docker container

```
docker compose up -d
```

Then navigate to the backend dir, install dependencies and execute command to start the backend

```
cd .\backend\
npm run start:dev
```

🚀 The backend system should now be up and runing at http://localhost:5000

Finaly start the frontend app

```
cd .\frontend\
npm run dev
```

## Tech Stack

- Frontend: React/Next.js, TypeScript, Tailwind CSS
  Backend: Nest.js, Express.js, TypeScript, TypeORM
  Database: PostgreSQL
  Authentication: JWT
  Deployment: Docker
