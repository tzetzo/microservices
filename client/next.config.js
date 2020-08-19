// file auto loaded by Next.js
// this serves file change detection in our Next.js app
// fixes an issue with updating running next.js apps in K8s Cluster
module.exports = {
  webpackDevMiddleware: (config) => {
    config.watchOptions.poll = 300; //every 300 milliseconds all changes in the next.js app are pulled
    return config;
  },
};
