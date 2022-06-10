import React, { useState } from "react";
import { Link } from "react-router-dom";

function Register({handleRegister}) {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    const { email, password } = data;
    handleRegister(email, password);
  }

  return (
    <div className="register">
      <p className="register__title">Регистрация</p>
      <form onSubmit={handleSubmit} className="register__form">
        <input
          className="register__input"
          id="email"
          name="email"
          placeholder="Email"
          type="email"
          value={data.email}
          onChange={handleChange}
        />
        <input
          className="register__input"
          id="password"
          name="password"
          placeholder="Пароль"
          type="password"
          value={data.password}
          onChange={handleChange}
        />
        <button className="register__submit-button"
          type="submit"
        >
        Зарегистрироваться
        </button>
      </form>

      <div className="register__signin">
        <p>Уже зарегистрированы? </p>
        <Link to="sign-in" className="register__link">
          Войти
        </Link> 
      </div>
    </div>
  );
}
export default Register;
