# CVE Enquiry Website

This is a web application for searching and analyzing Common Vulnerabilities and Exposures (CVEs). It provides detailed vulnerability information, data visualizations, and an optional AI assistant (powered by Anthropic Claude) for in-depth analysis.

## Features

* **CVE Search:** Look up CVEs by their 2024 ID number.
* **Detailed Results:** View comprehensive details including CVSS score, severity, attack vectors, and publication dates.
* **Data Visualization:** Interactive gauges, charts, and timelines to help assess risk and impact.
* **AI Chat Assistant (Optional):** If configured, an AI assistant can answer questions about the currently viewed CVE.

## Prerequisites

Before you begin, ensure you have the following software installed on your system:

* [Node.js](https://nodejs.org/) (v18.x or later recommended)
* [npm](https://www.npmjs.com/) (usually included with Node.js)
* A running SQL database (e.g., MySQL). This guide assumes MySQL.

## Setup Instructions

Follow these steps to get the application running locally.

### 1\. Clone the Repository

First, clone this repository to your local machine (or simply use your existing project folder).

```bash
# If you are cloning from a git repository:
git clone https://github.com/ianian-c-y/COMP-SCI-3021---Industry-Project-in-Information-Technology
cd COMP-SCI-3021---Industry-Project-in-Information-Technology

# If you already have the folder, just navigate into it:
cd /path/to/your/project
```

### 2\. Install Dependencies

Install all the required Node.js packages listed in `package.json`.

```bash
npm install
```

### 3\. Set Up the Database

You need to create a database and import the provided SQL file.

1.  **Create a Database:**
    Open your SQL management tool (like MySQL Workbench, DBeaver, or the command line) and create a new database. For this example, we'll call it `cve_db`.

2.  **Import the Data:**
    Import the database structure and data from the `CVE_DataBase_backup.sql` file into your new database.

    Using the MySQL command line, the command would look like this:

    ```bash
    mysql -u YOUR_USERNAME -p cve_db < CVE_DataBase_backup.sql
    ```

    * Replace `YOUR_USERNAME` with your database username.
    * Replace `cve_db` with the name of the database you created.
    * You will be prompted for your database password.

### 4\. Configure Environment Variables

This project uses a `.env` file to store sensitive information like database credentials and API keys.

1.  Create a new file named `.env` in the root of the project folder.

2.  Copy and paste the following content into the `.env` file, replacing the placeholder values with your own.

    ```ini
    # ---------------------------------
    # DATABASE CONFIGURATION
    # ---------------------------------
    # (Update these based on your database setup from Step 3)
    DB_HOST=127.0.0.1
    DB_PORT=3306
    DB_USER=your_db_username
    DB_PASSWORD=your_db_password
    DB_NAME=CVE_DataBase
    # ---------------------------------
    # (OPTIONAL) CLAUDE API KEY
    # ---------------------------------
    # Get this from Anthropic
    CLAUDE_API_KEY=
    ```

    **Note:** The database variables (`DB_HOST`, `DB_USER`, etc.) are critical for the application to run. You must fill them out.

## Running the Application

Once the installation and configuration are complete, you can start the server.

```bash
npm start
```

The server will start (typically on port 3000). You can access the application by opening your web browser and navigating to:

[**http://localhost:3000**](http://localhost:3000)

*(Note: The exact URL may differ depending on your `app.js` routing. Based on the file tree, this is the most likely URL for the main page).*

## Optional Feature: AI Chat Assistant

The AI Chat Assistant feature is **disabled by default**.

* **To Enable:** You must get an API key from [Anthropic](https://www.anthropic.com/) and add it to your `.env` file as `CLAUDE_API_KEY`.
* **If Disabled:** If the `CLAUDE_API_KEY` is missing or empty, the server will automatically hide the AI chat button from the website. The rest of the application will function normally without any errors.