# Restaurant API Project

## Contributors

- Alan Crisanto
- Alma Benavides
- Armando Kamisaki
- Felipe Belisário
- Jonatan Troche
- Mariana Overbay

## Application Info

### What will the API do?

The API will contain data from a chain of restaurants and allow users to access information on restaurants, orders, clients, staff, and menu.

### How will your API utilize a login system?

The API will implement OAuth using GitHub authentication. Staff can perform operations like POST, PUT, and DELETE for orders, menu items, restaurants, and clients after logging in.

### What database will you use?

The project will utilize MongoDB and have five collections: restaurants, orders, clients, staff, and menu.

### How will the data be stored in your database?

Data will be stored in a JSON format within MongoDB. Operations such as POST, PUT, and DELETE will modify, add, or delete data.

### How would a frontend manage authentication state based on the data provided?

The staff can log in, and managers will have full access to modify, delete, and add data. Authentication will be managed via GitHub, requiring users to provide permission through their accounts.

### What pieces of data in your app will need to be secured?

The API will secure data access by requiring users to be logged in for PUT, POST, and DELETE requests. Validation will be employed, displaying error messages for unauthorized requests.

### File Structure and Program Architecture

The project will follow this file structure:
- `controllers`: handling request logic
- `routes`: containing API endpoints
- `helpers`: validation methods
- `middleware`: authentication and validation files
- `database`: connection file to MongoDB
- `.env`: URI for database connection
- `server.js`: main server file
- `swagger files`: API documentation files
- `package.json`: node project setup

### Potential Stretch Challenges

Implementing Role-Based Access Control (RBAC) for different levels of access and implementing user sign-up verification could be potential stretch challenges.

## API Endpoint Planning

### Restaurant Endpoints

- POST /restaurant
- PUT /restaurant/{restaurantId}
- GET /restaurant/{restaurantId}
- GET /restaurant
- DELETE /restaurant/{restaurantId}

### Clients Endpoints

- GET /client
- POST /client
- PUT /client/{clientId}
- GET /client/{clientId}
- DELETE /client/{orderId}

### Staff Endpoints

- POST /staff
- PUT /staff/{staffId}
- GET /staff/login
- GET /staff/logout
- GET /staff/{staffId}
- PUT /staff/{staffId}
- DELETE /staff/{staffId}

### Order Endpoints

- GET /client/order
- GET /order
- GET /order/{orderId}
- POST /order/
- PUT /order/{orderId}
- DELETE /order/{orderId}

### Menu Endpoints

- POST /menu
- GET /menu
- GET /menu/{menuId}
- PUT /menu/{menuId}
- DELETE /menu/{menuId}

## Project Scheduling and Delegation

### Task Allocation

Tasks will be divided among team members as follows:
- HTTP methods for each collection will be handled by Alan, Alma, Armando, Felipe, and Mariana.
- Node.js project creation and MongoDB setup will be handled by Alma and Mariana.
- Git repo setup and sharing will be done by Felipe Belisário.
- API Swagger documentation, authentication, unit tests, and video presentation responsibilities are yet to be allocated.

## Potential Risks and Risk Mitigation

### Risks Involved

Potential risks include time constraints due to the number of collections and the learning curve for implementing unit tests.

### Mitigation Techniques

To mitigate these risks, deadlines will be set for each task:
- Week 5: Swagger documentation ready by 12/01, progress report by 12/02.
- Week 6: Authentication and unit tests ready by 12/07, verification of errors by 12/08, video recording or presentation by 12/09.

---

This README provides an overview of our proposed Restaurant API project. For detailed implementation and updates, refer to the associated project files and documentation.

