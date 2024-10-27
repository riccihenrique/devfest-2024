import express, { NextFunction, Request, Response } from 'express';
import client from 'prom-client'
import router from './routes';

import './workers';

const app = express();

const collectDefaultMetrics = client.collectDefaultMetrics;
collectDefaultMetrics();

const appStatusGauge = new client.Gauge({
  name: 'emprestimo',
  help: 'Indicates if the application is up (1) or down (0)',
});

app.use(express.json());

app.use(router);

app.get('/metrics', async (req, res) => {
  res.set('Content-Type', client.register.contentType);
  res.end(await client.register.metrics());
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({
    message: err.message,
  });
});

const PORT = process.env.PORT;

app.listen(PORT, () => {
  appStatusGauge.set(1);
  console.log(`Emprestimo rodando na porta ${PORT}`);
});

process.on('SIGTERM', () => {
  appStatusGauge.set(0);
  process.exit(0);
});