const path = require('path');
const fs = require('fs');

function template({ title, css, js }) {
  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <title>${title}</title>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link href="${css}" rel="stylesheet" />
  </head>
  <body>
    <div id="root"></div>
    <script src="${js}"></script>
  </body>
</html>
`;
}

function generateHTML() {
  const content = template({
    title: 'NO JS',
    css: 'bundle.css',
    js: 'bundle.js',
  });

  fs.writeFile('dist/index.html', content, (error) => {
    if (error) console.log(error);
  });
}

function removeBuild() {
  const extensions = ['.js', '.js.map', '.css', '.css.map', '.html'];
  const outdir = 'dist';

  fs.readdir(outdir, (error, files) => {
    if (error) throw error;
    for (const file of files) {
      if (extensions.some((extension) => file.endsWith(extension))) {
        fs.unlink(path.join(outdir, file), (error) => {
          if (error) throw error;
        });
      }
    }
  });
}

module.exports = { removeBuild, generateHTML };
