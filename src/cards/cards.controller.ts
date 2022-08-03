import { Controller, Get, Param, Query } from "@nestjs/common";
import { CardsService } from "./cards.service";
import { FindOneParam } from '../utils/findoneparams'
import { IsNumberString } from "class-validator";

export class FindOneParams {
    @IsNumberString()
    id: string;
  }
@Controller('cards') 
export class CardController {
    constructor(private readonly cardService: CardsService) {}


    @Get('all')
    getAllCards() {
        
        return this.cardService.getAllCards();
    }
    @Get(':id')
    async getCardbyId(@Param('id') id: string): Promise<any> {
        console.log('ID:',id);
        return await this.cardService.getCardbyId(id);
    }
    // @Get()
    // async getcardbysearch(@Param('title') title: string): Promise<any> {
    //     return await this.cardService.
    // }
    // @Get('/f') 
    // async getsingleCard() {
    //     return await this.cardService.f()
    // }


    
    // @Get(':id')
    // async CardbyId(@Query() query: { id: string }) {
    //     return await this.cardService.getCardbyId(id);
    // }

}