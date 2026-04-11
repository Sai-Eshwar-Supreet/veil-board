SELECT 
    u.id AS id,
    u.username AS username,
    u.password_hash AS "passwordHash",
    u.created_at AS "createdAt",
    ARRAY_AGG(DISTINCT r.name) AS roles,
    ARRAY_AGG(DISTINCT a.name) AS "authorizedActions"
FROM users AS u
LEFT JOIN user_roles AS ur ON ur.user_id = u.id
LEFT JOIN roles AS r ON r.id = ur.role_id
LEFT JOIN role_actions AS ra ON ra.role_id = r.id
LEFT JOIN actions AS a ON a.id = ra.action_id
WHERE u.id = $1
GROUP BY u.id;