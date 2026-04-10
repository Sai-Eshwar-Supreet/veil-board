INSERT INTO roles (name) 
VALUES 
    ('admin'),
    ('member')
ON CONFLICT (name) DO NOTHING;

INSERT INTO actions (name)
VALUES 
    ('view_message_info'),
    ('create_post'),
    ('delete_post'),
    ('delete_post_any')
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
JOIN actions AS a ON a.name IN ('view_message_info', 'create_post', 'delete_post')
WHERE r.name = 'member'
ON CONFLICT DO NOTHING;