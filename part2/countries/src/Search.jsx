const Search = ({ newSearch, handleSearchChange }) => {
    return (
        <div> find countries <input value={newSearch} onChange={handleSearchChange} /></div>
    );
};

export default Search;