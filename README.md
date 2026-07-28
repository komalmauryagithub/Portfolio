# Premium Personal Portfolio — Komal Maurya

A premium, highly interactive, responsive, and production-ready developer portfolio for Komal Maurya. Featuring a dark-mode modern aesthetic, smooth vanilla JS scroll & reveal animations, a tech skills matrix, dynamic project specs modal dialogs, and a secure Node.js + Express backend with MySQL database integration.

## Features & Sections
1. **Intro Loader**: Quick initials logo fade transition.
2. **Interactive Navigation**: Sticky, self-hiding header with a visual scroll progress indicator, active tab tracker, and responsive mobile burger overlay.
3. **Interactive Hero**: Dynamic role typing effect, contact / resume buttons, social anchors, availability marker, and cursor spotlights.
4. **About Me**: Grid storytelling panels illustrating academic and specialization highlights.
5. **Technical Skills**: Dynamically rendered filterable categories with an ambient sliding tech marquee.
6. **Featured Projects**: Custom card layouts highlighting *SketchNest*, *KFOOD*, and *AI Chatbot* with interactive spec sheets (dialog modals).
7. **Academic Timeline**: Glowing vertical milestones for B.Sc CS, HSC, and SSC.
8. **Certifications**: Modern list cards for certifications (Infosys Python, MSC-IT, Forage Simulations).
9. **Soft Skills Grid**: Clean icon cards highlighting professional soft skills.
10. **AJAX Contact Form**: Modern input fields with real-time validation, rate-limiting, and MySQL storage.

---

## Tech Stack
* **Frontend**: Semantic HTML5, CSS3 Custom Properties (Variables), Vanilla ES6 JavaScript, Google Fonts (Outfit, Inter), FontAwesome Icons.
* **Backend**: Node.js, Express.js.
* **Database**: MySQL.

---

## Setup & Local Installation

### Prerequisites
1. **Node.js**: Install Node.js (v16+) on your local system.
2. **MySQL Database**: Ensure MySQL Server is running locally (directly or via XAMPP MySQL module).

### Step 1: Database Setup
1. Open your MySQL client (e.g., phpMyAdmin, MySQL Workbench, or CLI).
2. Create the database and the table by running the SQL script located in:
   `database/contact_messages.sql`
   
   If using the CLI:
   ```bash
   mysql -u root -p < database/contact_messages.sql
   ```
   *Note: This creates a database named `komal_portfolio` and a table `contact_messages`.*

### Step 2: Install Node Dependencies
Open your terminal in the project directory and run:
```bash
npm install
```

### Step 3: Environment Credentials
Copy the `.env.example` file to a new file named `.env`:
```bash
cp .env.example .env
```
Open the `.env` file and input your MySQL configuration details:
```env
PORT=5000
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_DATABASE=komal_portfolio
CORS_ORIGIN=http://localhost:5000
```
*(Leave `DB_PASSWORD` blank if you are using XAMPP's default setup with no password).*

### Step 4: Run the Application
Start the server in development mode (using Nodemon for auto-reload):
```bash
npm run dev
```
Or start in standard production mode:
```bash
npm start
```
The server will start at **`http://localhost:5000`**. You can open this link in your browser to view the portfolio.

---

## Contact Form Verification & Testing Steps

1. **Successful Submission**:
   - Fill in all form inputs with valid information.
   - Click **Send Message**.
   - You should see a green success message: *"Thank you! Your message has been received."*
   - Query your MySQL database to verify:
     ```sql
     SELECT * FROM contact_messages;
     ```
     You should see your submitted record in the table.

2. **Validation Feedback**:
   - Leave the name or message field empty and attempt to submit.
   - Input an invalid email (e.g. `test@domain`) and attempt to submit.
   - The form should block the request and output inline red error messages.

3. **Spambot Honeypot Trap**:
   - The form includes a hidden input (`honeypot`). If this input is populated (which bots do automatically), the server will bypass database insertion and respond with a fake success code to reject the bot.

4. **Throttling (Rate Limiting)**:
   - Attempt to submit a message 4 times within a 10-minute window.
   - The server will respond with a rate-limit error: *"Too many contact requests from this IP. Please try again after 10 minutes."*

---

## Troubleshooting

### 1. Database Connection Failures
* **Error**: `Database connection failed. Please check your MySQL server or .env configuration.`
* **Solution**: Ensure your MySQL server (like XAMPP MySQL) is active and running on port `3306`. Check that your `DB_USER` and `DB_PASSWORD` inside the `.env` file match your database server details exactly.

### 2. CORS Issues in Development
* If you run the frontend on a different port (e.g. via Live Server or a separate client port) and attempt to POST, update the `CORS_ORIGIN` inside `.env` to match your frontend port (e.g. `http://127.0.0.1:5500`), then restart the server.

---

## Production Deployment
To host this portfolio:
1. Upload all files (excluding `node_modules` and `.env`) to your hosting environment.
2. Setup your Node environment variables in your server provider (e.g., Heroku, Render, AWS, or DigitalOcean) to match the `.env` keys.
3. Import the SQL table in your production MySQL instance.
4. Run `npm install` and `npm start` on the hosting dashboard.
