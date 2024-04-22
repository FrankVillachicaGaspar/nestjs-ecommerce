<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

<h1 align="center">E-commerce API</h1>

## Description

An e-commerce api developed with Nest JS.

## Stack

1. NestJs ([Read the doc](https://docs.nestjs.com/))
2. Drizzle ORM ([Read the doc](https://orm.drizzle.team/docs/overview))
3. Turso database ([Read the doc](https://docs.turso.tech/introduction))

## Installation

```
pnpm install
```

## Running the app

```
# Development
pnpm run start

# Watch mode
pnpm run start:dev

# Production mode
pnpm run start:prod
```

## Drizzle migrate

### Command to generate a migration

When the drizzle model has changed, run this command to make a new migration:

```
# To DEV
pnpm db-generate:dev

# To PRD
pnpm db-generate

```

### Push migration to Turso database

When the migration has generated successfully, run this command to push the migration on the Turso database:

```
# To DEV
pnpm db-push:dev

# To PRD
pnpm db-push
```

### Run Drizzle studio

If you want run drizzle studio to management your database, run this command.

```
# To DEV
pnpm db-studio:dev

# To PRD
pnpm db-studio
```

## Open request collection in Bruno api rest client
 You can open the request collection in [Bruno](https://www.usebruno.com/). The folder that you should import is "api-collection"; within this folder, you can find all the request made to API.
