const api = {
  baseURL: process.env.API_BASE_URL || 'https://jsonplaceholder.typicode.com',
  post: {
    existingId: 1,
    missingId: 101,
    newPost: {
      userId: 1,
      title: 'Playwright API test post',
      body: 'This payload is sent by a Playwright API test.'
    }
  }
};

module.exports = { api };
