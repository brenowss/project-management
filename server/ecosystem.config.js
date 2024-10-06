module.exports = {
  apps: [
    {
      name: 'Project Management',
      script: 'npm',
      args: 'run dev',
      env: {
        NODE_ENV: 'development',
      },
    },
  ],
};
