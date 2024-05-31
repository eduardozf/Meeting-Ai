import dotenv from 'dotenv';
import { getOpenai } from './tools/openai';

// Import .env variables
dotenv.config();
// Start a default openai instance
getOpenai();

// eslint-disable-next-line import/first
import './http';
