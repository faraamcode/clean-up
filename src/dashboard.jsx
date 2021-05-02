import React, {useState, useEffect}from "react";
import { Route, useHistory } from "react-router-dom";
import auth from "./auth";
const url = "https://api.github.com/users"
export const Dashboard = () => {
  const history = useHistory();
  const [users, setUsers] = useState([])
  useEffect(() => {
    const abortCont = new AbortController();
    setTimeout(()=>{

      fetch(url, {signal : abortCont.signal})
      .then((response)=> response.json())
      .then((result)=> setUsers(result))
      
    },3000)
    return ()=> abortCont.abort
    
    }, [])

  const logout = (e) => {
    e.preventDefault();
    auth.logout(() => {
      history.push("/");
    });
  };
  return (
    <div>
      <h4>My dashboard</h4>
      {users.map(item=>{
        return (
          <h6 key={item.login}>{item.login}</h6>
        )
      })}
      <button onClick={logout}>Logout</button>
    </div>
  );
};
