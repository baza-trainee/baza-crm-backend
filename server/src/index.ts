import app from './app';
import { AppDataSource } from './db/data-source';

const port = process.env.PORT || 5000;

const main = async () => {
  await AppDataSource.initialize();
  const server = app.listen(port, () => {
    console.log(`Listening at port : ${port}`);
  });

  process.on('SIGTERM', () => {
    AppDataSource.destroy();
    server.close();
  });
};

main();
