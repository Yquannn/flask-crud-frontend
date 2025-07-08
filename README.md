🛠️ Setup Instructions

This project is a full-stack CRUD app built with:

- Backend: Python Flask + Flask-CORS
- Frontend: Next.js 15 App Router + Tailwind CSS + CSS
- API Communication: Axios

------------------------------------------------------------

🚀 Run the Project Locally

🔧 Backend (Flask)


1. Clone this repository

  ```bash
    git clone https://github.com/Yquannn/flask-crud
  ```

4. Open your terminal and navigate to flask-crud/server:
    ```bash
   cd flask-crud/server

6. Inside the server folder Install backend dependencies:
    ```bash
   pip install -r requirements.txt

7. Start the Flask backend:
   ```bash
   python run.py

------------------------------------------------------------

💻 Frontend (Next.js)

1. Open a new terminal and navigate to flask-crud/client
    ```bash
   cd flask-crud/client

3. Install frontend dependencies:
   ```bash
   npm install

4. Start the development server:
    ```bash
   npm run dev

6. The app will be available at:
   http://localhost:3000

------------------------------------------------------------

💡 My Development Approach

🧱 1. Project Structure and Architecture

I followed a clear separation of concerns between the frontend and backend:

- The backend handles business logic, database operations, and API creation using Flask.
- The frontend uses Next.js App Router for client-side routing and component-based UI.
- Axios is used to communicate between the frontend and backend via RESTful APIs.

------------------------------------------------------------

🛠️ 2. Backend (Flask)

- Structured into modular folders like routes, services, and models.
- APIs are designed following REST principles (GET, POST, PUT, DELETE).
- Implemented Flask-CORS to enable communication with the frontend.
- Connected to a SQLITE.
- 
✅ Key Features:
- CRUD operations
- Input validation
- JSON responses
- Error handling

------------------------------------------------------------

🎨 3. Frontend (Next.js)

- Used the App Router (/app directory) to organize routes and components.
- Styled using Tailwind CSS for a clean and responsive UI.
- API communication handled using Axios, separated into service modules.
- Emphasis on clean UI/UX, with loading states and error messages.

✅ Key Features:
- Dynamic routing (/item/[id])
- CRUD forms and validation
- Reusable UI components

------------------------------------------------------------

🚀 5. Deployment

- Frontend is deployed on Vercel.
- Backend runs locally via Flask, and can be deployed on a production server using Render.
- Live on: https://flask-crud-frontend-mu.vercel.app/

------------------------------------------------------------
