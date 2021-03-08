import './styles/styles.scss'
import firebase from './firebase.js';
import { useState, useEffect } from 'react';


function App() {
//Set the hooks to variables
const [loggedHikesArray,setLoggedHikesArray] = useState([]);
const [dateInput, setDateInput] = useState("");
const [numberInput, setNumberInput] = useState("");

//define the handlers
const handleSubmit = (event)=>{
  event.preventDefault();
  event.target.reset();
  const dbRef = firebase.database().ref();

  //push the values in the numberInput and the dateInput state variables to the database
  dbRef.push([ dateInput, numberInput ]);

  setNumberInput("");
}

const handleDateChange = (event)=>{
  setDateInput(event.target.value);

}

const handleNumberChange = (event) =>{
  setNumberInput(event.target.value);
}


  return (
    <div className="App">

      <header className="wrapper">
        <h1>Hiker Trail Log</h1>
        <h2>Track your treks, walks and promenades</h2>
      </header>
      <main className="wrapper">
        <form action="" onSubmit={handleSubmit}>

          <label htmlFor="dateOfHike">Date:</label>
          <input type="date" id="dateOfHike" onChange={handleDateChange} required/>

          <label htmlFor="kmHiked">Number of Kilometers:</label>
          <input type="number" id="kmHiked" placeholder="1.0" step="0.1" onChange={handleNumberChange} value={numberInput} required />

          <button className="addLogButton">Add trail log</button>
        </form>
        {/* map through booksArray in state and display them to the page */}
      </main>
      <section className="loggedInfo wrapper">
        <ul>
          <li>
            <button>x</button>
            <p>Date: yyyy-mm-dd</p>
            <p>Distance: 4km</p>
          </li>
          <li>
          <button>x</button>
            <p>Date: yyyy-mm-dd</p>
            <p>Distance: 4km</p>
          </li>
          <li>
          <button>x
</button>
            <p>Date: yyyy-mm-dd</p>
            <p>Distance: 4km</p>
          </li>
        </ul>
        {/* put the li here */}
      </section>
      <footer>
        Created at <span><a href="https://junocollege.com" title="go to site">Juno College</a></span> by Rebecca MacDonald 2021
      </footer>
    </div>

  );
}

export default App;
