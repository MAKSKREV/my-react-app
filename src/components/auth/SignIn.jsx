import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { auth } from "../../firebase";
import './sigincss.css';


const SignIn = () => {
  
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function logIn(e) {
    e.preventDefault();

    if (password.length < 6) {
      setError("Password should be at least 6 characters");
      return;
    }

    signInWithEmailAndPassword(auth, email, password)
      .then((user) => {
        console.log(user);
        setError("");
        setEmail("");
        setPassword("");

        if (email === "admin@gmail.com" && password === "admin11") {
          navigate("/admin");
        } else {
          navigate("/home");
        }

      }) 
      .catch((error) => {
        console.log(error);
        setError("SORRY, COULDN'T FIND YOUR ACCOUNT");
      });
  }

  return (
  
    <div>
      <div className="blue">
        <img className="logo" src="https://cdn.discordapp.com/attachments/896756748331929643/1213832655745851402/image.png?ex=65f6e8c1&is=65e473c1&hm=dcd57befb7d56da709bc56b51f0eb834c74fdc0aa3f5c7374f7780571ab74792&" alt="Logo" />
      </div>
      
      <form >
      <p className="reg0"><a href="/signup">Зарегистрироваться</a></p>
        <h2 className="vhod">вход</h2>
        <input className="input1"
          placeholder="Почта"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
        />
        <input className="input2"
          placeholder="Пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
        />
        <button className="knopka" onClick={logIn}>Войти в аккаунт</button>
        {error ? <p style={{ color: "red" }}>{error}</p> : ""}
      </form>
      <div className="blue2"></div>
    </div>
  );
};

export default SignIn;
