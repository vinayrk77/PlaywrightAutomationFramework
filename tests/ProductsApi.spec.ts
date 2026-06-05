import { test, expect } from '@playwright/test';
import Ajv from 'ajv';

test('GET post returns response and schema', async ({ request }) => {

  const response = await request.get(
    'https://jsonplaceholder.typicode.com/posts/1'
  );

  expect(response.status()).toBe(200);

  const responseBody = await response.json();

  expect(responseBody).toEqual(
    expect.objectContaining({
      userId: expect.any(Number),
      id: expect.any(Number),
      title: expect.any(String),
      body: expect.any(String),
    })
  );

  const schema = {
    type: 'object',
    required: ['userId', 'id', 'title', 'body'],
    properties: {
      userId: { type: 'number' },
      id: { type: 'number' },
      title: { type: 'string' },
      body: { type: 'string' },
    },
    additionalProperties: true,
  };

  const ajv = new Ajv();
  const validate = ajv.compile(schema);

  expect(validate(responseBody)).toBeTruthy();
});