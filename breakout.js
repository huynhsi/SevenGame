const grid = document.querySelector('.grid')
const scoreDisplay = document.querySelector('#score')
const blockWidth = 100
const blockHeight = 20
const ballDiameter = 20
const boardWidth = 560
const boarHeight = 300
let timerId 
let xDiraction = -2
let yDiraction = 2
let score = 0

const userStart = [230, 10]
let currentPosition = userStart

const ballStart = [270,40]
let ballCurrenPosition = ballStart

//create block
class Block{
    constructor(xAxis, yAxis) {
        this.bottomLesft = [xAxis,yAxis]
        this.bottomRight = [xAxis + blockWidth, yAxis]
        this.topLeft = [xAxis, yAxis + blockHeight]
        this.topRight = [xAxis + blockWidth, yAxis + blockHeight]
    }
}
// all my block
const blocks = [
    new Block(10,270),
    new Block(120,270),
    new Block(230,270),
    new Block(340,270),
    new Block(450,270),
    new Block(10,240),
    new Block(120,240),
    new Block(230,240),
    new Block(340,240),
    new Block(450,240),
    new Block(10,210),
    new Block(120,210),
    new Block(230,210),
    new Block(340,210),
    new Block(450,210),
]
function addBlock() {
    for (let i = 0; i < blocks.length; i++){
        const block = document.createElement('div')
        block.classList.add('block')
        block.style.left = blocks[i].bottomLesft[0] + 'px'
        block.style.bottom = blocks[i].bottomLesft[1] + 'px'
        grid.appendChild(block)
    }
}
addBlock()
//add user 
const user = document.createElement('div')
user.classList.add('user')
drawUser()
grid.appendChild(user)

//Draw the user
function drawUser(){
    user.style.left = currentPosition[0] +'px'
    user.style.bottom = currentPosition[1] + 'px'
}
//draw the ball
function drawBall() {
    ball.style.left = ballCurrenPosition[0] + 'px'
    ball.style.bottom = ballCurrenPosition[1] + 'px'
}

//move uer
function moveUser(e){
    switch (e.key){
        case 'ArrowLeft':
            if (currentPosition[0] > 0){
            currentPosition[0] -= 10
            drawUser()
            }
            break;
        case 'ArrowRight':
            if (currentPosition[0] < boardWidth - blockWidth){
                currentPosition[0] += 10
                drawUser()
            }
            break;
    }
}
document.addEventListener('keydown', moveUser)
// add ball
const ball = document.createElement('div')
ball.classList.add('ball')
drawBall()
grid.appendChild(ball)
//move ball
function moveBall(){
    ballCurrenPosition[0] += xDiraction
    ballCurrenPosition[1] += yDiraction
    drawBall()
    checkForColistion()
}
timerId = setInterval(moveBall,20) //SetInterval là làm cái gì đó theo thời gian đc set
//check for collitions
function checkForColistion(){
    //check for block colisiums
    for (let i = 0; i < blocks.length ; i++) {
       if ((ballCurrenPosition[0] > blocks[i].bottomLesft[0] && ballCurrenPosition[0] < blocks[i].bottomRight[0]) &&
       ((ballCurrenPosition[1] + ballDiameter) > blocks[i].bottomLesft[1] && ballCurrenPosition[1] < blocks[i].topLeft[1])) {
            const allBlock = Array.from(document.querySelectorAll('.block'))
            allBlock[i].classList.remove('block')
            blocks.splice(i,1)
            changeDirection()
            score++
            scoreDisplay.innerHTML = score
            //check for win
            if(blocks.length === 0){
                scoreDisplay.innerHTML = 'You Win'
                clearInterval(timerId)
                document.removeEventListener('keydown', moveUser)
            }
       }
    }
    if (ballCurrenPosition[0] >= (boardWidth - ballDiameter) ||
        ballCurrenPosition[1] >= (boarHeight - ballDiameter) ||
        ballCurrenPosition[0] <= 0
        ) {
        changeDirection()
    }
    // check for user colisiums
    if (
    (ballCurrenPosition[0] > currentPosition[0] && ballCurrenPosition[0] < currentPosition[0] + blockWidth) &&
    (ballCurrenPosition[1] > currentPosition[1] && ballCurrenPosition[1] < currentPosition[1] + blockHeight)
    ){
        changeDirection()
    }
    // check for game over
    if (ballCurrenPosition[1] <= 0){
        clearInterval(timerId)//không chạy nữa bỏ thằng setInterval đi
        scoreDisplay.innerHTML = 'You Lose!'
        document.removeEventListener('keydown', moveUser)

    }
}


function changeDirection() {
    if (xDiraction === 2 && yDiraction === 2){
        yDiraction = -2
        return
    }
    if (xDiraction === 2 && yDiraction === -2){
         xDiraction = -2 
         return
    }
    if (xDiraction === -2 && yDiraction === -2){
        yDiraction = 2
        return
    }
    if (xDiraction === -2 && yDiraction === 2) {
        xDiraction = 2
    }
}