const _ = require('lodash')

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce(
    (accumulator, currentPost) => accumulator + currentPost.likes,
    0,
  )
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) return null

  return blogs.reduce(
    (maxPost, currentPost) =>
      currentPost.likes > maxPost.likes ? currentPost : maxPost,
    blogs[0],
  )
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) return null

  const topAuthor = _.chain(blogs)
    .groupBy('author')
    .map((posts, name) => ({
      author: name,
      blogs: posts.length,
    }))
    .maxBy('blogs')
    .value()
  return topAuthor
}

const mostLikes = (blogs) => {
  if (blogs.length === 0) return null

  const topLikes = _.chain(blogs)
    .groupBy('author')
    .map((posts, author) => ({
      author: author,
      likes: _.sumBy(posts, 'likes'),
    }))
    .maxBy('likes')
    .value()
  return topLikes
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
}
