import logo from '../images/logo.svg';

function Header({email, islogged, signOut}) {
  return ( 
    <header className = "header" >
      <img className = "header__logo" src = {logo} alt = "Логотип с надписью Mesto"/>
      <div className={`header__userInfo ${islogged && "header__userInfo_opened"}`}>
        <p className="header__email">{email}</p>
        <button onClick={signOut} className="header__signOut">Выйти</button>
      </div>
   </header>
   )}

export default Header;