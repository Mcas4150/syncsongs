
import {  useState, useEffect} from "react";


const Counter = () =>{

const [counter, setCounter] = useState(60);

// Third Attempts
useEffect(() => {
  const timer =
    counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
  return () => clearInterval(timer);
}, [counter]);




return (
<div>Countdown: {counter}</div>

)
}


export default Counter;