import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors, { CorsOptions } from 'cors';
import 'dotenv/config';
import express from 'express';
import morgan from 'morgan';
import { logger } from './logger';
import authRouter from './modules/auth/auth.router';
import userRouter from './modules/user/user.router';

const app = express();
const port = 3000;
const corsOrigin = process.env.CLIENT_APP_ORIGIN;
const corsOptions: CorsOptions = {
  origin: corsOrigin,
  preflightContinue: true,
  methods: ['GET', 'POST', 'OPTIONS', 'PUT', 'PATCH', 'DELETE'],
};
const corsOptionsWithCredential: CorsOptions = {
  ...corsOptions,
  credentials: true,
};

app.options('*', cors(corsOptions));
userRouter.use(cors(corsOptions));
app.use(cors(corsOptionsWithCredential));

// For requests / response processing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// For logging
app.use(morgan('combined', {
  stream: {
    write: text => logger.info(text),
  },
}));

// For routes
app.use('/user', userRouter);
app.use('/auth', authRouter);

app.listen(port, () => {
  console.log(`Application is running on port ${port}`);
});
