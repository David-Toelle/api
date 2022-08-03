import { PrismaClient } from '@prisma/client'
import { readFileSync, promises as fsPromises } from 'fs';
import { join } from 'path';
import * as readline from 'node:readline';
import { stdin as input, stdout as output } from 'node:process'
import { stdin, stdout } from 'process';
import { stringify } from 'querystring';

// import { prompts } from 'node_modules/@types/prompts/index.d.ts';
const prisma = new PrismaClient()

function syncReadFile(filename: string) {
  
  const result = readFileSync(join(__dirname, filename), 'utf-8');
  
  var card_data = result.toString()
  var card_data_splitted = card_data.split('{')
  
  return card_data_splitted;
}

async function populate_data() {
   
    console.log(process.argv)
    console.log(process.argv[2])
    console.log('----')
    const file = process.argv[2]
    const files = String(file)
    console.log(file)
    console.log(files)
    var card_data_splitted = syncReadFile(file+'/bn_1895939.csv')
    console.log(card_data_splitted)
    
    //Extract data from array
    for (let card of card_data_splitted) {
      // filter out blanks
      if (card == '')
        continue

      var card_list = card.split(',')
      
      if (card_list[5])
        var check = 0
      else
        continue
      
      //Extract data from string
      var datetime = card_list[0]
      var date = datetime.slice(17,26)
      var time = datetime.slice(35,-2)
      var id = card_list[1].slice(8,-1)
      var price = card_list[2].slice(11,-1)
      var page = card_list[3].slice(11,-2)
      var title = card_list[4].slice(12,-2)
      var image = card_list[5]
      var img = image.slice(12,-4)

      //log everything 
      console.log('title',title)
      console.log('price',price)
      console.log('page',page)
      console.log('date',date)
      console.log('time',time)
      console.log('id',id)
      console.log('image',img)
      console.log('')
      // add card to database 
      const car1 = await prisma.card.createMany({
        data: {
          id: id,
          date: date,
          time: time,
          title: title,
          price: price,
          page: page,
          image: img
        },
        
      
        skipDuplicates: true, 
      })
      console.dir(car1, {depth: null})
    }
}

populate_data()
  .catch((e) => {
    throw e
  })
  .finally(async () => {
    await prisma.$disconnect()
  })