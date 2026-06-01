import mysql from 'mysql2/promise';
import { env } from './env.js';

// Lambda는 invocation마다 커넥션을 열었지만 ECS는 long-running 프로세스이므로
// 모듈 전역에서 pool을 1회 초기화하고 라우터/서비스에서 재사용한다.
export const pool = (env.DB_HOST && env.DB_USER)
  ? mysql.createPool({
      host: env.DB_HOST,
      port: Number(env.DB_PORT) || 3306,
      user: env.DB_USER,
      password: env.DB_PASS,
      database: env.DB_NAME,
      waitForConnections: true,
      connectionLimit: 10,
      enableKeepAlive: true,
      idleTimeout: 30000,
    })
  : null;

process.on('SIGTERM', async () => {
  if (pool) await pool.end().catch(() => {});
  process.exit(0);
});
