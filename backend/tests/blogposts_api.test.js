const { test, after } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const assert = require('node:assert')

const api = supertest(app)

const blogs = [
  {
    title: 'Introduction to Backend',
    author: 'Nwante Chuks',
    url: 'https://myblog.com/intro-to-backend-post',
    likes: 15,
  },
  {
    title: 'Introduction to Testing Using Node Test',
    author: 'Nwante Chuks',
    url: 'https://myblog.com/intro-to-backend-post',
    likes: 15,
  },
]

test('blogs are returned as JSON', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('number of returned blog posts is correct', async () => {
  const response = await api.get('/api/blogs')

  assert.strictEqual(response.body.length, blogs.length)
})

test('unique identifier property of the blog posts is named id', async () => {
  const response = await api.get('/api/blogs')
  const blog = response.body[0]

  assert.ok(blog)
  assert.strictEqual(Object.hasOwn(blog, 'id'), true)
})

test('successfully creates a new blog post', async () => {
  const newBlog = {
    title: 'How To Test New Blog Post',
    author: 'Nwante Solomon Chuks',
    url: 'https://myblog.com/how-to-test-new-blog-post',
    likes: 0,
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')

  const titles = response.body.map((t) => t.title)

  assert.strictEqual(response.body.length, blogs.length + 1)
  assert(titles.includes('How To Test New Blog Post'))
})

test('missing likes property defaults to the value 0', async () => {
  const newBlog = {
    title: 'How To Test New Blog Post with Missing Likes Property',
    author: 'Nwante Solomon Chuks',
    url: 'https://myblog.com/how-to-test-new-blog-post-missing-likes-property',
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')

  const createdBlog = response.body.find((blog) => blog.title === newBlog.title)
  assert.strictEqual(createdBlog.likes, 0)
})

test('missing title property responds with the status code 400 Bad Request', async () => {
  const newBlog = {
    author: 'Nwante Solomon Chuks',
    url: 'https://myblog.com/how-to-test-new-blog-post-missing-title-property',
  }

  await api.post('/api/blogs').send(newBlog).expect(400)
})

test('missing url property responds with the status code 400 Bad Request', async () => {
  const newBlog = {
    title: 'How To Test blog post with missing url property',
    author: 'Nwante Solomon Chuks',
  }

  await api.post('/api/blogs').send(newBlog).expect(400)
})

test('deletion of a note succeeds with status code 204 if id is valid', async () => {
  const blogsAtStart = await api.get('/api/blogs')
  const blogToDelete = blogsAtStart.body[0]

  await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204)

  const blogsAtEnd = await api.get('/api/blogs')

  const ids = blogsAtEnd.body.map((b) => b.id)
  assert(!ids.includes(blogToDelete.id))

  assert.strictEqual(blogsAtEnd.body.length, blogsAtStart.body.length - 1)
})

test('updates the information of an individual blog post', async () => {
  const blogsAtStart = await api.get('/api/blogs')
  const blogToUpdate = blogsAtStart.body[0]

  const updatedBlog = {
    ...blogToUpdate,
    likes: blogToUpdate.likes + 1,
  }

  await api.put(`/api/blogs/${blogToUpdate.id}`).send(updatedBlog).expect(200)

  const blogsAtEnd = await api.get('/api/blogs')
  const updatedBlogFromDb = blogsAtEnd.body.find(
    (blog) => blog.id === blogToUpdate.id,
  )

  assert.strictEqual(updatedBlogFromDb.likes, updatedBlog.likes)
})

after(async () => {
  await mongoose.connection.close()
})
