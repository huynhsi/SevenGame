const square = document.querySelectorAll('.squre')
const mole = document.querySelector('.mole')
const timeLeft = document.querySelector('#time-left')
const score = document.querySelector('#score')

let result = 0
let hitPosition
let currenTime = 10
let timerId = null

function randomSquare() {
    square.forEach( square => {
        square.classList.remove('mole')
    })

    let randomSquare = square[Math.floor(Math.random() * 9)]
    randomSquare.classList.add('mole')
    hitPosition = randomSquare.id
}
square.forEach(square => {
    square.addEventListener('mousedown', () => {
        if (square.id == hitPosition) {
            result++
            score.textContent = result
            hitPosition = null
        }
    })
})
function moveMole(){
    timerId = setInterval(randomSquare, 1000)
}
moveMole()

function coutDown(){
    currenTime--
    timeLeft.textContent = currenTime
    if (currenTime == 0){
        clearInterval(conDownTimerId)
        clearInterval(timerId)
        alert('Game Over! your final score is' + result)
    }
}

let conDownTimerId = setInterval(coutDown, 1000)