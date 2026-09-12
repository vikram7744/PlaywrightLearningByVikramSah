const { test, expect } = require('../../fixtures/test');
const { api } = require('../../test-data/api');

test.describe('Posts API', () => {
  test('retrieves a post with the expected response contract @api', async ({ request }) => {
    const response = await request.get(`${api.baseURL}/posts/${api.post.existingId}`);

    await expect(response).toBeOK();
    expect(response.headers()['content-type']).toContain('application/json');

    const post = await response.json();
    expect(post).toEqual(expect.objectContaining({
      id: api.post.existingId,
      userId: expect.any(Number),
      title: expect.any(String),
      body: expect.any(String)
    }));
  });

  test('returns not found for a missing post @api', async ({ request }) => {
    const response = await request.get(`${api.baseURL}/posts/${api.post.missingId}`);

    expect(response.status()).toBe(404);
  });

  test('creates a post using a JSON request body @api', async ({ request }) => {
    const response = await request.post(`${api.baseURL}/posts`, {
      data: api.post.newPost
    });

    expect(response.status()).toBe(201);
    expect(response.headers()['content-type']).toContain('application/json');

    const createdPost = await response.json();
    expect(createdPost).toEqual(expect.objectContaining({
      ...api.post.newPost,
      id: expect.any(Number)
    }));
  });
});
