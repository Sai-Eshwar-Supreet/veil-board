function canCreatePost(user){
    return user?.authorizedActions?.includes('create_post');
}

function canUpdatePost(user, postAuthor){
    const isOwner = user.username === postAuthor;

    return isOwner && (user.authorizedActions.includes('update_post'))
}

function canDeletePost(user, postAuthor){
    const isOwner = user.username === postAuthor;
    const isAdmin = user.roles.includes('admin');

    return (isAdmin || isOwner) && (user.authorizedActions.includes('delete_post'))
}

function canBecomeMember(user){
    return !user.roles.includes('member');
}

module.exports.canCreatePost = canCreatePost;
module.exports.canUpdatePost = canUpdatePost;
module.exports.canDeletePost = canDeletePost;
module.exports.canBecomeMember = canBecomeMember;