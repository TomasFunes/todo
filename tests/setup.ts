import { afterEach, beforeAll, afterAll } from 'vitest';
import { cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { server } from '../src/mocks/node';

beforeAll(() => server.listen())
afterEach(() => {
  server.resetHandlers();
  cleanup();
})

afterAll(() => server.close())

server.events.on('request:start', ({ request }) => {
  console.log('MSW intercepted:', request.method, request.url)
})