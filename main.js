// const fs = require("fs");

// const [, , ...datas] = process.argv;

// fs.appendFileSync(datas[0] + ".json ", "");
// let data = fs.readFileSync(datas[0] + ".json", "utf-8" || "[]");
// let arr = JSON.parse(data);

// if (datas.length != 5) {
//   console.log("Malumot mavjud!");
//   process.exit;
// }

// let obj = {
//   name: datas[1],
//   age: datas[2],
//   nation: datas[3],
//   gender: datas[4],
// };

// for (let i of arr) {
//   if (
//     i.name == obj.name &&
//     i.age == obj.age &&
//     i.nation == obj.nation &&
//     i.gender == obj.gender
//   ) {
//     console.log("Bu" + datas[0] + "mavjud");
//     process.exit();
//   }
// }

// arr.push(obj);
// fs.writeFileSync(datas[0] + ".json" , JSON.stringify(arr , null , 2))
// console.log(datas[0] + "qoshildi");

// const fs  = require("fs")

// const [,, ...datas] = process.argv

// fs.appendFileSync(datas[0]+".json", "")
// fs.readFileSync(datas[0] + ".json", "utf-8" || "[]")
// let arr = JSON.parse(datas)

// if(datas.length!=5){
//   console.log("Malumot mavjud!");
//   process.exit
// }

// let obj ={
// name : datas[1],
// age : datas[2],
// nation: datas[3]
// }
// for(let i of arr){
// if(  i.name == obj.name &&
//   i.age == obj.age &&
//   i.nation == obj.nation){
//   console.log("bu" + datas[0] + "mavjud");
// process.exit
// }
// }
// arr.push(obj)
// fs.writeFileSync(datas[0] + ".json",JSON.stringify(arr , null , 2))
// console.log("Malumot qoshildi");

const questions = [
  {
    question: "Ispaniyaning Poytaxti?",
    answer: "Madrid",
  },
  {
    question: "Dunyodagi eng katta okean?",
    answer: "Tinch okeani",
  },
  {
    question: "Dunyodagi eng uzun Daryo?",
    answer: "Nil",
  },
  {
    question: "Dunyodagi eng baland Cho'qqi?",
    answer: "Everest",
  },
];

let result = 0;
const fs = require("fs");
const rl = require("readline");
let readline = rl.createInterface({
  output: process.stdout,
  input: process.stdin,
});

const [, , ...data] = process.argv;
fs.appendFileSync(__dirname + "/base.json", "");
const info = fs.readFileSync(__dirname + "/base.json", "utf-8") || "[]";
const arr = JSON.parse(info);
const user = {
  name: data[0],
  age: data[1],
  nation: data[2],
  result: result,
};

for (let i of arr) {
  if (user.name === i.name && user.age === i.age && user.nation === i.nation) {
    console.log("bunday foydalanuvchi malumatlari band");
    process.exit();
  }
}
arr.push(user);

function* getresult() {
  for (let i of questions) {
    let answer = yield i.question;
    if (answer) {
      result += 1;
    } else {
      result = result;
    }
  }
}

let generator = getresult();
readline.setPrompt(generator.next().value);
readline.prompt();
readline.on("line", (data) => {
  let question = generator.next(data).value;
  if (question == undefined) {
    console.log("siz " + result + " bal topladingiz");
    if (user.result < result) {
      user.result = result;
    }

    fs.writeFileSync(__dirname + "/base.json", JSON.stringify(arr, null, 4));
    return readline.close();
  }

  readline.setPrompt(question);
  readline.prompt();
});
