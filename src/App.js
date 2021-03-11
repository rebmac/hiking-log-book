import './styles/styles.scss'
import firebase from './firebase.js';
import { useState, useEffect } from 'react';
import TitleInput from './TitleInput';
import TextInputComp from './TextInputComp';


function App() {
  //create a global variable for the firebase info
  const dbRef = firebase.database().ref();
  //Set the hooks to variables
  const [loggedHikesArray, setLoggedHikesArray] = useState([]);
  const [titleInput, setTitleInput] = useState("");
  const [dateInput, setDateInput] = useState("");
  const [numberInput, setNumberInput] = useState("");
  const [notableThings, setNotableThings] = useState("");

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
        //
          title: hikeData[hikeKey].titleOfHike,
          date: hikeData[hikeKey].dateOfHike,
          km: hikeData[hikeKey].kmHiked,
          notableThings: hikeData[hikeKey].notableThingsOnHike
        });
      }
      setLoggedHikesArray(hikeDatabase);
    });
  }, [])//pass a second argument of an empty array to ensure Hook runs only once after component renders

  //define the handlers
  const handleSubmit = (event) => {
    event.preventDefault();
    const value = Object.fromEntries(new FormData(event.target));
    // debugger
    //push the values in the numberInput and the dateInput state variables to the database
    // dbRef.push([titleInput, dateInput, numberInput, notableThingsInput]);
    dbRef.push(value);
    event.target.reset();
    setNumberInput("");
    setNotableThings("");
  }

  const handleDateChange = (event) => {
    setDateInput(event.target.value);
  }

  const handleNumberChange = (event) => {
    setNumberInput(event.target.value);
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

          <TitleInput value={ titleInput } onChange={(val)=>{
            setTitleInput(val);
          }}/>

          <div className="dateAndkm">
            <div className="displayColumn">
              <label htmlFor="dateOfHike" className="dateOfHike">Date:</label>
              <input type="date" id="dateOfHike" name="dateOfHike" onChange={handleDateChange} required />
            </div>
            <div className="displayColumn">
              <label htmlFor="kmHiked" className="kmHiked">Km:</label>
              <input type="number" name="kmHiked"id="kmHiked" placeholder="1.0" step="0.1" onChange={handleNumberChange} value={numberInput} required />
            </div>
          </div>

          <TextInputComp value={ notableThings } onChange={(val)=>{
              setNotableThings(val);
          }}/>

          <button type="submit" className="addLogButton">Add trail log</button>
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
