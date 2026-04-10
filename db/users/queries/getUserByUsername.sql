SELECT 
    u.id AS id,
    u.username AS username,
    u.password_hash AS "passwordHash",
    u.created_at AS "createdAt",
    ARRAY_AGG(DISTINCT r.name),
    ARRAY_AGG(DISTINCT a.name),
FROM users AS u
JOIN user_roles AS ur ON ur.user_id = u.id
JOIN roles AS r ON r.id = ur.role_id
JOIN role_actions AS ra ON ra.role_id = r.id
JOIN actions AS a ON a.id = ra.action_id
WHERE u.username = $1;