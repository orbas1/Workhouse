const fs = require('fs');
const path = require('path');
const {
  listArticles,
  getArticle,
  addComment,
  likeArticle,
} = require('../services/articles');

describe('articles routes', () => {
  test('should define an Express router', () => {
    const filePath = path.join(__dirname, '../routes/articles.js');
    const content = fs.readFileSync(filePath, 'utf8');
    expect(content).toMatch(/express\.Router\(/);
    expect(content).toMatch(/module\.exports\s*=\s*router/);
    expect(content).toMatch(/router\.post\('\/:articleId\/comments'/);
    expect(content).toMatch(/router\.post\('\/:articleId\/like'/);
  });

  test('likeArticle increments likes and addComment appends comment', async () => {
    const first = (await listArticles())[0];
    const initialLikes = first.likes;
    const liked = await likeArticle(first.id);
    expect(liked.likes).toBe(initialLikes + 1);

    const comment = await addComment(first.id, { username: 'tester' }, 'Great read');
    const updated = await getArticle(first.id);
    expect(updated.comments.map(c => c.id)).toContain(comment.id);
  });
});
