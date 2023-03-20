const Search = ({ newSearch, handleNameSearch, key }) => {

    return (
       <div key={key}>find countries <input value={newSearch} onChange={(e) => handleNameSearch(e.target.value)}/></div> 
    )

}

export default Search