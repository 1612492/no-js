const esbuild = require("esbuild");
const fs = require("fs");
const path = require("path");
const parser = require("yargs-parser");

const outdir = "build";

fs.readdir(outdir, (err, files) => {
  if (err) throw err;
  for (const file of files) {
    if (
      file.endsWith(".js") ||
      file.endsWith(".css") ||
      file.endsWith(".js.map")
    ) {
      fs.unlink(path.join(outdir, file), (err) => {
        if (err) throw err;
      });
    }
  }
});

const config = parser(process.argv, {
  boolean: ["watch", "build"],
});

if (config.build) {
  console.log("Building");
  esbuild.build({
    entryPoints: ["src/app.jsx"],
    outdir,
    bundle: true,
    minify: true,
  });
}

if (config.watch) {
  esbuild.build({
    entryPoints: ["src/app.jsx"],
    outdir,
    bundle: true,
    sourcemap: true,
    minify: false,
    watch: true,
  });

  console.log("Server is running at: http://localhost:3000");
  serve();
}

async function serve() {
  const servor = require("servor");

  await servor({
    browser: true,
    root: outdir,
    port: 3000,
  });
}
