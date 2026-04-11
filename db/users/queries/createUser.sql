WITH new_user AS (
    INSERT INTO users (username, password_hash) 
    VALUES ($1, $2) RETURNING id
)

INSERT INTO user_roles (user_id, role_id)
SELECT 
    u.id,
    r.id
FROM new_user AS u
JOIN roles AS r ON r.name = 'user';