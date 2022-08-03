import { NotFoundException } from "@nestjs/common";


class CardNotFoundException extends NotFoundException{
    constructor(id: string){
        super(`Card with id ${id} not found`);
    }
}

export default CardNotFoundException;