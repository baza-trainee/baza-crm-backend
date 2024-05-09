import express from 'express';

const Router = express.Router();

Router.get('/ping', (req, res) => {
  res.json({
    message: 'pong',
  });
});

export default Router;
