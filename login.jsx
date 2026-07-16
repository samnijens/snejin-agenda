import { useState } from "react";

import {
  signInWithEmailAndPassword
} from "firebase/auth";

import {
  auth
} from "./firebase";


export default function Login(){

  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [error,setError] = useState("");


  async function login(e){

    e.preventDefault();

    try{

      await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

    }
    catch(error){

      setError(
        "Onjuiste email of wachtwoord"
      );

    }

  }


  return (

    <div className="login">

      <h1>
        Familie Agenda
      </h1>


      <form onSubmit={login}>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={
            e=>setEmail(e.target.value)
          }
        />


        <input
          type="password"
          placeholder="Wachtwoord"
          value={password}
          onChange={
            e=>setPassword(e.target.value)
          }
        />


        <button>
          Inloggen
        </button>


        {
          error &&
          <p>{error}</p>
        }


      </form>

    </div>

  );

}
