import express from 'express';
import routes from './routes';
import { startCronJobs } from './services/payments-cron';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.use(routes);

startCronJobs();

app.listen(3002, () => {
    console.log('Server is running on port 3002');
});