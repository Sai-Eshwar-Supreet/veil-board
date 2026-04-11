INSERT INTO user_roles (user_id, role_id)
SELECT u.id, r.id
FROM users AS u
JOIN roles AS r ON r.name = $2
WHERE u.id = $1
ON CONFLICT DO NOTHING;