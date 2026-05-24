#!/usr/bin/env node
/**
 * Hexo 博客快速发布脚本
 * 用法: node scripts/auto-publish.js "文章标题" "文章分类" "标签1,标签2"
 * 或配合 stdin 输入文章内容
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const postsDir = path.join(__dirname, '..', 'source', '_posts');

function generateFrontMatter(title, categories, tags) {
  const now = new Date();
  const dateStr = now.toISOString().slice(0, 19);
  const tagList = tags ? tags.split(',').map(t => t.trim()).filter(Boolean) : [];

  let fm = `---\ntitle: ${title}\ndate: ${dateStr}\n`;
  if (categories) fm += `categories:\n  - ${categories}\n`;
  if (tagList.length) fm += `tags:\n${tagList.map(t => `  - ${t}`).join('\n')}\n`;
  fm += `---\n\n`;
  return fm;
}

function createPost(title, categories, tags, content = '') {
  const slug = title.replace(/[^\w一-龥]+/g, '-').replace(/^-|-$/g, '');
  const filename = `${slug}.md`;
  const filepath = path.join(postsDir, filename);

  if (fs.existsSync(filepath)) {
    console.error(`文章已存在: ${filepath}`);
    process.exit(1);
  }

  const frontMatter = generateFrontMatter(title, categories, tags);
  fs.writeFileSync(filepath, frontMatter + content, 'utf8');
  console.log(`已创建文章: ${filepath}`);
  return filename;
}

function gitCommitAndDeploy(title) {
  try {
    const repoDir = path.join(__dirname, '..');
    process.chdir(repoDir);

    execSync('git add source/_posts/', { stdio: 'inherit' });
    execSync(`git commit -m "feat: add post ${title}"`, { stdio: 'inherit' });
    execSync('git push origin master', { stdio: 'inherit' });

    console.log('正在生成并部署...');
    execSync('hexo generate && hexo deploy', { stdio: 'inherit' });
    console.log('发布完成！');
  } catch (err) {
    console.error('发布失败:', err.message);
    process.exit(1);
  }
}

// 命令行入口
const args = process.argv.slice(2);
if (args.length < 1) {
  console.log('用法: node scripts/auto-publish.js "文章标题" [分类] [标签1,标签2]');
  process.exit(0);
}

const [title, categories, tags] = args;

// 如果有 stdin 输入，读取内容
let content = '';
if (!process.stdin.isTTY) {
  content = fs.readFileSync(0, 'utf8');
}

createPost(title, categories, tags, content);
gitCommitAndDeploy(title);
