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

    function removeOneChar(index){
        const updated = characters.filter((character, i) =>{
            return i !== index;
        });
        setCharacters(updated);
    }

    function updateList(person){
        setCharacters([...characters, person]);
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