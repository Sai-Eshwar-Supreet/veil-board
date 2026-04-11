UPDATE posts
SET title = $2, content = $3, updated_at = $4
WHERE id = $1;