import { test, expect } from '@playwright/test';
import Ajv from 'ajv';
import addFormats from "ajv-formats";

test('GET /products/1 returns expected product details and schema', async ({ request }) => {
  const url = 'https://fakestoreapi.com/products/1';
  const response = await request.get(url);

  expect(response.status()).toBe(200);

  const responseBody = await response.json();

  expect(responseBody).toEqual(expect.objectContaining({
    id: expect.any(Number),
    title: expect.any(String),
    price: expect.any(Number),
    category: expect.any(String),
    description: expect.any(String),
  }));

  console.log(`Product title: ${responseBody.title}`);
  console.log(`Product price: ${responseBody.price}`);

  const productSchema = {
    type: 'object',
    required: ['id', 'title', 'price', 'category', 'description'],
    properties: {
      id: { type: 'number' },
      title: { type: 'string' },
      price: { type: 'number' },
      category: { type: 'string' },
      description: { type: 'string' },
    },
    additionalProperties: true,
  };

  const ajv = new Ajv();
  addFormats(ajv);
  const validate = ajv.compile(productSchema);
  const valid = validate(responseBody);

  if (!valid) {
    console.error('JSON schema validation errors:', validate.errors);
  }

  expect(valid).toBeTruthy();
});
