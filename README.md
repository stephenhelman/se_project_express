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

### Functionality

#### - Users

Update a user - PUT "_/users/me_"

Get the current user - GET "_/users/me_"

#### - Auth

Create a user - POST "_/signup_" - includes password hashing for security

Login with credentials - POST "_/signin_"

#### - Clothing Items

Get all clothing items - GET "_/items_"

Create a clothing item - POST "_/items_"

Delete a clothing item - DELETE "_/items/:id_" - include the id of the clothing item in the request path

Add a like to a clothing item - PUT - "_/items/:id/likes_"- include the id of the clothing item in the request path

Remove a like from a clothing item - "_/items/:id/likes_"- include the id of the clothing item in the request path

### Deployment

[Backend Repository](https://github.com/stephenhelman/se_project_express)

[Frontend Repository](https://github.com/stephenhelman/se_project_react)

This project is also [fully deployed](https://www.wtwr.jedimasters.net/)

### Video

Check out my [project pitch](https://www.loom.com/share/db9abf484ecf43c2bbbe9f3ac7a7957f) where I describe my
project and some challenges I faced while building it.
