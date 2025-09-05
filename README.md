# WTWR (What to Wear?): Back End

The back-end project is focused on creating a server for the WTWR application. You’ll gain a deeper understanding of how to work with databases, set up security and testing, and deploy web applications on a remote machine. The eventual goal is to create a server with an API and user authorization.

## Running the Project

`npm run start` — to launch the server

`npm run dev` — to launch the server with the hot reload feature

### Testing

Before committing your code, make sure you edit the file `sprint.txt` in the root folder. The file `sprint.txt` should contain the number of the sprint you're currently working on. For ex. 12

### Technologies

This project is utilizing mongodb and express.
Using the convenience of the mongoose and express node packages for easy code writing.

Currently there are routes to create (POST) and read (GET) users, as well as reading a specific user when given a correct userId
As for clothing items, you can create, read, update (PUT), and delete (DELETE) clothing items. As for updating, those come in the form of adding and removing unique likes.

I utilized a errorFilter function to make it easier to handle given errors in the code
