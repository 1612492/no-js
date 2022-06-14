const esbuild = require('esbuild');
const servor = require('servor');

const { removeBuild, generateHTML } = require('./utils');

removeBuild();

esbuild
  .build({
    entryPoints: {
      bundle: 'src/app.jsx',
    },
    bundle: true,
    outdir: 'dist',
    watch: true,
  })
  .then(() => {
    generateHTML();
    servor({
      root: 'dist',
      port: 3000,
    }).then(({ url }) => console.log(`Server is running at ${url}`));
  });
