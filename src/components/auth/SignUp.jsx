import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../../firebase";
import { useNavigate } from 'react-router-dom';
import './sigincss.css';


const SignUp = () => {
  const navigate = useNavigate();
  const [isChecked, setIsChecked] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [copyPassword, setCopyPassword] = useState("");
  const [error, setError] = useState("");
  function register(e) {
    e.preventDefault();
    if (copyPassword !== password) {
      setError("Passwords didn't match");
      return;
    }
    createUserWithEmailAndPassword(auth, email, password)
      .then((user) => {
        console.log(user);
        setError("");
        setEmail("");
        setCopyPassword("");
        setPassword("");
        navigate("/home");


      })
      .catch((error) => console.log(error));
  }
  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const handleButtonClick = () => {
    // Ваша логика, выполняемая при нажатии на кнопку
    console.log('Button clicked!');
  };
  return (
    <div>
      <p className="reg"><a href="/signin">Войти</a></p>
      <div className="blue">
      <img className="logo" src="https://cdn.discordapp.com/attachments/896756748331929643/1213832655745851402/image.png?ex=65f6e8c1&is=65e473c1&hm=dcd57befb7d56da709bc56b51f0eb834c74fdc0aa3f5c7374f7780571ab74792&" alt="Logo" />
      </div>
      <div className="blue2"></div>
      <form onSubmit={register}>
        <h2 className="regg">РЕГИСТРАЦИЯ</h2>
        <input className="input0"
          placeholder="Почта"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
        />
        <input className="input1"
          placeholder="Пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
        />
        <input className="input2"
          placeholder="Пароль"
          value={copyPassword}
          onChange={(e) => setCopyPassword(e.target.value)}
          type="password"
        />
        <p className="zakon">Нажимая на данную кнопку, в соответствии с п. 4 ст. 9 Федерального закона от 27.07.2006 N 152-ФЗ «О персональных данных», Вы даете согласие на обработку своих персональных данных и (или) персональных
данных представляемого лица.</p>
        <input
          type="checkbox"
          className="galka"
          checked={isChecked}
          onChange={handleCheckboxChange}
        />
        <button className={isChecked ? 'knopka1' : 'inactiveButton'}
        onClick={handleButtonClick}
        disabled={!isChecked}
        >Зарегистрироваться</button>
        {error ? <p style={{ color: "red" }}>{error}</p> : ""}
      </form>
    </div>
  );
};

export default SignUp;
