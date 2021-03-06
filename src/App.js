import './App.css';
import firebase from './firebase.js';
import {useState, useEffect } from 'react';

function App() {
  return (
    <div className="App">

      {/* add a submit listener to our form */}
      <form action="" onSubmit={handleSubmit}>
        <label htmlFor="kmHiked">How many kilometres did you hike today?</label>
        {/* attach an onChange event listener to the text input */}
        {/* by adding the value attribute we're binding state to this input */}
        <input type="number" id="kmHiked" onChange={handleChange} value={kmInput} required/>
        <button>Add Your Book</button>
      </form>
      {/* map through booksArray in state and display them to the page */}
     <h1>Hiker Trail Log test test test</h1>
    </div>
  );
}

export default App;
