import { createPool } from 'mysql2/promise';
import { DataBaseKeys } from './keys.js';

const pool = createPool(DataBaseKeys);
console.log('Data Base conected');

export { pool };