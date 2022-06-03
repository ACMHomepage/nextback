#! /usr/bin/env zx

import initDatabase from "./commons/init-database.mjs";

let ormConfig = JSON.parse(await fs.readFile('./ormconfig.json'));

const runInDevMode = async () => {
  ormConfig.host = 'localhost';
  initDatabase(ormConfig);
  await $`NODE_ENV=dev nest start --watch`;
};

const runInProdMode = async () => {
  initDatabase(ormConfig);
    await $`NODE_ENV=prod node dist/main`;
}

const main = async () => {
  let mode = argv.mode;
  const choices = ['dev', 'prod'];
  
  if (mode === undefined) {
    console.log('usage: ./scripts/start.mjs --mode <mode>');
    console.log('  <mode> - This mode context when the backend core running');
    console.log('    dev - run in dev mode. connect to service in localhost');
    console.log('    prod - run in prod mode, which should only run in docker container');
    return;
  }
  if (!choices.includes(mode)) {
    console.error(
      'Mode',
      JSON.stringify(mode),
      'does not in mode array',
      JSON.stringify(choices)
    );
    return;
  }
  
  if (mode === 'dev') {
    await runInDevMode();
  } else {
    await runInProdMode();
  }
};

await main();