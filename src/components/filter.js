// import React, { useState, useRef, useEffect } from 'react';


// var SearchDroup = (props) =>{
//     //the same props.options
//     //props.onChange
//      var { options, onChange } = props;
//      var ulRef = useRef();
//    var inputRef = useRef();
// return(
//     <div>
//         <input type ='text' placeholder ='search by catogory'></input>
//         <ul id="results" className="list-group" ref={ulRef}>
//         {options.map((option, index) => {
//           return (
//             <button
//               type="button"
//               key={index}
//               onClick={(e) => {
//                 inputRef.current.value = option;
//               }}
//             //   className="list-group-item list-group-item-action"
//             >
//               {option}
//             </button>
//           );
//         })}
//       </ul>
//     </div>
// )

// }

// function Search() {
//     return(
//         <div>
//             <SearchDroup/>
//         </div>
//     )
// }
// export default Search;