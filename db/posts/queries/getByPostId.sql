SELECT 
    p.id  AS id,
    u.username AS author,
    p.title AS title,
    p.content AS content,
    p.created_at AS "createdAt",
    p.updated_at AS "updatedAt"
FROM posts AS p
JOIN users AS u ON u.id =  p.user_id
WHERE p.id = $1;