const Filter = ({ newFilter, handleFilterChange }) => {
    return (
        <div> filters shown with <input value={newFilter} onChange={handleFilterChange} /></div>
    );
};

export default Filter;