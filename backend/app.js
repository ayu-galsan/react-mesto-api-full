require('dotenv').config();
const express = require('express');
const { celebrate, Joi, errors } = require('celebrate');
const cors = require('cors');

const { PORT = 3001 } = process.env;

const mongoose = require('mongoose');

const { routes } = require('./routes/app');
const { SERVER_ERROR_CODE, ServerErrorText, urlRegExp } = require('./utils/constans');
const { login, createUser } = require('./controllers/users');
const auth = require('./middlewares/auth');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const app = express();

app.use(express.json());

app.use(cors({
  origin: ['https://domenname.students.nomoreparties.sbs/'],
  credentials: true,
}));

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});
app.use(requestLogger);

app.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(6),
    avatar: Joi.string().pattern(urlRegExp),
  }),
}), createUser);

app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(6),
  }),
}), login);
app.use(auth);
app.use(routes);

app.use(errorLogger);

app.use(errors());

app.use((err, req, res, next) => {
  const { statusCode = SERVER_ERROR_CODE, message } = err;

  res
    .status(statusCode)
    .send({
      message: statusCode === SERVER_ERROR_CODE
        ? ServerErrorText
        : message,
    });
  next();
});

async function main() {
  await mongoose.connect('mongodb://localhost:27017/mestodb', {
    useNewUrlParser: true,
    useUnifiedTopology: false,
  });

  app.listen(PORT, () => {
    console.log(`Слушаем ${PORT} порт`);
  });
}

main();
