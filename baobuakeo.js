const computerChoiseDisplay = document.getElementById('computer-choise')
const userChoiseDisplay = document.getElementById('user-choise')
const resultDisplay = document.getElementById('result')
const possibleChoise = document.querySelectorAll('button')
let userChoise
let computerChoise
let result

possibleChoise.forEach(possibleChoise => possibleChoise.addEventListener('click', (e) => {
    userChoise = e.target.id
    userChoiseDisplay.innerHTML = userChoise
    generrtionComputerChoise()
    getResult()
}))

function generrtionComputerChoise() {
    const randomNumber = Math.floor(Math.random() * possibleChoise.length) + 1
    console.log(randomNumber)

    if(randomNumber === 1){
        computerChoise = 'bao'
    }
    if(randomNumber === 2){
        computerChoise = 'bua'
    }
    if(randomNumber === 3){
        computerChoise = 'keo'
    }
    computerChoiseDisplay.innerHTML = computerChoise
}

function getResult(){
    if (computerChoise === userChoise){
        result = 'Hòa nhau rồi!'
    }
    if (computerChoise === 'bao' && userChoise === 'bua'){
        result = 'Bạn thua rồi!'
    }
    if (computerChoise === 'bua' && userChoise === 'bao'){
        result = 'Bạn thắng rồi!'
    }
    if (computerChoise === 'bua' && userChoise === 'keo'){
        result = 'Bạn thua rồi!'
    }
    else{
        result = 'không biết nữa!'
    }
    resultDisplay.innerHTML = result
}
