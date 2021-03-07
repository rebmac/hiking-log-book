import './styles/styles.scss'
import firebase from './firebase.js';
import { useState, useEffect } from 'react';

function App() {
  return (
    <div className="App">
      <header className="wrapper">
        <h1>Hiker Trail Log</h1>
        <h2>Track your treks, walks and promenades</h2>
      </header>
      <main className="wrapper">
        <form action="">
          <label htmlFor="dateOfHike">Date:</label>
          <input type="date" id="dateOfHike" />
          <label htmlFor="kmHiked">Number of Kilometers:</label>
          <input type="number" id="kmHiked" placeholder="1.0" step="0.1"required />
          <button>Add to your trail log</button>
        </form>
        {/* map through booksArray in state and display them to the page */}
      </main>
      <section className="wrapper">
        <ul>
          <li>
            <p>Date: yyyy-mm-dd</p>
            <p>Distance: 4km</p>
          </li>
          <li>
            <p>Date: yyyy-mm-dd</p>
            <p>Distance: 4km</p>
          </li>
          <li>
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
