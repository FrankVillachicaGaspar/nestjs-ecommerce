import { relations } from 'drizzle-orm';
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
export const roleRelations = relations(role, ({ many }) => ({
  user: many(user),
}));

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
    roleId: integer('role_id'),
  },
  (table) => {
    return {
      usernameIndex: index('user_username_index').on(table.username),
      emailIndex: index('user_email_index').on(table.email),
    };
  },
);

export const userRelations = relations(user, ({ one }) => ({
  role: one(role, { fields: [user.roleId], references: [role.id] }),
}));

export const category = sqliteTable('category', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull().unique(),
  desc: text('desc').notNull(),
  createdAt: text('created_at').notNull(),
  modifiedAt: text('modified_at'),
  deletedAt: text('deleted_at'),
});

export const categoryRelations = relations(category, ({ many }) => ({
  product: many(product),
}));

export const product = sqliteTable(
  'product',
  {
    id: integer('id').primaryKey({ autoIncrement: true }),
    name: text('name').notNull(),
    desc: text('desc').notNull(),
    stock: integer('stock'),
    categoryId: integer('category_id'),
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

export const productRelations = relations(product, ({ one }) => ({
  category: one(category, {
    fields: [product.categoryId],
    references: [category.id],
  }),
}));

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

export const settingRelations = relations(setting, ({ many }) => ({
  settingData: many(settingData),
}));

export const settingData = sqliteTable(
  'settingData',
  {
    id: integer('id').primaryKey({ autoIncrement: true }),
    code: text('code').notNull().unique(),
    desc: text('desc').notNull(),
    value: text('value').notNull(),
    settingId: integer('setting_id'),
    createdAt: text('created_at').notNull(),
    modifiedAt: text('modified_at'),
    deletedAt: text('deleted_at'),
  },
  (table) => {
    return { codeIndex: index('setting_data_code_index').on(table.code) };
  },
);

export const settingDataRelations = relations(settingData, ({ one }) => ({
  setting: one(setting, {
    fields: [settingData.settingId],
    references: [setting.id],
  }),
}));
