CREATE TABLE `category` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`desc` text NOT NULL,
	`created_at` text NOT NULL,
	`modified_at` text,
	`deleted_at` text
);
--> statement-breakpoint
CREATE TABLE `product` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`desc` text NOT NULL,
	`stock` integer,
	`category_id` integer,
	`price` real,
	`created_at` text NOT NULL,
	`modified_at` text,
	`deleted_at` text,
	FOREIGN KEY (`category_id`) REFERENCES `category`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `role` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`created_at` text NOT NULL,
	`modified_at` text,
	`deleted_at` text
);
--> statement-breakpoint
CREATE TABLE `setting` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`code` text NOT NULL,
	`desc` text NOT NULL,
	`created_at` text NOT NULL,
	`modified_at` text,
	`deleted_at` text
);
--> statement-breakpoint
CREATE TABLE `settingData` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`code` text NOT NULL,
	`desc` text NOT NULL,
	`value` text NOT NULL,
	`setting_id` integer,
	`created_at` text NOT NULL,
	`modified_at` text,
	`deleted_at` text,
	FOREIGN KEY (`setting_id`) REFERENCES `setting`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `user` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`username` text NOT NULL,
	`email` text NOT NULL,
	`password` text NOT NULL,
	`first_name` text NOT NULL,
	`last_name` text NOT NULL,
	`phone_number` text,
	`created_at` text NOT NULL,
	`modified_at` text,
	`deleted_at` text,
	`role_id` integer,
	FOREIGN KEY (`role_id`) REFERENCES `role`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE INDEX `product_name_index` ON `product` (`name`);--> statement-breakpoint
CREATE INDEX `role_name_index` ON `role` (`name`);--> statement-breakpoint
CREATE UNIQUE INDEX `setting_code_unique` ON `setting` (`code`);--> statement-breakpoint
CREATE INDEX `setting_code_index` ON `setting` (`code`);--> statement-breakpoint
CREATE UNIQUE INDEX `settingData_code_unique` ON `settingData` (`code`);--> statement-breakpoint
CREATE INDEX `setting_data_code_index` ON `settingData` (`code`);--> statement-breakpoint
CREATE UNIQUE INDEX `user_username_unique` ON `user` (`username`);--> statement-breakpoint
CREATE UNIQUE INDEX `user_email_unique` ON `user` (`email`);--> statement-breakpoint
CREATE INDEX `user_username_index` ON `user` (`username`);--> statement-breakpoint
CREATE INDEX `user_email_index` ON `user` (`email`);