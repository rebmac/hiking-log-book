const TitleInput = (props)=>{    
    const handleTitleChange = (event) => {
        props.onChange(event.target.value);
      }

    return(
        <>
        <label htmlFor="titleOfHike">Title:</label>
        <input 
        type="text" 
        id="titleOfHike"
        name="titleOfHike"
        value={props.value} 
        placeholder="e.g. Bruce Trail" 
        onChange={handleTitleChange} 
        className="titleOfHike wrapper" required /> </>
    )
}
export default TitleInput;