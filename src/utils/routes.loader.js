import express from 'express';
import { fileURLToPath } from 'url';
import fs from 'fs';
import path from 'path';

const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const loadRoutes = async (directory, app) => {
  const files = fs.readdirSync(directory);
  for (const file of files) {
    const fullPath = path.join(directory, file);
    const stat = fs.lstatSync(fullPath);

    if (stat.isDirectory()) {
      await loadRoutes(fullPath, app);
    } else if (file.toLowerCase().indexOf('.js')) {
      const relativePath = path.relative(__dirname, fullPath);

      const route = await import(`./${relativePath}`);

      router.use('/api', route.default);
    }
  }

  app.use(router);
};

export default loadRoutes;
