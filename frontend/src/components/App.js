import React, {useState} from 'react';
import { Route, Switch, Redirect, Link, useHistory } from 'react-router-dom';
import Header from './Header';
import Main from './Main';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import AddConfirmationPopup from './AddConfirmationPopup';
import ProtectedRoute from './ProtectedRoute';
import InfoRegisterPopup from './InfoRegisterPopup';
import Login from './Login';
import Register from './Register';
import {CurrentUserContext} from '../contexts/CurrentUserContext';
import api from '../utils/api';
import * as auth from '../utils/auth'
import { setToken, getToken, removeToken } from '../utils/token'; 

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isAddConfirmationPopup, setisAddConfirmationPopup] = useState(false);
  const [isAddInfoRegisterPopup, setIsAddInfoRegisterPopup] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [cards, setCards] = useState([]);
  const [renderLoading, setRenderLoading] = useState('Сохранить');
  const [loggedIn, setLoggedIn] = useState(false);
  const [isRegister, setIsRegister] = useState(null);
  const [email, setEmail] = useState(''); 
  const history = useHistory();

  React.useEffect(() => {
    tokenCheck();
  }, []); 

  React.useEffect(() => {
    if(loggedIn) {
    Promise.all([api.getUserData(), api.getInitialCards()])
      .then(([userData, cards]) => {
        setCurrentUser(userData);
        setCards(cards);
      })
      .catch((err) => console.log(err));
  }}, [loggedIn]);

//авторизация пользователя
  function handleLogin(email, password) {
    auth.authorize(email, password)
    .then((res) => {
      setEmail(email);
      setToken(res.token);
      setLoggedIn(true);
      history.push("/home");
    })
    .catch((err) => {
      console.log(err);
      setIsRegister(false);
      addRegisterPopup();
    })
  }

//регистрация пользователя
function handleRegister(email, password) {
  auth.register(email, password)
    .then((res) => {
      if (res._id) {
        setEmail(res.email);
        addRegisterPopup();
        setIsRegister(true);
        history.replace({pathname: "/sign-in"});
      } 
    })
    .catch((err) => {
      console.log(err);
      setIsRegister(false);
      addRegisterPopup();
    })
}

//выход пользователя
function signOut() {
  setLoggedIn(false);
  history.push("/sign-in");
}

//проверка токена
  function tokenCheck() {
    const token = getToken();
    if(token) {
      auth.getContent(token)
        .then(res => {
          if(res && res.data) {
             setEmail(res.data.email);
             setLoggedIn(true);
             history.push("/home");
           } 
        })
        .catch(err => console.log(err))
}
  } 
  
  function handleCardLike(card) {
    const isLiked = card.likes.some(user => user === currentUser._id);
    api.changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch(err => console.log(err))
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id)
      .then(() => {
        setCards(cards => cards.filter(item => {
          return item._id !== card._id
        }));
        setisAddConfirmationPopup(false);
      })
      .catch(err => console.log(err))
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function addRegisterPopup() {
    setIsAddInfoRegisterPopup(true)
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleConfirmationClick() {
    setisAddConfirmationPopup(true);
  }

  function handleRenderLoading(title) {
    setRenderLoading(title)
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setisAddConfirmationPopup(false);
    setIsAddInfoRegisterPopup(false)
    setSelectedCard(null);
  }
  
  function handleUpdateUser(currentUser) {
    setRenderLoading('Сохранение...')
    api.editProfile(currentUser)
      .then(userInfo => {
        setCurrentUser(userInfo);
        setIsEditProfilePopupOpen(false)
      })
      .catch(err => console.log(err))
      .finally(() => setRenderLoading('Сохранить'))
  }

  function handleUpdateAvatar(avatar) {
    setRenderLoading('Сохранение...')
    api.editAvatar(avatar)
      .then(link => {
        setCurrentUser(link);
        setIsEditAvatarPopupOpen(false);
      })
      .catch(err => console.log(err))
      .finally(() => setRenderLoading('Сохранить'))
  }

  function handleUpdatePlace(data) {
    setRenderLoading('Сохранение...')
    api.addNewCard(data)
      .then(newCard => {
        setCards([newCard, ...cards]);
        setIsAddPlacePopupOpen(false);
      })
      .catch(err => console.log(err))
      .finally(() => setRenderLoading('Создать'))
  }
  
  return ( 
    <CurrentUserContext.Provider value = { currentUser }>
      <div className = "page">
        <Header 
          islogged={loggedIn}
          email={email}
          signOut={signOut}/>
        <Switch>
          <ProtectedRoute
            path="/home"
            loggedIn={loggedIn}
            component={Main}
            email={email}
            signOut={signOut}
            onEditAvatar = {handleEditAvatarClick}
            onEditProfile = {handleEditProfileClick}
            onAddPlace = {handleAddPlaceClick }
            cards = {cards}
            onCardClick = {handleCardClick}
            onCardLike = {handleCardLike}
            onCardConfirmation = {handleConfirmationClick}
          />
          <Route path="/sign-up"> 
            <Register handleRegister={handleRegister} />
            <Link to="/sign-in" className="link link_type_in">Войти</Link>
          </Route>
          <Route path="/sign-in">
            <Login handleLogin={handleLogin} />
            <Link to="/sign-up" className="link link_type_in">Регистрация</Link>
          </Route>
          <Route>
            {
            loggedIn ? (
               <Redirect to ="/home" />
                ) : (<Redirect to ="/sign-in" />
                )
            }
          </Route> 
        </Switch>
        <InfoRegisterPopup 
          isOpen = {isAddInfoRegisterPopup}
          onClose = {closeAllPopups}
          isRegister ={isRegister}
          title ={'Вы успешно зарегистрировались!'}
          error={'Что-то пошло не так!Попробуйте ещё раз.'}
        />
        <EditProfilePopup 
          isOpen = {isEditProfilePopupOpen}
          onClose = {closeAllPopups}
          onUpdateUser = {handleUpdateUser }
          renderLoading = {handleRenderLoading}
          buttonText = {renderLoading}
        /> 
        <EditAvatarPopup 
          isOpen = {isEditAvatarPopupOpen}
          onClose = {closeAllPopups}
          onUpdateAvatar = {handleUpdateAvatar}
          renderLoading = {handleRenderLoading}
          buttonText = {renderLoading}
        />
        <AddPlacePopup 
          isOpen = {isAddPlacePopupOpen}
          onClose = {closeAllPopups}
          onAddPlace = {handleUpdatePlace}
          renderLoading = {handleRenderLoading}
          buttonText = {renderLoading}
        />
        <AddConfirmationPopup 
          isOpen = {isAddConfirmationPopup}
          onClose = {closeAllPopups}
          onUpdateConfirmation = {handleCardDelete}
          card = {cards.find(card => card._id)}
        /> 
        <ImagePopup 
          name = "card"
          card = {selectedCard}
          onClose = {closeAllPopups}
        />
      </div> 
    </CurrentUserContext.Provider>
  );
}

export default App;