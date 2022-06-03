const build = async () => {
  await $`docker-compose -f docker-compose.yml build`;
}

const start = async () => {
  await $`docker-compose -f docker-compose.yml up`;
}

const main = async () => {
  let command = argv._.slice(1);
  const commandChoices = ['build', 'start'];
  
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
    console.log('    build - build the docker compose');
    console.log('    start - run the docker compose');
    return;
  }

  if (command === 'build') {
    await build();
  } else {
    await start();
  }
}

await main();