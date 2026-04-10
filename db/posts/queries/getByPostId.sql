SELECT 
    p.id  AS "postId",
    u.username AS username,
    p.title AS title,
    p.content AS content,
    p.created_at AS "createdAt",
    p.updated_at AS "updatedAt"
FROM posts AS p
JOIN users AS u ON u.id =  p.user_id
WHERE p.id = $1;