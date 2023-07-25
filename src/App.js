
import './App.css';
import axios from 'axios';
import { useEffect, useState } from 'react';

function App() {
  const [data, setData] = useState()
  const [search, setSearch] = useState()
  
  async function getUser(){

    if(!search){
      return
    }

    const responseData = await axios.get(`https://api.github.com/users/${search}`)
    .then(response => response.data)
    .catch(error => error.response.data)

    setData(responseData)
 }


  useEffect(()=>{

    getUser()
  },[])

  useEffect(() => {console.log("data",data)},[data])

  return (
    <div className="App">
      {
        data ?
        (
          <>
            
            <h1>{data?.login}</h1>
            <img src={data?.avatar_url} height={128} width={128} alt="user" />
      
            <a href={data?.html_url} target='blank'>Link do perfil</a>
          </>
        ) : 
        (
          <>
            <input type="text" nome='search' id='search' onChange={(event) => setSearch(event.target.value)} />
            <button type='button' onClick={()=>getUser()}>pesquisar</button>
          </>
        )
      }
      
    </div>
  );
}

export default App;
