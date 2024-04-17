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

## Drizzle migrate

### Command to generate a migration

When the drizzle model has changed, run this command to make a new migration:

```
pnpm db:generate

```

### Push migration to Turso database

When the migration has generated successfully, run this command to push the migration on the Turso database:

```
pnpm db:push
```
