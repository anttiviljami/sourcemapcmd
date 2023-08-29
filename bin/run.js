#!/usr/bin/env node
const yargs = require("yargs/yargs");
const { hideBin } = require("yargs/helpers");

const { SourceMapConsumer } = require("source-map");
const chalk = require("chalk");
const ora = require("ora");

const main = async () => {
  const command = yargs(hideBin(process.argv))
    .demand(2)
    .usage(`npx sourcemapcmd <bundleURL> <line>:<column> [--verbose]`)
    .option("verbose", {
      alias: "v",
      type: "boolean",
      description: "Verbose mode",
    })
    .help('h')
    .alias('h', 'help');

  const [bundleURL, position] = command.argv._;

  if (
    !bundleURL ||
    !position ||
    !bundleURL.startsWith?.("http") ||
    !position.includes?.(":")
  ) {
    command.showHelp();
    process.exit(1);
  }

  const [line, column] = position.split(":");

  const sourceMapURLObj = new URL(bundleURL);
  sourceMapURLObj.pathname = `${sourceMapURLObj.pathname}.map`;

  const sourceMapUrl = sourceMapURLObj.toString();

  const verbose = argv.verbose || argv["v"];

  const loading = ora(`Fetching source map ${sourceMapUrl}`).start();

  const sourceMap = await fetch(sourceMapUrl).then((res) => res.json());

  loading.succeed();

  if (verbose) {
    console.warn("===> Loaded source map", {
      file: sourceMap.file,
      sources: sourceMap.sources,
    });
  }
  const consumer = await new SourceMapConsumer(sourceMap);

  if (verbose) {
    console.warn(chalk.bold("\nResolved:"));
  }
  const originalPosition = consumer.originalPositionFor({
    line: parseInt(line, 10),
    column: parseInt(column, 10),
  });

  console.log(JSON.stringify(originalPosition, null, 2));
};

main();
