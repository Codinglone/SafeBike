# 🏍️ SafeBike Rwanda API 📦

> **Connect, Deliver, Thrive** - A modern package delivery platform for Rwanda 🇷🇼

## 📋 Overview

SafeBike is a revolutionary API that connects passengers who need to send packages with riders who can deliver them. Our platform enables fast, secure, and trackable deliveries across Rwanda with real-time updates and confirmations.

## ✨ Features

- 👤 **User Management**
  - Passenger registration and authentication
  - Rider registration and authentication
  - Profile management

- 📦 **Package Management**
  - Create package delivery requests
  - Track package status
  - Assign packages to riders
  - Confirm pickup and delivery
  - Recipient confirmation

- 🔒 **Security**
  - JWT-based authentication
  - Role-based access control
  - Secure data storage

- 📊 **API Documentation**
  - Comprehensive Swagger documentation
  - Clear endpoint descriptions

## 🛠️ Technologies

- **Backend**: TypeScript, Node.js, Fastify
- **Database**: PostgreSQL
- **ORM**: TypeORM
- **Authentication**: JWT
- **Documentation**: Swagger/OpenAPI

## 🚀 Installation

### Prerequisites

- Node.js (v14+)
- PostgreSQL
- Git

### Setup Instructions

1. **Clone the repository**

```bash
git clone https://github.com/your-username/safebike-rwanda.git
cd safebike-rwanda
```

2. **Install dependencies**

```bash
npm install
```

3. **Set up environment variables**

DB_HOST=localhost
DB_PORT=5432
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_NAME=safebike
PORT=5000
JWT_SECRET=your_jwt_secret
NODE_ENV=development

4. **Start the server**

## Development mode
```
npm run dev

```
# Production mode

npm run build
npm start
```

# 📝 API Documentation
http://localhost:5000/api-docs

# 🔄 Workflow

1. 👤 Passenger creates an account
2. 🏍️ Rider creates an account
3. 📦 Passenger creates a package delivery request
4. 🔍 Rider accepts package delivery
5. 🚚 Rider confirms pickup
6. 🏁 Rider marks delivery as completed
7. ✅ Recipient confirms package receipt

# 🧪 Testing
```
## Run tests

npm test
```

# Run tests with coverage
```
npm run test:coverage


📄 License
This project is licensed under the MIT License - see the LICENSE file for details.

📞 Contact
For any inquiries, please reach out to:

Email: niyokwizerwafabrice250@gmail.com
Linkedin: NIYOKWIZERWA Fabrice
