CREATE TABLE "car_makes" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"image_url" text NOT NULL,
	"created_at" text DEFAULT (CURRENT_TIMESTAMP),
	"updated_at" text DEFAULT (CURRENT_TIMESTAMP),
	CONSTRAINT "car_makes_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE "car_models" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"created_on" text DEFAULT (CURRENT_TIMESTAMP),
	"updated_on" text DEFAULT (CURRENT_TIMESTAMP),
	"car_make" text NOT NULL,
	CONSTRAINT "car_models_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE "cars" (
	"id" text PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"year_of_manufacture" numeric NOT NULL,
	"min_price" numeric NOT NULL,
	"color" text NOT NULL,
	"image_url" text NOT NULL,
	"vip_status" text DEFAULT 'NON_VIP' NOT NULL,
	"purchase_status" text DEFAULT 'AVAILABLE' NOT NULL,
	"created_on" text DEFAULT (CURRENT_TIMESTAMP),
	"updated_on" text DEFAULT (CURRENT_TIMESTAMP),
	"car_make" text NOT NULL,
	"car_model" text NOT NULL,
	CONSTRAINT "cars_title_unique" UNIQUE("title"),
	CONSTRAINT "car_min_price_check_size" CHECK ("cars"."min_price" > 0)
);
--> statement-breakpoint
ALTER TABLE "car_models" ADD CONSTRAINT "car_models_car_make_car_makes_id_fk" FOREIGN KEY ("car_make") REFERENCES "public"."car_makes"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "cars" ADD CONSTRAINT "cars_car_make_car_makes_id_fk" FOREIGN KEY ("car_make") REFERENCES "public"."car_makes"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "cars" ADD CONSTRAINT "cars_car_model_car_models_id_fk" FOREIGN KEY ("car_model") REFERENCES "public"."car_models"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "car_created_on_idx" ON "cars" USING btree ("created_on");