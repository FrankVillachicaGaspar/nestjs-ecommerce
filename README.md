<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

<h1 align="center">E-commerce API</h1>

## Description

An e-commerce api developed with Nest JS.

## Stack

1. NestJs
2. Prisma ORM

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

## Prisma migrate

### Diff command

When the prisma model has changed, run this command to generate the sql file that will contain only the necessary sql statements that our databases needs to align to the new model:

```
pnpm prisma migrate diff --from-migrations prisma/migrations --to-schema-datamodel prisma/schema.prisma --script prisma/diff.sql

```

### Update Turso database

When the diff sql file has been generated, run this command to apply the new changes to the database structure:

```
# Check tha Turso documentation for install the CLI
Turso db shell ecommerce < prisma/diff.sql
```

### Migrate change to dev database

To migrate the lasted change of the models to the dev database, run this command:

```
pnpm prisma migrate dev
```
