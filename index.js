import readlineSync from 'readline-sync';
import chalk from 'chalk';
import clear from 'clear';
import { quiz } from './quizDB.js';
import { user }from './userDB.js';


var username=readlineSync.question("Enter your username : ");
var pwd=readlineSync.question("Enter the password : ");
var found=false;
var userIndex;
for(var i=0;i<user.length;i++)
  {
    if(username == user[i].username)
    {
      if(pwd==user[i].password)
        userIndex=i;  
        found=true;
    }
  }

//QUESTIONS LIST
if (found)
{
console.log("Hi! ",chalk.blue(user[userIndex].name) + " Welcome to this Quiz\n");
  console.log("Your existing score are : ",user[userIndex].score);
do {
  var temp = Object.keys(quiz);
  var availableTopics = [];
  for (var i = 0; i < temp.length; i++) {
    if (!(quiz[temp[i]].flag))
      availableTopics.push(temp[i]);
  }
  if (availableTopics.length > 1)
    console.log("\nAvailable quizzes ---->\n");


  for (var i = 0; i < availableTopics.length; i++) {
    console.log((i + 1) + "." + availableTopics[i]);
  }
  if (availableTopics.length > 1) {
    var option = readlineSync.question("\nWhat do you want to play ?");
    var index = option - 1;
  }
  else
    index = 0;
  clear();
  console.log("******Welcome to quiz on " + availableTopics[index] + "******\n");


  quiz[availableTopics[index]].flag = true;
  var scoreObtained = 0;
  var totalScore = 0;
  for (var i = 0; i < quiz[availableTopics[index]].questions.length; i++) {

    var tempVariable = quiz[availableTopics[index]].questions[i];
    var score = tempVariable.score;
    totalScore += score;
    var check = play(tempVariable.question, tempVariable.answer,score);
    if (check) {
      scoreObtained += score;
      
    }
    
    console.log("-----------------------------");


  }
  user[userIndex].score += scoreObtained;
  console.log("You scored : " + scoreObtained + "/" + totalScore);
  var result = (scoreObtained / totalScore) * 100;
  if (result >= 50)
    console.log(chalk.green.bold.underline("PASS"));
  else
    console.log(chalk.red.bold.underline("FAIL"));

  if (availableTopics.length > 1)
    var replayChoice = readlineSync.question("\nDo you want to play more(y/n)?");

  else {
    console.log("Your total score is : ",user[userIndex].score);
    console.log("********THANKS FOR PLAYING ***********");
    process.exit();
  }

}

//**********************************//  
while (replayChoice === "y");
console.log("Your total score is : ",user[userIndex].score);
console.log("\n********THANKS FOR PLAYING ***********");
}
else
{
  console.log(chalk.red.bold("Authentication Failed!\nPlease enter a valid username and password!!"));
}





function play(question, answer,score) {
  var check = 0;
  var userAnswer = "";
  while (check != 1) {
    userAnswer = readlineSync.question(question + "["+score+"]\n");
    
    if (userAnswer != "a" && userAnswer != "b" && userAnswer != "c" && userAnswer != "d") {

      console.log(chalk.red.bold.underline("Please enter a valid input "));
      check = 0;
    }
    else
      check = 1;
  }
  if (userAnswer === answer) {
    console.log(chalk.green("you are right\n"));
    return 1;

  }
  else {
    console.log(chalk.red("You are wrong !!"));
    return 0;

  }


}
