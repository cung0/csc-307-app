// backend.js
import express from "express";

const app = express();
const port = 5173;

const users = {
  users_list: [
    {
      id: "xyz789",
      name: "Charlie",
      job: "Janitor"
    },
    {
      id: "abc123",
      name: "Mac",
      job: "Bouncer"
    },
    {
      id: "ppp222",
      name: "Mac",
      job: "Professor"
    },
    {
      id: "yat999",
      name: "Dee",
      job: "Aspring actress"
    },
    {
      id: "zap555",
      name: "Dennis",
      job: "Bartender"
    }
  ]
};

const findUserByName = (name) => {
  return users["users_list"].filter(
    (user) => user["name"] === name
  );
};

const findUserById = (id) => users["users_list"].find((user) => user["id"] === id);



app.use(express.json());



app.get("/", (req, res) => {
  res.send("Hello World!");
});



app.get("/users", (req, res) => {
  const name = req.query.name;
  if (name != undefined) {
    let result = findUserByName(name);
    result = { users_list: result };
    res.send(result);
  } else {
    res.send(users);
  }
});

const addUser = (user) => {
  users["users_list"].push(user);
  return user;
}

function findAttributeIndex(array, attr, value){
  for (var i = 0; i < array.length; i += 1){
    if (array[i][attr] === value.id){
      return i;
    }
  }
  return -1;
}

const removeUser = (id) => {
  console.log(id);
  const index = findAttributeIndex(users["users_list"], "id", id)
  if (index != -1){
    users["users_list"].splice(index, 1)
  }
  return id;
}


app.post("/users", (req, res) => {
  const userToAdd = req.body;
  addUser(userToAdd);
  res.send();
});

app.delete("/users", (req, res) => {
  const userToRemove = req.body;
  removeUser(userToRemove);
  res.send();
});



app.get("/users/:id", (req, res) => {
  const id = req.params.id;
  let result = findUserById(id);
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