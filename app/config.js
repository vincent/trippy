import path from 'path';
import dotenv from 'dotenv';

dotenv.config({
  silent: true,
  path: path.resolve(__dirname, '../.env'),
});

const config = {
};

export default config;
