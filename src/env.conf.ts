// Inject all your environment variables here
/* eslint-disable no-process-env */
import 'dotenv/config'
export default {
  PORT: process.env.PORT || 5050,
  NODE_ENV: process.env.NODE_ENV || 'development',
  baseDir: process.cwd(),
  kafka: {
    url: process.env.KAFKA_URL,
    host: process.env.KAFKA_HOST,
    port: process.env.KAFKA_PORT,
    caCertPath: 'certs/ca.'
  }
};
