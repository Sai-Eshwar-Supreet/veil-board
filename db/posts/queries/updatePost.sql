UPDATE posts
SET title = $2, content = $3, updated_at = now()
WHERE id = $1;