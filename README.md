# Hobby-Hive

Hobby-Hive is a social platform where users can connect over shared interests and hobbies. This project consists of a backend powered by Django and a frontend developed with React.

## Getting Started

Follow these instructions to set up and run the project on your local machine.

### Prerequisites

- Python 3.x
- PostgreSQL
- Node.js and npm

### Installation

#### 1. Clone the Repository

Clone the specific branch (`ranjan`) for this project:

```bash
git clone -b ranjan <repository-url>
cd hobby-hive
```


#### 2. Set Up PostgreSQL
- Download and install PostgreSQL if you haven't already. You can download it from the official PostgreSQL website.

- Create a new database named my_db_2 by running the following command in your PostgreSQL shell:
```bash
CREATE DATABASE my_db_2;
```
### 3. Configure the Django Application
- Navigate to your Django project directory and run the following commands to set up migrations:

```bash
python manage.py makemigrations
python manage.py migrate
```
You should see tables being created in your database.

### 4. Set Up the Frontend
Navigate to the frontend directory:

```bash
cd frontend
```

Install the necessary packages:
```bash
npm install
```

### Running the Application

#### 1. Start the Django Server

In the root of your project, run:

```bash
python manage.py runserver
```

In the frontend directory, run:
```bash
npm start
```

Visit http://localhost:8000 for the backend API and http://localhost:3000 for the frontend interface.

