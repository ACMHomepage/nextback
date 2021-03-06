## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Production

If you want to run as a production, you need nothing but docker (yes you even do **not** need install `yarn`, `nodejs` and so on, we will install it auto when we are building the docker-compose).

```bash
$ docker-compose -f docker-compose.yml build
$ docker-compose -f docker-compose.yml up
```

But... if you have `yarn`, you can enter those commands instead of commands above (short and easy to input):

```bash
$ yarn docker-compose build
$ yarn docker-Compose start
```

## Installation

```bash
$ yarn
```

## Devlopment

Before run command below, you need to install the project's dependencies (see sub-section 'Installation')

We can use those to run the nextback **without** database:

```bash
# development mode with watch mode
$ yarn start --mode=dev

# production mode
$ yarn start --mode=prod
```

And if we are in devlopment, the backend will try to connect the database at `localhost` but not the `host` in `./ormconfig.json`.

Yes, but we need database. You can read the sub-section 'Run a empty database' for more infomation.

## Run the empty database

Those command will help you if you want to create a empty database at `localhost`.

```bash
# This command will create a database docker image.
$ yarn database build

# This command will run a database container at port 3306
$ yarn database start

# This command create a cli for you.
$ yarn database cli

# This command will remove the database container
$ yarn database stop
```

### Debug

1. First of all, try to enter `yarn database stop` and retry.
2. Maybe you find that the we cannot get the port 3306. Try to use `lsof -i:3306` (or `sudo lsof -i:3306`). And kill it (if it is not your machine, ask manager).

## Test

```bash
# unit tests
$ yarn test

# e2e tests
$ yarn test:e2e

# test coverage
$ yarn test:cov
```