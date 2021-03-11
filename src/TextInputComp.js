const TextInputComp = (props) => {
    
    //what happens when the userfills our noteable things
    //onChange is updating our app,js state so we can keep the value that is changed here, stored in the app.js 
    const handleNotableThingsChange = (event) => {
        props.onChange(event.target.value);
      }
    
// value ={props.value} allowing the app.js to pass a value into here and changes it into an empty string
    return (
        <>
            <label htmlFor="notableThingsOnHike" className="notableThingsOnHike">Notable Things:</label>
            <textarea 
            type="text" 
            name="notableThingsOnHike" 
            id="notableThingsOnHike" 
            value={props.value} 
            className="wrapper" 
            rows="4" 
            placeholder="e.g. weather, terrain, animals" 
            onChange={handleNotableThingsChange}/>
        </>
    )
}
export default TextInputComp;