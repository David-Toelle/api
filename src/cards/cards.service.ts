import { Injectable } from "@nestjs/common";

import { Observable } from "rxjs/internal/Observable";
import { PrismaService } from "src/prisma/prisma.service";
import { Card } from "./cards.model";
import CardNotFoundException from "./exceptions/not-found.exception"; 



@Injectable()
export class CardsService {
    postRepo: any;
    constructor(private readonly prismaService: PrismaService){
        
        
    }
    async getAllCards(){
        return await this.prismaService.card.findMany()
    }

  
          

    async getCardbyId(id: string){
        
        const card = await this.prismaService.card.findUnique({
            where: {
                id,
            }
        });
       
        if (! card) {
            throw new CardNotFoundException(id);
        }
        return card;
        }    


}
