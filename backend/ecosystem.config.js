module.exports = {
  apps: [
    {
      name: "acube-marketing-site-api",
      script: "dist/server.js",
      instances: 1,
      autorestart: true,
      watch: false,
      time: true,
      env: {
        NODE_ENV: "production",
      },
    },
  ],
};
