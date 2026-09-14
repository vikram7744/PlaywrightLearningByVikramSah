const { test, expect } = require('../../fixtures/test');
const { PostsClient } = require('../../api/PostsClient');
const { postSchema } = require('../../schemas/post.schema');
const { api } = require('../../test-data/api');

test.describe('Posts API', () => {
  test('retrieves a post with the expected response contract @api', async ({ request }) => {
    const postsClient = new PostsClient(request, api.baseURL);
    const response = await postsClient.getPost(api.post.existingId);

    await expect(response).toBeOK();
    expect(response.headers()['content-type']).toContain('application/json');

    const post = postSchema.parse(await response.json());
    expect(post.id).toBe(api.post.existingId);
  });

  test('returns not found for a missing post @api', async ({ request }) => {
    const postsClient = new PostsClient(request, api.baseURL);
    const response = await postsClient.getPost(api.post.missingId);

    expect(response.status()).toBe(404);
  });

  test('creates a post using a JSON request body @api', async ({ request }) => {
    const postsClient = new PostsClient(request, api.baseURL);
    const response = await postsClient.createPost(api.post.newPost);

    expect(response.status()).toBe(201);
    expect(response.headers()['content-type']).toContain('application/json');

    const createdPost = postSchema.parse(await response.json());
    expect(createdPost).toMatchObject(api.post.newPost);
  });
});
