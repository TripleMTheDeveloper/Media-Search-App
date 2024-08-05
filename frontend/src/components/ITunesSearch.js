import React, { useState } from 'react';
import { Dropdown, DropdownButton, Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const ITunesSearch = ({ onSearchResults }) => {
  // State to manage the search query input
  const [query, setQuery] = useState('');
  // State to manage the selected media type for search
  const [mediaType, setMediaType] = useState('music');

  // Function to handle form submission and trigger search
  const handleSearch = (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    onSearchResults(query, mediaType); // Pass the query and media type to parent component
  };

  return (
    <Form inline className="itunes-search-form" onSubmit={handleSearch}>
      {/* Input field for the search query */}
      <Form.Control
        type="text"
        placeholder="Search..."
        value={query}
        onChange={(e) => setQuery(e.target.value)} // Update query state on input change
        className="mr-2 search-input"
      />
      {/* Dropdown for selecting media type */}
      <DropdownButton
        id="dropdown-basic-button"
        title={mediaType}
        onSelect={(selected) => setMediaType(selected)} // Update media type state on selection
        className='dropdown-button'
        variant='danger'
      >
        <Dropdown.Item eventKey="music">Music</Dropdown.Item>
        <Dropdown.Item eventKey="movie">Movie</Dropdown.Item>
        <Dropdown.Item eventKey="tvShow">TV Show</Dropdown.Item>
        <Dropdown.Item eventKey="software">App</Dropdown.Item>
        <Dropdown.Item eventKey="ebook">Book</Dropdown.Item>
      </DropdownButton>
      {/* Submit button to trigger search */}
      <Button className='Button' type="submit" variant="danger">Search</Button>
    </Form>
  );
};

export default ITunesSearch;



