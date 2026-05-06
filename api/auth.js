const fs = require('fs');
const path = require('path');

module.exports = async (req, res) => {
    if (req.method !== 'POST') return res.status(405).send('Method not allowed');
    const { action, username, password, title, content } = req.body;
    const usersPath = path.join(__dirname, '../data/users.json');
    const postsPath = path.join(__dirname, '../data/posts.json');

    if (action === 'register') {
        let users = JSON.parse(fs.readFileSync(usersPath, 'utf8') || '[]');
        const newUser = {
            u: Buffer.from(username).toString('base64'),
            p: Buffer.from(password).toString('base64')
        };
        users.push(newUser);
        fs.writeFileSync(usersPath, JSON.stringify(users));
        return res.status(200).json({success: true});
    }
    
    if (action === 'post') {
        // Validación simplificada
        let posts = JSON.parse(fs.readFileSync(postsPath, 'utf8') || '[]');
        posts.push({ title, content, date: new Date().toLocaleDateString() });
        fs.writeFileSync(postsPath, JSON.stringify(posts));
        return res.status(200).json({success: true});
    }

    res.status(400).send('Invalid action');
};
