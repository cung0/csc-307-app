// backend.js
import express from "express";
import cors from "cors";

const app = express();
const port = 5700;

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

const findUserByNameAndJob = (name, job) => {
  return users["users_list"].filter(
    (user) => user["name"] === name && user["job"] === job
  );
};

const findUserById = (id) => users["users_list"].find((user) => user["id"] === id);


app.use(cors())
app.use(express.json());



app.get("/", (req, res) => {
  res.send("Hello World!");
});



app.get("/users", (req, res) => {
  const name = req.query.name;
  const job = req.query.job

  if (name != undefined && job != undefined) {
    let result = findUserByNameAndJob(name, job)
    result = { users_list: result };
    res.send(result);
  } else if (name != undefined) {
    let result = findUserByName(name)
    result = { users_list: result };
    res.send(result);
  } else {
    res.send(users);
  }
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
  const addedUser = addUser(userToAdd)
  if (addedUser){
    res.status(201).send(addedUser)
  } else {
    res.status(404).send("Resource not found.");
  }
});

app.delete("/users", (req, res) => {
  const userToRemove = req.body;
  if (removeUser(userToRemove)){
    res.status(204).send();
  } else {
    res.status(404).send("Resource not found.");
  }
});

app.post("/log", (req, res) => {
  const message = req.body
  if (message) {
    console.log("Message", message);
  }
})

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