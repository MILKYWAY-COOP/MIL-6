-- CreateTable
CREATE TABLE "public"."User" (
    "id" SERIAL NOT NULL,
    "user_name" VARCHAR(16) NOT NULL,
    "dob" DATE NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_user_name_key" ON "public"."User"("user_name");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "public"."User"("email");
