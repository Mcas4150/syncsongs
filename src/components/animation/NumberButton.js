import React from 'react';
function NumberButton(props){
    let newVal = String(props.prevValue) + String(props.value);
    
    return(
        <input type="button"
               className="btn btn-success p-4 m-2"
               value={props.value}
               onClick={(e)=>{e.preventDefault();props.handleClick(newVal)}}/>
    );
}
export default NumberButton;