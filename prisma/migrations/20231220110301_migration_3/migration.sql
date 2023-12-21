/*
  Warnings:

  - You are about to drop the column `name` on the `player` table. All the data in the column will be lost.
  - Added the required column `player_name` to the `player` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "player" DROP COLUMN "name",
ADD COLUMN     "player_name" VARCHAR(100) NOT NULL;

-- CreateTable
CREATE TABLE "individual_awards" (
    "player_id" INTEGER NOT NULL,
    "player_name" TEXT,
    "lg" TEXT,
    "mvp_count" BIGINT,
    "mvp_seasons" TEXT,
    "roy_season" TEXT,
    "dpoy_count" BIGINT,
    "dpoy_seasons" TEXT,
    "mip_count" BIGINT,
    "mip_seasons" TEXT,
    "smoy_count" BIGINT,
    "smoy_seasons" TEXT,
    "fmvp_count" BIGINT,
    "fmvp_seasons" TEXT,

    CONSTRAINT "individual_awards_pkey" PRIMARY KEY ("player_id")
);

-- CreateTable
CREATE TABLE "player_stats_advanced" (
    "player_id" INTEGER NOT NULL,
    "player_name" TEXT,
    "pos" TEXT,
    "age" BIGINT,
    "tm" TEXT NOT NULL,
    "g" BIGINT,
    "mp" BIGINT,
    "per" DOUBLE PRECISION,
    "ts_percent" DOUBLE PRECISION,
    "par" DOUBLE PRECISION,
    "ftr" DOUBLE PRECISION,
    "orb_percent" DOUBLE PRECISION,
    "drb_percent" DOUBLE PRECISION,
    "trb_percent" DOUBLE PRECISION,
    "ast_percent" DOUBLE PRECISION,
    "stl_percent" DOUBLE PRECISION,
    "blk_percent" DOUBLE PRECISION,
    "tov_percent" DOUBLE PRECISION,
    "usg_percent" DOUBLE PRECISION,
    "ows" DOUBLE PRECISION,
    "dws" DOUBLE PRECISION,
    "ws" DOUBLE PRECISION,
    "ws_48" DOUBLE PRECISION,
    "obpm" DOUBLE PRECISION,
    "dbpm" DOUBLE PRECISION,
    "bpm" DOUBLE PRECISION,
    "vorp" DOUBLE PRECISION,
    "year" INTEGER NOT NULL,
    "playoffs_s" VARCHAR NOT NULL,

    CONSTRAINT "player_stats_advanced_pkey" PRIMARY KEY ("player_id","tm","year","playoffs_s")
);

-- CreateTable
CREATE TABLE "player_stats_per_game" (
    "player_id" INTEGER NOT NULL,
    "pos" TEXT,
    "age" BIGINT,
    "tm" TEXT NOT NULL,
    "games" BIGINT,
    "gs" BIGINT,
    "mp" BIGINT,
    "fg" DOUBLE PRECISION,
    "fga" DOUBLE PRECISION,
    "fg_percent" DOUBLE PRECISION,
    "threeP" DOUBLE PRECISION,
    "threePA" DOUBLE PRECISION,
    "three_percent" DOUBLE PRECISION,
    "twoP" DOUBLE PRECISION,
    "twoPA" DOUBLE PRECISION,
    "two_percent" DOUBLE PRECISION,
    "eFG_percent" DOUBLE PRECISION,
    "ft" DOUBLE PRECISION,
    "fta" DOUBLE PRECISION,
    "ft_percent" DOUBLE PRECISION,
    "orb" DOUBLE PRECISION,
    "drb" DOUBLE PRECISION,
    "trb" DOUBLE PRECISION,
    "ast" DOUBLE PRECISION,
    "stl" DOUBLE PRECISION,
    "blk" DOUBLE PRECISION,
    "tov" DOUBLE PRECISION,
    "pf" DOUBLE PRECISION,
    "pts" DOUBLE PRECISION,
    "year" INTEGER NOT NULL,
    "playoffs_s" VARCHAR NOT NULL,

    CONSTRAINT "player_stats_per_game_pkey" PRIMARY KEY ("player_id","tm","year","playoffs_s")
);

-- CreateTable
CREATE TABLE "player_stats_per_poss" (
    "player_id" INTEGER NOT NULL,
    "player_name" TEXT,
    "pos" TEXT,
    "age" BIGINT,
    "tm" TEXT NOT NULL,
    "games" BIGINT,
    "gs" BIGINT,
    "mp" BIGINT,
    "fg" DOUBLE PRECISION,
    "fga" DOUBLE PRECISION,
    "fg_percent" DOUBLE PRECISION,
    "threeP" DOUBLE PRECISION,
    "threePA" DOUBLE PRECISION,
    "three_percent" DOUBLE PRECISION,
    "twoP" DOUBLE PRECISION,
    "twoPA" DOUBLE PRECISION,
    "two_percent" DOUBLE PRECISION,
    "ft" DOUBLE PRECISION,
    "fta" DOUBLE PRECISION,
    "ft_percent" DOUBLE PRECISION,
    "orb" DOUBLE PRECISION,
    "drb" DOUBLE PRECISION,
    "trb" DOUBLE PRECISION,
    "ast" DOUBLE PRECISION,
    "stl" DOUBLE PRECISION,
    "blk" REAL,
    "tov" REAL,
    "pf" DOUBLE PRECISION,
    "pts" DOUBLE PRECISION,
    "ortg" BIGINT,
    "drtg" BIGINT,
    "year" INTEGER NOT NULL,
    "playoffs_s" VARCHAR NOT NULL,

    CONSTRAINT "player_stats_per_poss_pkey" PRIMARY KEY ("player_id","tm","year","playoffs_s")
);

-- CreateTable
CREATE TABLE "player_stats_totals" (
    "player_id" INTEGER NOT NULL,
    "player_name" TEXT,
    "pos" TEXT,
    "age" BIGINT,
    "tm" TEXT NOT NULL,
    "games" BIGINT,
    "gs" BIGINT,
    "mp" BIGINT,
    "fg" BIGINT,
    "fga" BIGINT,
    "fg_percent" DOUBLE PRECISION,
    "threeP" BIGINT,
    "threePA" BIGINT,
    "three_percent" DOUBLE PRECISION,
    "twoP" BIGINT,
    "twoPA" BIGINT,
    "two_percent" DOUBLE PRECISION,
    "efg_percent" DOUBLE PRECISION,
    "ft" BIGINT,
    "fta" BIGINT,
    "ft_percent" DOUBLE PRECISION,
    "orb" BIGINT,
    "drb" BIGINT,
    "trb" BIGINT,
    "ast" BIGINT,
    "stl" BIGINT,
    "blk" BIGINT,
    "tov" BIGINT,
    "pf" BIGINT,
    "pts" BIGINT,
    "year" BIGINT NOT NULL,
    "playoffs_s" VARCHAR NOT NULL,

    CONSTRAINT "player_stats_totals_pkey" PRIMARY KEY ("player_id","tm","year","playoffs_s")
);

-- CreateTable
CREATE TABLE "team_selections" (
    "season" TEXT NOT NULL,
    "lg" TEXT,
    "tm" TEXT NOT NULL,
    "players" TEXT,
    "type" TEXT NOT NULL,
    "Player 1" INTEGER,
    "Player 2" INTEGER,
    "Player 3" INTEGER,
    "Player 4" INTEGER,
    "Player 5" INTEGER,
    "Player 6" INTEGER,

    CONSTRAINT "team_selections_pkey" PRIMARY KEY ("season","tm","type")
);

-- AddForeignKey
ALTER TABLE "individual_awards" ADD CONSTRAINT "individual_awards_player_id_fkey" FOREIGN KEY ("player_id") REFERENCES "player"("player_id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "player_stats_advanced" ADD CONSTRAINT "player_stats_advanced_player_id_fkey" FOREIGN KEY ("player_id") REFERENCES "player"("player_id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "player_stats_per_game" ADD CONSTRAINT "player_stats_per_game_player_id_fkey" FOREIGN KEY ("player_id") REFERENCES "player"("player_id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "player_stats_per_poss" ADD CONSTRAINT "player_stats_per_poss_player_id_fkey" FOREIGN KEY ("player_id") REFERENCES "player"("player_id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "player_stats_totals" ADD CONSTRAINT "player_stats_totals_player_id_fkey" FOREIGN KEY ("player_id") REFERENCES "player"("player_id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "team_selections" ADD CONSTRAINT "team_selections_Player 1_fkey" FOREIGN KEY ("Player 1") REFERENCES "player"("player_id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "team_selections" ADD CONSTRAINT "team_selections_Player 2_fkey" FOREIGN KEY ("Player 2") REFERENCES "player"("player_id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "team_selections" ADD CONSTRAINT "team_selections_Player 3_fkey" FOREIGN KEY ("Player 3") REFERENCES "player"("player_id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "team_selections" ADD CONSTRAINT "team_selections_Player 4_fkey" FOREIGN KEY ("Player 4") REFERENCES "player"("player_id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "team_selections" ADD CONSTRAINT "team_selections_Player 5_fkey" FOREIGN KEY ("Player 5") REFERENCES "player"("player_id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "team_selections" ADD CONSTRAINT "team_selections_Player 6_fkey" FOREIGN KEY ("Player 6") REFERENCES "player"("player_id") ON DELETE CASCADE ON UPDATE NO ACTION;
