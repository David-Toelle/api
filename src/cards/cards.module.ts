import { Module } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CardController } from "./cards.controller";
import { CardsService } from "./cards.service";




@Module({
    imports: [],
    controllers: [CardController],
    providers: [CardsService,PrismaService],
  })
  export class CardsModule {}