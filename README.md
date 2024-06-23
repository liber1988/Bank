# Bank Management System

A simple bank management system built using React and Material-UI. This project allows users to manage bank accounts, perform deposits, withdrawals, and transfers between accounts using unique user IDs.

## Features

- **View Users**: View a table listing all bank users with their details including name, deposit amount, gender, email, credit allowed, age, and passport ID.
- **Add Users**: Add new users to the bank system with profile image, name, initial deposit amount, gender, email, credit limit, age, and passport ID.
- **Delete Users**: Delete users from the bank system.
- **Update Users**: Update user details such as name, deposit amount, gender, email, credit limit, age, and passport ID.
- **Withdraw Money**: Withdraw money from a user's deposit.
- **Transfer Money**: Transfer money between users using their unique passport IDs.

## Technologies Used

- **React**
- **Material-UI**

## Setup Instructions

To run this project locally, follow these steps:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-username/bank-management-system.git
   cd bank-management-system
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Start the development server:**

   ```bash
   npm start
   ```

4. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Folder Structure

```plaintext
bank-management-system/
├── public/           # Static assets and index.html
├── src/              # React application source code
│   ├── components/   # Reusable React components
│   ├── context/      # React context for API and state management
│   ├── pages/        # Main application pages (e.g., Home, Withdraw)
│   ├── App.js        # Main application component
│   └── index.js      # Entry point of the React application
├── .gitignore        # Git ignore file
├── package.json      # Node.js dependencies and scripts
└── README.md         # Project documentation
```
