// import { pool } from './database.js';
import express, { json, urlencoded } from 'express';
import morgan from 'morgan';

import { IndexRouter } from './routes/index.js';
import { API_Router } from './routes/API/API_V1.js';

/* ----------------------------- Initializations ---------------------------- */
const app = express();

app.set('port', process.env.PORT || 4001);

/* ------------------------------- Middlewares ------------------------------ */
app.use(morgan('dev'));
app.use(urlencoded({extended:true}));
app.use(json());
// app.use((req, res, next)=>{
//     res.header('Access-Control-Allow-Origin', '*');
//     res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
//     res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
//     res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
//     next();
// });

/* --------------------------------- Routes --------------------------------- */
app.use('/api/v1/', API_Router);
app.use(IndexRouter);

app.listen(app.get('port'), ()=>{
    console.log('Server on Port', app.get('port'));
});
