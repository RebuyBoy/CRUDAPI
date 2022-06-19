# CRUDAPI
node version            :  16.15.0
install all dependencies:  npm i  
start app               :  npm run start:prod
start app dev           :  npm run start:dev

GET api/users                -> returns all users
GET api/users/${userId}      -> return one user by uuid
POST api/users               -> save user(need all 3 fields{username,age,hobbies})
{
"username": "createdUser",
"age": 22,
"hobbies": [
"createdHobby","createdHobby2"
]
}
PUT api/users/{userId}       -> update user by uuid  (need at least one field(username/age/hobbies))
DELETE api/users/${userId}   -> delete user by uuid  (example http://localhost:3002/api/users/597cf845-c591-41ef-b5cb-aa932f5ab536)