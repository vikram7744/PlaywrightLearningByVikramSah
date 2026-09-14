class PostsClient {
  constructor(request, baseURL) {
    this.request = request;
    this.baseURL = baseURL;
  }

  async getPost(id) {
    return this.request.get(`${this.baseURL}/posts/${id}`);
  }

  async createPost(post) {
    return this.request.post(`${this.baseURL}/posts`, { data: post });
  }
}

module.exports = { PostsClient };
