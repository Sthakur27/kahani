# kahani
Single-database configuration for Flask.


migrations

update models.py
flask db migrate -m "Added description column to story table"

Review the Migration Script

flask db upgrade

verify changes in psql
psql -U sid -d kahani

Kahani is an interactive storytelling application that allows users to create, navigate, and contribute to dynamic, branching stories. The project leverages a modern web stack, including React, TypeScript, Chakra UI for the frontend, and a Python Flask backend to provide an engaging user experience.

## Features

- **Create Stories:** Users can create new stories with a title and an introductory paragraph.
- **Navigate Stories:** Users can navigate through stories by selecting different options, leading to various paths and outcomes.
- **Contribute to Stories:** Users can add new options and paragraphs to existing stories, contributing to the branching narrative.

## Technology Stack

- **Frontend:** React, TypeScript, Chakra UI
- **Backend:** Python, Flask
- **Database:** MongoDB (or any preferred database setup)

## Installation and Setup

### Prerequisites

- Node.js and npm installed on your machine.
- Python and pip installed.
- MongoDB (or your preferred database) running.

### Clone the Repository

```bash
git clone https://github.com/yourusername/kahani.git
cd kahani
Setup the Frontend
Navigate to the frontend directory and install dependencies:

bash
Copy code
cd frontend
npm install
Create a .env file in the frontend directory and add the following environment variables:

arduino
Copy code
REACT_APP_API_URL=http://localhost:5000
Start the React application:

start frontend 
cd frontend or kf
npm start
This will start the React application on http://localhost:3000.

Setup the Backend
Navigate to the backend directory and create a virtual environment:

bash
Copy code
cd backend
python -m venv venv
python run.py
source venv/bin/activate  # On Windows use `venv\Scripts\activate`
Install the Python dependencies:


bash
Copy code
pip install -r requirements.txt
Create a .env file in the backend directory and add the following environment variables:

makefile
Copy code
FLASK_APP=app.py
FLASK_ENV=development
MONGO_URI=mongodb://localhost:27017/kahani
Start the Flask server:

bash
Copy code
flask run
This will start the backend server on http://localhost:5000.

Database Setup
Ensure you have MongoDB running on your local machine or use a cloud MongoDB service. The connection string should be added to the .env file in the backend directory as shown above.

Project Structure
frontend/src/components: Contains all React components.
HomePage.tsx: The landing page showing trending stories and the create story button.
StoryView.tsx: Component for viewing and navigating through a story.
OptionCreator.tsx: Component for adding new options to a story.
CreateStoryModal.tsx: Modal component for creating a new story.
StoryBook.tsx: Component for an immersive storytelling experience.
StoryCard.tsx: Component representing a story segment or option.
toolkit: Reusable UI components and utilities.
frontend/src/types: TypeScript types for the project.
backend: Contains the Flask backend.
app.py: Main application file.
routes.py: Contains the API endpoints.
models.py: Database models.
config.py: Configuration file.
Usage
Home Page
The home page displays a list of trending stories and a button to create a new story. Clicking on a story navigates to the story view.

Creating a New Story
Click on the "Create New Story!" button to open a modal where you can enter the title and introductory paragraph for the new story. Upon submission, you will be navigated to the new story view where you can start adding options.

Navigating a Story
In the story view, you can select different options to navigate through the branching narrative. You can also contribute by adding new options to any part of the story.

Adding New Options
In the story view, click on the "Create Option" button to open the option creator modal. Enter the option text and the corresponding paragraph to add a new branch to the story.

Contributing
We welcome contributions to Kahani. If you have any improvements or bug fixes, please fork the repository, create a new branch, and submit a pull request.

License
This project is licensed under the MIT License. See the LICENSE file for more details.

Contact
For any questions or inquiries, please contact us at support@kahani.com.

Happy storytelling with Kahani!