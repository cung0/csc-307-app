import React, { useState, useEffect } from "react";
import Table from "./Table";
import Form from "./Form";


function MyApp() {
    const [characters, setCharacters] = useState([]);

    function fetchUsers(){
      console.log("Fetching users")
      const promise = fetch("http://localhost:5700/users")
      return promise
    }

    function postUser(person){
      const promise = fetch("Http://localhost:5700/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(person),
      });

      return promise;
    }

    function logConsole(messageString){
      const promise = fetch("http://localhost:5700/log", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({message: messageString}),
      })

      return promise
    }

    function removeUser(index){
      const char = characters[index]
      const promise = fetch("http://localhost:5700/users", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({id: char.id}),
      })

      return promise
    }

    function removeOneChar(index){
        removeUser(index)

          .then((res) => {
            if (res.status === 204){
              const updated = characters.filter((character, i) =>{
                return i !== index;
              });
              setCharacters(updated);

            }
          })
          .catch((error) => {
            console.log(error)
          })
      }

    function updateList(person){
      postUser(person)
        .then((res) => {
          logConsole("")
          if (res.status === 201){
            setCharacters([...characters, person])
          }
        })

        .catch((error) => {
          console.log(error)
        })
    }


    useEffect(() => {
      fetchUsers()
        .then((res) => res.json())
        .then((json) => setCharacters(json["users_list"]))
        .catch((error) => { console.log(error); });
    }, [] );

    return (
      <div className= "container">
        <Table characterData ={characters}
                removeCharacter ={removeOneChar}/>
        <Form handleSubmit={updateList}/>
      </div>
    );
  }


export default MyApp;