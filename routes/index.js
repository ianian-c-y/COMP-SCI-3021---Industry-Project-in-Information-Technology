var express = require('express');
var router = express.Router();
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/api/posts', async (req, res) => {
  const { title, text, img, username, branchname, isevent, ispublic, event_date } = req.body;
  const post_date = new Date();

  try {
    const query = `
      INSERT INTO posts (post_date, title, text, img, username, branchname, isevent, ispublic, event_date)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const values = [post_date, title, text, img, username, branchname, isevent, ispublic, event_date];
    await DataBase.query(query, values);
    res.status(200).json({ success: true, message: 'Post created successfully' });
  } catch (error) {
    console.error('Error creating post:', error);
    res.status(500).json({ success: false, message: 'Error creating post' });
  }
});

module.exports = router;
