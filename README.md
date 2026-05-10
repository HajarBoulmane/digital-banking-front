# Digital Banking Frontend

A modern banking web application built with Angular that allows users to manage bank accounts, view transactions, and perform banking operations through a clean and responsive interface.

## 🚀 Tech Stack
- Angular
- TypeScript
- Bootstrap / Angular Material
- RxJS
- REST API
- JWT Authentication

## 📁 Project Structure

```bash
digital-banking-front/
│
├── src/
│   ├── app/
│   │   ├── components/
│   │   ├── services/
│   │   ├── models/
│   │   ├── guards/
│   │   └── interceptors/
│   │
│   ├── assets/
│   └── environments/
│
├── angular.json
├── package.json
└── README.md
✨ Features
User authentication & authorization
Account management
Transaction history
Money transfer operations
Responsive dashboard
Secure API communication
⚙️ Installation
git clone https://github.com/HajarBoulmane/digital-banking-front.git
cd digital-banking-front
npm install
ng serve

Open:

http://localhost:4200
🔗 Backend Configuration

Update the API URL in:

src/environments/environment.ts

Example:

export const environment = {
  production: false,
  apiUrl: 'http://localhost:8085'
};
