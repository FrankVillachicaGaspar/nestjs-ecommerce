import {
  index,
  integer,
  real,
  sqliteTable,
  text,
} from 'drizzle-orm/sqlite-core';

export const role = sqliteTable(
  'role',
  {
    id: integer('id').primaryKey({ autoIncrement: true }),
    name: text('name').notNull().unique(),
    createdAt: text('created_at').notNull(),
    modifiedAt: text('modified_at'),
    deletedAt: text('deleted_at'),
  },
  (table) => {
    return {
      nameIndex: index('role_name_index').on(table.name),
    };
  },
);

export const user = sqliteTable(
  'user',
  {
    id: integer('id').primaryKey({ autoIncrement: true }),
    username: text('username').notNull().unique(),
    email: text('email').notNull().unique(),
    password: text('password').notNull(),
    firstName: text('first_name').notNull(),
    lastName: text('last_name').notNull(),
    phoneNumber: text('phone_number').unique(),
    createdAt: text('created_at').notNull(),
    modifiedAt: text('modified_at'),
    deletedAt: text('deleted_at'),

    roleId: integer('role_id').references(() => role.id),
  },
  (table) => {
    return {
      usernameIndex: index('user_username_index').on(table.username),
      emailIndex: index('user_email_index').on(table.email),
    };
  },
);

export const category = sqliteTable('category', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull().unique(),
  desc: text('desc').notNull(),
  createdAt: text('created_at').notNull(),
  modifiedAt: text('modified_at'),
  deletedAt: text('deleted_at'),
});

export const product = sqliteTable(
  'product',
  {
    id: integer('id').primaryKey({ autoIncrement: true }),
    name: text('name').notNull(),
    desc: text('desc').notNull(),
    stock: integer('stock'),
    categoryId: integer('category_id').references(() => category.id),
    price: real('price'),
    createdAt: text('created_at').notNull(),
    modifiedAt: text('modified_at'),
    deletedAt: text('deleted_at'),
  },
  (table) => {
    return {
      nameIndex: index('product_name_index').on(table.name),
    };
  },
);

export const setting = sqliteTable(
  'setting',
  {
    id: integer('id').primaryKey({ autoIncrement: true }),
    code: text('code').notNull().unique(),
    desc: text('desc').notNull(),
    createdAt: text('created_at').notNull(),
    modifiedAt: text('modified_at'),
    deletedAt: text('deleted_at'),
  },
  (table) => {
    return { codeIndex: index('setting_code_index').on(table.code) };
  },
);

export const settingData = sqliteTable(
  'settingData',
  {
    id: integer('id').primaryKey({ autoIncrement: true }),
    code: text('code').notNull().unique(),
    desc: text('desc').notNull(),
    value: text('value').notNull(),
    settingId: integer('setting_id').references(() => setting.id),
    createdAt: text('created_at').notNull(),
    modifiedAt: text('modified_at'),
    deletedAt: text('deleted_at'),
  },
  (table) => {
    return { codeIndex: index('setting_data_code_index').on(table.code) };
  },
);
