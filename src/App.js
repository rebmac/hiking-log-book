import './styles/styles.scss'
import firebase from './firebase.js';
import { useState, useEffect } from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faSun } from '@fortawesome/free-solid-svg-icons';

function App() {
  //create a global variable for the firebase info
  const dbRef = firebase.database().ref();
  //Set the hooks to variables
  const [loggedHikesArray, setLoggedHikesArray] = useState([]);
  const [titleInput, setTitleInput] = useState("");
  const [dateInput, setDateInput] = useState("");
  const [numberInput, setNumberInput] = useState("");
  const [notableThingsInput, setNotableThingsInput] = useState("");

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
          title: hikeData[hikeKey].[0],
          date: hikeData[hikeKey].[1],
          km: hikeData[hikeKey].[2],
          notableThings: hikeData[hikeKey].[3]
        });
      }
      setLoggedHikesArray(hikeDatabase);
    });
  }, [])//pass a second argument of an empty array to ensure Hook runs only once after component renders

  //define the handlers
  const handleSubmit = (event) => {
    event.preventDefault();

    //push the values in the numberInput and the dateInput state variables to the database
    dbRef.push([titleInput, dateInput, numberInput, notableThingsInput]);
    event.target.reset();
    setNumberInput("");
  }

  const handleTitleChange = (event) => {
    setTitleInput(event.target.value);
  }

  const handleDateChange = (event) => {
    setDateInput(event.target.value);
  }

  const handleNumberChange = (event) => {
    setNumberInput(event.target.value);
  }

  const handleNotableThingsChange = (event) => {
    setNotableThingsInput(event.target.value);
  }

  const handleClick = (hikeUniqueId) => {
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

          <label htmlFor="titleOfHike">Title:</label>
          <input type="text" id="titleOfHike" placeholder="e.g. Bruce Trail or Most Epic Hike" onChange={handleTitleChange} className="titleOfHike wrapper" required />

          <div className="dateAndkm">
            <div className="displayColumn">
              <label htmlFor="dateOfHike" className="dateOfHike">Date:</label>
              <input type="date" id="dateOfHike" onChange={handleDateChange} required />
            </div>
            <div className="displayColumn">
              <label htmlFor="kmHiked" className="kmHiked">Km:</label>
              <input type="number" id="kmHiked" placeholder="1.0" step="0.1" onChange={handleNumberChange} value={numberInput} required />
            </div>
          </div>

          <label htmlFor="notableThingsOnHike" className="notableThingsOnHike">Notable Things:</label>
          <textarea type="text" name="notableThingsOnhike" id="notableThingsOnHike" className="wrapper" rows="4" placeholder="e.g. weather, terrain, animals" onChange={handleNotableThingsChange} />

          <button className="addLogButton">Add trail log</button>
        </form>
        {/* map through booksArray in state and display them to the page */}
      </main>
      <section className="loggedInfo wrapper">
        <ul>
          {
            loggedHikesArray.map((data) => {
              return (
                <li key={data.uniqueKey}>
                  <button onClick={() => handleClick(data.uniqueKey)}>x</button>
                  <p className="title">{data.title}</p>
                  <div className="displayDateAndkm">
                    <p className="date">Date: {data.date}</p>
                    <p className="km">{data.km}km</p>
                  </div>
                  <p className="notableThings">{data.notableThings}</p>
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
