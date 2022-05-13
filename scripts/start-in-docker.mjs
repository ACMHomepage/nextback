#!/usr/bin/env zx

import initDatabase from './init-database.mjs';

// Get DB connection
let { stdout: ormConfig } = await quiet($`cat ./ormconfig.json`);
ormConfig = JSON.parse(ormConfig);
console.log('get orm config:', ormConfig);

const { host, port, password, username: user, database } = ormConfig;

// Link to database and init it.
initDatabase({ host, port, user, password, database });

// Run backend
const command = process.argv[3];
await $`yarn ${command}`;