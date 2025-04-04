CREATE TABLE `contexts` (
	`transaction_id` varchar(36) NOT NULL,
	`domain` varchar(50),
	`action` varchar(50),
	`country` varchar(3),
	`city` varchar(50),
	`core_version` varchar(10),
	`bap_id` varchar(100),
	`bap_uri` varchar(255),
	`message_id` varchar(36),
	`timestamp` datetime,
	`bpp_id` varchar(100),
	`bpp_uri` varchar(255),
	CONSTRAINT `contexts_transaction_id` PRIMARY KEY(`transaction_id`)
);
--> statement-breakpoint
CREATE TABLE `orders` (
	`id` varchar(50) NOT NULL,
	`state` varchar(50),
	`created_at` datetime,
	`updated_at` datetime,
	`transaction_id` varchar(36),
	CONSTRAINT `orders_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `addresses` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`billing_id` int,
	`name` varchar(100),
	`building` text,
	`locality` text,
	`city` varchar(50),
	`state` varchar(50),
	`country` varchar(3),
	`area_code` varchar(20),
	CONSTRAINT `addresses_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `billings` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`order_id` varchar(50),
	`name` varchar(100),
	`email` varchar(100),
	`phone` varchar(20),
	`created_at` datetime,
	`updated_at` datetime,
	CONSTRAINT `billings_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `payments` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`order_id` varchar(50),
	`uri` text,
	`status` varchar(50),
	`type` varchar(50),
	`collected_by` varchar(50),
	`tl_method` varchar(50),
	`amount` decimal(10,2),
	`currency` varchar(3),
	`transaction_id` varchar(50),
	CONSTRAINT `payments_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `settlement_details` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`payment_id` int,
	`counterparty` varchar(50),
	`phase` varchar(50),
	`type` varchar(50),
	`bank_account` varchar(50),
	`ifsc_code` varchar(50),
	`beneficiary_name` varchar(100),
	`bank_name` varchar(100),
	`branch_name` varchar(100),
	`timestamp` datetime,
	`amount` decimal(10,2),
	CONSTRAINT `settlement_details_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `fulfillments` (
	`id` varchar(50) NOT NULL,
	`order_id` varchar(50),
	`type` varchar(50),
	`tracking` boolean,
	`state_code` varchar(50),
	CONSTRAINT `fulfillments_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `locations` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`fulfillment_id` varchar(50),
	`gps` varchar(50),
	`type` varchar(20),
	`building` text,
	`locality` text,
	`city` varchar(50),
	`state` varchar(50),
	`area_code` varchar(20),
	CONSTRAINT `locations_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `contacts` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`name` varchar(100),
	`phone` varchar(20) NOT NULL,
	`email` varchar(100) NOT NULL,
	`person_name` varchar(100),
	CONSTRAINT `contacts_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `quote_breakups` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`quote_id` int,
	`title` text,
	`value` decimal(10,2),
	`item_id` varchar(50),
	`title_type` varchar(50),
	`quantity` int,
	CONSTRAINT `quote_breakups_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `quotes` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`order_id` varchar(50),
	`currency` varchar(3),
	`value` decimal(10,2),
	`ttl` varchar(50),
	CONSTRAINT `quotes_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `items` (
	`id` varchar(50) NOT NULL,
	`order_id` varchar(50),
	`fulfillment_id` varchar(50),
	`quantity` int,
	CONSTRAINT `items_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `orders` ADD CONSTRAINT `orders_transaction_id_contexts_transaction_id_fk` FOREIGN KEY (`transaction_id`) REFERENCES `contexts`(`transaction_id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `addresses` ADD CONSTRAINT `addresses_billing_id_billings_id_fk` FOREIGN KEY (`billing_id`) REFERENCES `billings`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `billings` ADD CONSTRAINT `billings_order_id_orders_id_fk` FOREIGN KEY (`order_id`) REFERENCES `orders`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `payments` ADD CONSTRAINT `payments_order_id_orders_id_fk` FOREIGN KEY (`order_id`) REFERENCES `orders`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `settlement_details` ADD CONSTRAINT `settlement_details_payment_id_payments_id_fk` FOREIGN KEY (`payment_id`) REFERENCES `payments`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `fulfillments` ADD CONSTRAINT `fulfillments_order_id_orders_id_fk` FOREIGN KEY (`order_id`) REFERENCES `orders`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `quote_breakups` ADD CONSTRAINT `quote_breakups_quote_id_quotes_id_fk` FOREIGN KEY (`quote_id`) REFERENCES `quotes`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `quotes` ADD CONSTRAINT `quotes_order_id_orders_id_fk` FOREIGN KEY (`order_id`) REFERENCES `orders`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `items` ADD CONSTRAINT `items_order_id_orders_id_fk` FOREIGN KEY (`order_id`) REFERENCES `orders`(`id`) ON DELETE no action ON UPDATE no action;