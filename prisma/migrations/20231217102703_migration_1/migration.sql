-- CreateTable
CREATE TABLE "player" (
    "player_id" SERIAL NOT NULL,
    "name" VARCHAR(100),
    "from" INTEGER,
    "to" INTEGER,
    "pos" TEXT,
    "ht" INTEGER,
    "wt" DECIMAL(4,1),
    "birth_date" DATE,
    "colleges" VARCHAR(200),

    CONSTRAINT "player_pkey" PRIMARY KEY ("player_id")
);
