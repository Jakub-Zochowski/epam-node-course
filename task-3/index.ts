import express from 'express';

import userRoutes from './routers/user';
import { sequelize } from './data-access/user';

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  })
);

const startDbConnection = async () => {
	try {
		await sequelize.authenticate();
		console.log('Connection has been established successfully.');
	} catch (error) {
		console.error('Unable to connect to the database:', error);
	}
}

startDbConnection();

app.use('/user', userRoutes);

app.listen(PORT, () => console.log(`The app is listening to ${PORT}`));
