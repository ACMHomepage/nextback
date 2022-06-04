import { spawnSync } from 'node:child_process';

const image = 'acmhomepage-nextback-database';

const buildCommand = async () => {
  await $`docker build -f Dockerfile.mysql -t ${image} .`
};

const startCommand = async () => {
  await $`docker run -d -p 3306:3306 --name ${image} ${image}`;
};

const cliCommand = async () => {
  // TODO: Why we use spawnSync rather than `$` function:
  // https://github.com/google/zx/discussions/426
  spawnSync(
    "mysql",
    ['-h', 'localhost', '-P', '3306', '-u', 'root', '-proot'],
    { stdio: 'inherit' }
  );
};

const stopCommand = async () => {
  await $`docker rm -f ${image}`;
};

const main = async () => {
  let command = argv._.slice(1);
  const commandChoices = ['build', 'start', 'cli', 'stop'];
  
  if (command.length > 1) {
    console.error('Too many command!');
    return;
  } else if (command.length === 1) {
    command = command[0];
    if(!commandChoices.includes(command)) {
      console.error(
        'Command',
        JSON.stringify(command),
        'does not in command array',
        JSON.stringify(commandChoices),
      );
      return;
    }
  } else {
    console.log('usage: ./scripts/docker-compose.mjs <command>');
    console.log('  <command>');
    console.log('    build - build the database docker image');
    console.log('    start - run the database docker container');
    console.log('    cli - run a command line interface');
    console.log('    stop - remove the database docker container');
    return;
  }

  if (command === 'build') {
    await buildCommand();
  } else if (command === 'start') {
    await startCommand();
  } else if (command === 'cli') {
    await cliCommand();
  } else {
    await stopCommand();
  }
}

await main();