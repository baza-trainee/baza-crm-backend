import getConfigValue from './config/config';
import app from './app';
import { AppDataSource } from './db/data-source';
import client from './discord/discord';

const port = getConfigValue('PORT') || 5000;

const main = async () => {
  await client.login(getConfigValue('DISCORD_BOT_TOKEN'));
  await AppDataSource.initialize();
  const server = app.listen(port, () => {
    console.log(`Listening at port : ${port}`);
  });

  process.on('SIGTERM', () => {
    server.close(async (err) => {
      if (err) {
        console.log(err);
      }
      await client.destroy();
      await AppDataSource.destroy();
    });
  });
};

main();
