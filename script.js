// ---------- PART 1 ----------

function login(){

 const user = prompt("Enter your username:");
 const btnArea = document.getElementById('part1-buttons');
 btnArea.innerHTML='';

 if(!user) return;

 if(user.toLowerCase()==='admin'){

  document.getElementById('output').textContent='Logged in as admin';

  btnArea.innerHTML=`
  <button onclick="task1()">Say Hi</button>
  <button onclick="task2()">Favourite Animal</button>
  `;

 }

 else if(user.toLowerCase()==='student'){

  document.getElementById('output').textContent='Logged in as student';

  btnArea.innerHTML=`<button onclick="task1()">Say Hi</button>`;

 }

 else{

  document.getElementById('output').textContent="I don't know you";

 }

}



function task1(){

 const lang = prompt("Enter language (Eng, Fr, De, Spa)");
 let greeting;

 switch(lang){

  case 'Eng':
  greeting="Hello";
  break;

  case 'Fr':
  greeting="Bonjour";
  break;

  case 'De':
  greeting="Hallo";
  break;

  case 'Spa':
  greeting="Hola";
  break;

  default:
  greeting="Sorry I do not speak your language";

 }

 alert(greeting);

 document.getElementById('output').textContent="Greeting shown: "+greeting;

}



function task2(){

 const year=parseInt(prompt("Enter year of birth"));

 if(isNaN(year)){
 document.getElementById('output').textContent="Invalid year";
 return;
 }

 const age=new Date().getFullYear()-year;

 const output=document.getElementById('output');

 if(age<18){

 alert("Content is not available due to age restrictions");

 output.textContent="Content is not available due to age restrictions";

 return;

 }

 if(age>55){

 output.textContent="Programming like mathematics is a logical deductive system.";

 return;

 }


 const animal=prompt("Enter animal (Cat, Dog, Frog, Mouse)");

 let img;

 switch(animal){

 case 'Cat':
 img="images/Cat.jpeg";
 break;

 case 'Dog':
 img="images/Dog.jpg";
 break;

 case 'Frog':
 img="images/Frog.jpg";
 break;

 case 'Mouse':
 img="images/Mouse.jpg";
 break;

 default:
 output.textContent="Invalid animal";
 return;

 }

 output.innerHTML=animal+"<br><img src='"+img+"'>";

}



// ---------- PART 2 ----------


function generateAdminPassword(){

 let pwd="";

 for(let i=0;i<6;i++){

 pwd+=Math.floor(Math.random()*10);

 }

 return pwd;

}



function checkPassword(correctPwd,maxAttempts,username){

 for(let attempt=1;attempt<=maxAttempts;attempt++){

 const entered=prompt(username+" enter password attempt "+attempt+"/"+maxAttempts);

 if(entered===correctPwd) return true;

 if(attempt<maxAttempts)
 alert("Wrong password "+(maxAttempts-attempt)+" attempts remaining");

 }

 return false;

}



function adminStep2(){

 const age=parseInt(prompt("Enter current age"));

 const admissionYear=parseInt(prompt("Enter admission year"));

 if(isNaN(age)||isNaN(admissionYear)){

 document.getElementById('output').textContent="Invalid input";

 return;

 }

 const bachelorYear=admissionYear+4;

 const ageAtBachelor=age+(bachelorYear-new Date().getFullYear());

 document.getElementById('output').textContent=
 "You will be "+ageAtBachelor+" years old at graduation\n"+
 "You will receive Bachelor's degree in "+bachelorYear;

}



function designerStep2(){

 const portfolios=parseInt(prompt("Number of portfolios"));

 const birthYear=parseInt(prompt("Birth year"));

 if(isNaN(portfolios)||isNaN(birthYear)){

 document.getElementById('output').textContent="Invalid input";

 return;

 }

 const age=new Date().getFullYear()-birthYear;

 let msg;

 if(age>=14 && age<=18 && portfolios>=5 && portfolios<=10)
 msg="10% discount on Adobe XD";

 else if(age>18 && portfolios>=10 && portfolios<=20)
 msg="7% discount on Adobe XD";

 else
 msg="No discount";

 document.getElementById('output').textContent=
 "Age: "+age+" Portfolios: "+portfolios+"\n"+msg;

}



function testerStep2(){

 const portfolios=parseInt(prompt("Number of portfolios"));

 const birthYear=parseInt(prompt("Birth year"));

 if(isNaN(portfolios)||isNaN(birthYear)){

 document.getElementById('output').textContent="Invalid input";

 return;

 }

 const age=new Date().getFullYear()-birthYear;

 let msg;

 if(age>=14 && age<=18 && portfolios>=5 && portfolios<=10)
 msg="10% discount on QA Pro";

 else if(age>18 && portfolios>=10 && portfolios<=20)
 msg="7% discount on QA Pro";

 else
 msg="No discount";

 document.getElementById('output').textContent=
 "Age: "+age+" Portfolios: "+portfolios+"\n"+msg;

}



function part2Start(){

 const login=prompt("Enter login");

 if(!login) return;

 const user=login.toLowerCase();


 if(user==='admin'){

 const pwd=generateAdminPassword();

 alert("Generated admin password: "+pwd);

 const ok=checkPassword(pwd,2,"Admin");

 if(!ok){

 document.getElementById('output').textContent="Access denied";

 return;

 }

 adminStep2();

 }


 else if(user==='designer'){

 const ok=checkPassword("111",3,"Designer");

 if(!ok){

 document.getElementById('output').textContent="Access denied";

 return;

 }

 designerStep2();

 }


 else if(user==='tester'){

 const ok=checkPassword("222",3,"Tester");

 if(!ok){

 document.getElementById('output').textContent="Access denied";

 return;

 }

 testerStep2();

 }


 else{

 alert("No such user");

 document.getElementById('output').textContent="No such user";

 }

}