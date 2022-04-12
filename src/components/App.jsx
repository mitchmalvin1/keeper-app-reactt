import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import Axios from 'axios'

function App() {
  const [noteList, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    Axios.get('https://keeper-app-backendd.herokuapp.com/read').then((response) => {
      setNotes(response.data);

    }).catch(() => {
      console.log("error");
    })

  }, []);


  function addNote(newNote) {
    Axios.post('https://keeper-app-backendd.herokuapp.com/addFriend', newNote).then((response) => {
      //if we successfully inserted
      setNotes([...noteList, { _id: response.data._id, title: response.data.title, content: response.data.content }])
    }).catch(() => {
      alert('aww, it didnt work');
    })
  }


  const deleteNote = (id) => {
    console.log(id);
    Axios.delete(`https://keeper-app-backendd.herokuapp.com//delete/${id}`).then(() => {
      setNotes(noteList.filter((val) => {
        return val._id !== id;
      }))
    })

  }

  return (
    <div>
      <Header />
      <CreateArea onAdd={addNote} />
      {console.log (noteList)}
      {noteList.map((noteItem, index) => {
        return (
          <Note
            key={index}
            id={noteItem._id}
            title={noteItem.title}
            content={noteItem.content}
            onDelete={deleteNote}
          />
        );
      })}
      <Footer />
    </div>
  );
}

export default App;
