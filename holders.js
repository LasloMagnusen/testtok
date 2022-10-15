import fetch from 'node-fetch';
import fs from 'fs'
import { time } from 'console';

// function getUnique (arr) {
//     var i = 0,
//     current,
//     length = arr.length,
//     unique = [];
//     for (; i < length; i++) {
//       current = arr[i];
//       if (!~unique.indexOf(current)) {
//         unique.push(current);
//       }
//     }
//     console.log(unique) ;
//     let insert1 = unique.toString()

//     fs.writeFileSync("holderslist.txt", insert1)
//     console.log('файлы записаны')
//   };

  

let fulllist = []

let tokenaddress = 'FNMLmBPkhh7nBFyGHsdrmCuvgEf6ygpaVqFejimHEx9V' //FNMLmBPkhh7nBFyGHsdrmCuvgEf6ygpaVqFejimHEx9V ANAxByE6G2WjFp7A4NqtWYXb3mgruyzZYg3spfxe6Lbo


//get totalvalue holders
let url1 = `https://public-api-test.solscan.io/token/holders?tokenAddress=${tokenaddress}&limit=1&offset=0`
    let status1 = await fetch(url1)
    let commits1 = await status1.json();
    let totalvalue = commits1.total
  console.log('amount of holders: ' + totalvalue)




// let url2 = `https://public-api-test.solscan.io/token/holders?tokenAddress=${tokenaddress}&limit=10&offset=0`
//     let status2 = await fetch(url2)

//     let commits2 = await status2.json();
//     console.log(commits2.data[0].address)

//     for (let index = 0; index < 8; index++) {
//       console.log(index)
//       let elem = commits2.data[index].address
      

//       holdlist.push(elem)

  
//     }

//     var insert = JSON.stringify(holdlist); 
//     fs.writeFileSync("hello.json", insert)


for (let index = 0; index < totalvalue  ; index = index + 100) {
    
    function time() {
        console.log('timeout 3000ms');  

      }
      setTimeout(time, 3000);

    
    let url = `https://public-api-test.solscan.io/token/holders?tokenAddress=${tokenaddress}&limit=100&offset=${index}`
    let status = await fetch(url)

    let commits = await status.json();

    fulllist.push(commits)

    console.log(`${index} из ${totalvalue} записано`)
    
   
    
  
}
var insert = JSON.stringify(fulllist); 
fs.writeFileSync("rawlist.txt", insert)
console.log('файлы записаны')

time()

async function sortall() {
let holderslist = []
let myArray = []
let space = ''
var re =   new RegExp ('"address":"[1-9A-HJ-NP-Za-km-z]{32,44}', 'g');
let str = fs.readFileSync('rawlist.txt', 'utf8');

function contains(holderslist, element) {
    for (var i = 0; i < holderslist.length; i++) {
        if (holderslist[i] === element) {
            console.log('дубликат не записываем')
        }
    }
    console.log('не дубликат, записываем')
    holderslist.push(element)
}

  myArray = str.match(re);




for (let index = 0; index < myArray.length; index++) {
    let element = myArray[index].replace('"address":"', space)
    contains(holderslist, element )
}
console.log(holderslist)

//insert in file
for (let index = 0; index < holderslist.length; index++) {
    fs.appendFileSync('finishlist.txt', `\n${holderslist[index]}`);
    
}



}

sortall()









