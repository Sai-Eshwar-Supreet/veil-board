INSERT INTO roles (name) 
VALUES 
    ('admin'),
    ('member'),
    ('user')
ON CONFLICT (name) DO NOTHING;

INSERT INTO actions (name)
VALUES 
    ('create_post'),
    ('update_post'),
    ('delete_post')
ON CONFLICT (name) DO NOTHING;

INSERT INTO role_actions (role_id, action_id)
SELECT r.id, a.id
FROM roles AS r
CROSS JOIN actions AS a
WHERE r.name = 'admin'
ON CONFLICT DO NOTHING;

INSERT INTO role_actions (role_id, action_id)
SELECT r.id, a.id
FROM roles AS r
JOIN actions AS a ON a.name IN ('create_post', 'update_post', 'delete_post')
WHERE r.name = 'member'
ON CONFLICT DO NOTHING;