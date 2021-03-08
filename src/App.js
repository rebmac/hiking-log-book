import './styles/styles.scss'
import firebase from './firebase.js';
import { useState, useEffect } from 'react';


function App() {
  //create a global variable for the firebase info
  const dbRef = firebase.database().ref();
  //Set the hooks to variables
  const [loggedHikesArray, setLoggedHikesArray] = useState([]);
  const [dateInput, setDateInput] = useState("");
  const [numberInput, setNumberInput] = useState("");

  //define the useEffect Hook
  useEffect(() => {
    //log out the information within the database
    //save the database object within a variable
    dbRef.on('value', (data) => {

      const hikeData = data.val();
      const hikeDatabase = [];

      for (let hikeKey in hikeData) {
        hikeDatabase.push({
          uniqueKey: hikeKey,
          date: hikeData[hikeKey].[0],
          km: hikeData[hikeKey].[1]
        });
      }
      setLoggedHikesArray(hikeDatabase);
      console.log(hikeDatabase);


    });
  }, [])//pass a second argument of an empty array to ensure Hook runs only once after component renders

  //define the handlers
  const handleSubmit = (event) => {
    event.preventDefault();

    //push the values in the numberInput and the dateInput state variables to the database
    dbRef.push([dateInput, numberInput]);
    event.target.reset();
    setNumberInput("");
  }

  const handleDateChange = (event) => {
    setDateInput(event.target.value);

  }

  const handleNumberChange = (event) => {
    setNumberInput(event.target.value);
  }

  const handleClick = (hikeUniqueId)=>{
    dbRef.child(hikeUniqueId).remove();
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
          <input type="date" id="dateOfHike" onChange={handleDateChange} required />

          <label htmlFor="kmHiked">Number of Kilometers:</label>
          <input type="number" id="kmHiked" placeholder="1.0" step="0.1" onChange={handleNumberChange} value={numberInput} required />

          <button className="addLogButton">Add trail log</button>
        </form>
        {/* map through booksArray in state and display them to the page */}
      </main>
      <section className="loggedInfo wrapper">
        <ul>
          {
            loggedHikesArray.map((data)=>{
              return(
               <li key={data.uniqueKey}>
                 <button onClick={()=>handleClick(data.uniqueKey)}>x</button>
                 <p>Date: {data.date}</p>
                 <p>{data.km}km</p>
               </li> 
              )
            })
          }
        </ul>
      </section>
      <footer>
        Created at <span><a href="https://junocollege.com" title="go to site">Juno College</a></span> by Rebecca MacDonald 2021
      </footer>
    </div>

  );
}

export default App;
