import React, {useState} from 'react'

export  function Test() {
    const [count, setCount] = useState(0)
    let nro  = 0
    console.log('test', nro)
  return (
    <div>
        <h1>Count: {count}</h1>
     <button onClick={() => {setCount(count+1); nro ++;} }>increment</button> 
    </div>

  )
}
