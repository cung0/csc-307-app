// backend.js
import express from "express";
import cors from "cors";
import user_services from "./user_services.js"

const app = express();
const port = 5700;

const users = {
  users_list: []
};

const findUserByName = (name) => {
  return users["users_list"].filter(
    (user) => user["name"] === name
  );
};

const findUserByNameAndJob = (name, job) => {
  return users["users_list"].filter(
    (user) => user["name"] === name && user["job"] === job
  );
};

const findUserById = (id) => user_services.findUserById(id);


app.use(cors())
app.use(express.json());



app.get("/", (req, res) => {
  res.send("Hello World!");
});



app.get("/users", (req, res) => {
  const name = req.query.name;
  const job = req.query.job
  let result;
  if (name != undefined && job != undefined) {
    result = user_services.findUserByNameAndJob(name, job);
  } else if (name != undefined) {
    result = user_services.findUserByName(name);
  } else {
    result = user_services.getUsers();
  }

  result
    .then((result) => {
      if (result){
        res.send({users_list: result});
      } else {
        res.status(404).send("Resource not found.");
      }
    })
    .catch((error) =>
      res.status(500).send("Server Error")
    );
});

const addUser = (user) => {
  user.id = Math.random()
  users["users_list"].push(user);
  return user;
}

function findAttributeIndex(array, attr, value){
  for (var i = 0; i < array.length; i += 1){
    console.log(array[i][attr], value.id)
    if (array[i][attr] === value.id){
      return i;
    }
  }
  return -1;
}

const removeUser = (id) => {

  const index = findAttributeIndex(users["users_list"], "id", id)
  if (index != -1){
    users["users_list"].splice(index, 1)
  }
  return id;
}


app.post("/users", (req, res) => {
  const userToAdd = req.body;
  const result = user_services.addUser(userToAdd);
  if (result){
    res.status(201).send(result);
  } else {
    res.status(404).send("Resource not found.");
  }
});

app.delete("/users", (req, res) => {
  const id = req.params.id;
  const result = user_services.findUserById(id);
  result
    .then((result) => {
      return user_services.deleteUserById(id)
      .then(() => {
        removeUser(id);
        res.status(204).send();
      })
    })
});

app.post("/log", (req, res) => {
  const message = req.body
  if (message) {
    console.log("Message", message);
  }
})

app.get("/users/:id", (req, res) => {
  const id = req.params.id;
  const result = user_services.findUserById(id);

  if (result === undefined) {
    res.status(404).send("Resource not found.");
  } else {
    res.send(result);
  }
});

app.listen(port, () => {
  console.log(
    `Example app listening at http://localhost:${port}`
  );
});