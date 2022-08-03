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
// function filename()  {
//   const prompts = require('prompts');

//   (async () => {
//     const response = await prompts({
//       type: 'text',
//       name: 'value',
//       message: 'Enter Filename: ',
      
//     });
//   var filename = response
//   console.log(filename['value']); // => { value: 24 }
  
//   return response['value']
//   })();
  // const rl = readline.createInterface({ 
  //     input: stdin, 
  //     output: stdout,
  //   });
    
  //   const answer = rl.question('Enter filename: ', (answer) => {
  //     console.log(`opening file: ${answer}`);
      
  //     console.log('-----------------------------',answer)
  //     rl.close();
  //     return answer
      
    // });
  // console.log(test)
// }


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
    for (let card of card_data_splitted) {
      if (card == '')
      
        continue

      var card_list = card.split(',')

      if (card_list[5])
        var check = 0
      else
        continue
      
      var datetime = card_list[0]
      var date = datetime.slice(17,26)
      var time = datetime.slice(35,-2)
      var id = card_list[1].slice(8,-1)
      var price = card_list[2].slice(11,-1)
      var page = card_list[3].slice(11,-2)
      var title = card_list[4].slice(12,-2)
      var image = card_list[5]
      var img = image.slice(12,-4)

      console.log('title',title)
      console.log('price',price)
      console.log('page',page)
      console.log('date',date)
      console.log('time',time)
      console.log('id',id)
      console.log('image',img)
      console.log('')
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

    // "Time": ["Date:  7/14/2022  Time:  10:59"], "Id": "155057290171", "Price": "2.95", "page": ["bn_1889619"], "Title": ["Pokemon GO Niantic App Codes x 6"], "Image": ["https://i.ebayimg.com/thumbs/images/g/c64AAOSwCD1ivPSl/s-l300.jpg"]}
    // put this in a for loop and export each card in the array
  
    
  
    // const allUsers = await prisma.user.findMany({
    //   include: {
    //     posts: true,
    //     profile: true,
    //   },
    // })
    // console.dir(allUsers, { depth: null })
}
// async function main() {
//     const post = await prisma.post.update({
//       where: { id: 2 },
//       data: { published: true },
//     })
//     console.log(post)
    
//   }  


// var answer = filename()
// console.log(answer)
populate_data()
  .catch((e) => {
    throw e
  })
  .finally(async () => {
    await prisma.$disconnect()
  })