require('dotenv').config({ path: './.env.deploy' });

const {
  DEPLOY_USER, DEPLOY_HOST, DEPLOY_PATH, DEPLOY_REF = 'origin/master',
} = process.env;

module.exports = {
  apps: [{
    name: 'full-mesto',
    script: './dist/app.js',
  }],

  // Настройка деплоя
  deploy: {
    production: {
      user: DEPLOY_USER,
      host: DEPLOY_HOST,
      ref: DEPLOY_REF,
      repo: 'https://github.com/ValeryVigovskaya/web-plus-pm2-deploy.git',
      cwd: 'backend',
      path: DEPLOY_PATH,
      'pre-deploy-local': `scripts/deployEnv.sh ${DEPLOY_USER}@${DEPLOY_HOST}:${DEPLOY_PATH}`,
      // 'pre-deploy': 'pm2 startOrRestart ecosystem.json --env production',
      'post-deploy': 'npm i && npm run start && pm2 startOrRestart ecosystem.json --env production',
    },
  },
};
