import express from 'express';
import fs from 'fs';
import path from 'path';

const Router = express.Router();

Router.get('/ping', (req, res) => {
  res.json({
    message: 'pong',
  });
});

const findRouterFiles = (directory: string) => {
  const files = fs.readdirSync(directory);
  const routerFiles: string[] = [];
  files.forEach((file) => {
    const filePath = path.join(directory, file);
    const stats = fs.statSync(filePath);
    if (stats.isDirectory()) {
      routerFiles.push(...findRouterFiles(filePath));
    } else if (file.endsWith('.router.ts') || file.endsWith('.router.js')) {
      routerFiles.push(filePath);
    }
  });
  return routerFiles;
};

const registerRouters = async () => {
  const files = findRouterFiles(__dirname);
  files.forEach((file) => {
    const module = require(file);
    const [key, router] = module.default;
    Router.use('/' + key, router);
    console.log(`${key} router loaded`);
  });
  console.log('all routers loaded');
};

registerRouters();

export default Router;
