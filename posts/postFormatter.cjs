const { getRelativeDate } = require('../lib/utils/dateUtils.cjs');

function formatPost(post) {
  return {
    ...post,
    createdAtRelative: getRelativeDate(post.createdAt),
    updatedAtRelative: getRelativeDate(post.updatedAt),
  };
}

function formatPosts(posts) {
  return posts.map(formatPost);
}

module.exports.formatPost = formatPost;
module.exports.formatPosts = formatPosts;