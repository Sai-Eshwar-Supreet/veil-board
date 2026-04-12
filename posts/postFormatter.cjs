const { getRelativeDate } = require('../lib/utils/dateUtils.cjs');

function formatPost(post) {
  return {
    ...post,
    relativeDate: getRelativeDate(post.updatedAt || post.createdAt),
  };
}

function formatPosts(posts) {
  return posts.map(formatPost);
}

module.exports.formatPost = formatPost;
module.exports.formatPosts = formatPosts;