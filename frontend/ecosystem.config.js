require('dotenv').config({ path: './.env.deploy' });

const {
  DEPLOY_USER, DEPLOY_HOST, DEPLOY_PATH, DEPLOY_REF = 'origin/master',
} = process.env;

module.exports = {
  // apps: [{
  //   name: 'mesto-frontend',
  //   script: './src/index.js',
  // }],
  // Настройка деплоя
  deploy: {
    production: {
      user: DEPLOY_USER,
      host: DEPLOY_HOST,
      ref: DEPLOY_REF,
      repo: 'https://github.com/ValeryVigovskaya/web-plus-pm2-deploy.git',
      path: DEPLOY_PATH,
      'pre-deploy-local': `npm run build && scp -Cr ./build/* ${DEPLOY_USER}@${DEPLOY_HOST}:${DEPLOY_PATH}`,
      'post-deploy': 'cd frontend && npm install && pm2 startOrReksstart ecosystem.json --env production',
    },
  },
};
