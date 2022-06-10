import React, { useState } from "react";

function Login({handleLogin}) {
  const [data, setData] = useState({
    email: '',
    password: '',
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
    if (!data.email || !data.password) {
      return;
    }
    const {email, password} = data;
    handleLogin(email, password);
  }

  return (
    <div className="login">
      <p className="login__title">Вход</p>
      <form onSubmit={handleSubmit} className="login__form">
        <input
          className="login__input"
          required
          id="email"
          name="email"
          placeholder="Email"
          type="email"
          value={data.email}
          onChange={handleChange}
        />
        <input
          className="login__input"
          required
          id="password"
          name="password"
          placeholder="Пароль"
          type="password"
          value={data.password}
          onChange={handleChange}
        />
          <button 
          type="submit" 
          className="login__submit-button">
            Войти
          </button>
      </form>
    </div>
  );
}

export default Login;
