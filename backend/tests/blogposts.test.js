const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')

const blog = [
  {
    _id: '6ae89829d3c2ffc31654f61a',
    title: 'Introduction to Backend Testing with Node Test',
    author: 'Nwante Solomon Chuks',
    url: 'https://myblog.com/intro-to-backend-testing-with-node-test',
    likes: 20,
    __v: 0,
  },
]

const blogs = [
  {
    _id: '6ae89829d3c2ffc31654f61a',
    title: 'Introduction to Backend Testing with Node Test',
    author: 'Nwante Solomon Chuks',
    url: 'https://myblog.com/intro-to-backend-testing-with-node-test',
    likes: 20,
    __v: 0,
  },
  {
    _id: '6ae30a61d43f40f0f1cf8064',
    title: 'Introduction to Blogging',
    author: 'Nwante Solomon Chuks',
    url: 'https://myblog.com/intro-to-blog-post',
    likes: 5,
    __v: 0,
  },
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    __v: 0,
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0,
  },
  {
    _id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    __v: 0,
  },
  {
    _id: '5a422b891b54a676234d17fa',
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
    __v: 0,
  },
  {
    _id: '5a422ba71b54a676234d17fb',
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
    __v: 0,
  },
  {
    _id: '5a422bc61b54a676234d17fc',
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
    __v: 0,
  },
]

test('dummy returns one', () => {
  const blogs = []
  const result = listHelper.dummy(blogs)
  assert.strictEqual(result, 1)
})

describe('Total likes', () => {
  test('of empty list is zero', () => {
    const result = listHelper.totalLikes([])
    assert.strictEqual(result, 0)
  })

  test('when list has only one blog equals the likes of that', () => {
    const result = listHelper.totalLikes(blog)
    assert.strictEqual(result, 20)
  })

  test('returns blog post total likes', () => {
    const result = listHelper.totalLikes(blogs)
    assert.strictEqual(result, 61)
  })
})

describe('favorite blog post', () => {
  test('returns most liked post', () => {
    const result = listHelper.favoriteBlog(blogs)
    assert.deepStrictEqual(result, blogs[0])
  })
})

describe('most blogs', () => {
  test('returns the author who has the largest amount of blogs', () => {
    const result = listHelper.mostBlogs(blogs)
    assert.deepStrictEqual(result, {
      author: 'Robert C. Martin',
      blogs: 3,
    })
  })
})

describe('most likes', () => {
  test('returns the author whose blog posts have the largest amount of likes', () => {
    const result = listHelper.mostLikes(blogs)
    assert.deepStrictEqual(result, {
      author: 'Nwante Solomon Chuks',
      likes: 25,
    })
  })
})
