import React, { useState, useRef, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
 import './Search.css';


const Searchdruop = (props) => {
  const { options, onChange } = props;
  const ulRef = useRef();
  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.addEventListener('click', (event) => {
      event.stopPropagation();
      ulRef.current.style.display = 'flex';
      onChange(event);
    });
    document.addEventListener('click', (event) => {
      ulRef.current.style.display = 'none';
    });
  }, []);
  return (
    <div className="search-bar-dropdown">
      <input
        id="search-bar"
        type="text"
        className="form-control"
        placeholder="Search"
        ref={inputRef}
        onChange={onChange}
        // onChange={onChangeHandler}
        
      />
      <ul id="results" className="list-group" ref={ulRef}>
        {options.map((option, index) => {
          return (
            <button
              type="button"
              key={index}
              onClick={(e) => {
                inputRef.current.value = option;
              }}
              className="list-group-item list-group-item-action"
            >
              {option}
            </button>
          );
        })}
      </ul>
    </div>
  );
};

const theColagry = [];

  theColagry.push(`Women`);
  theColagry.push(`Men`);
  theColagry.push(`kids`);


function Search() {
  const [options, setOptions] = useState([]);
  const onChange = (event) => {
    setOptions(
      theColagry.filter((option) => option.includes(event.target.value))
    );
  };

  return (
    <div className="Search container mt-2 mb-3">
      <h1>Search Bar Dropdown</h1>
      <Searchdruop options={options} onChange={onChange} />
      <br />
   
    </div>
  );
}

export default Search;
