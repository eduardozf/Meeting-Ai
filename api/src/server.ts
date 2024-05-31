import dotenv from 'dotenv';
import { getOpenAi } from './shared/utils/openai';

// Import .env variables
dotenv.config();
// Start a default openai instance
getOpenAi();

// eslint-disable-next-line import/first
import './http';
