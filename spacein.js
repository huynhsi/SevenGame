const grid = document.querySelector('.grid')
const displayResult = document.querySelector('.result')
let currenShooterIndex = 202
let width = 15
let direction = 1
let invaderId
let goingRight = true
let aliensRemoved = []
let result = 0


for (let i =0 ; i < 255 ; i++){
    const squre = document.createElement('div')
    grid.appendChild(squre)
}

const squres = Array.from(document.querySelectorAll('.grid div'))

const alienInvaders = [
    0,1,2,3,4,5,6,7,8,9,
    15,16,17,18,19,20,21,22,23,24,
    30,31,32,33,34,35,36,37,38,39
]

function draw() {
    for(let i = 0; i < alienInvaders.length; i++) {
        if (!aliensRemoved.includes(i)) {
            squres[alienInvaders[i]].classList.add('invader')
        }
    }
}
draw()

function remove() {
    for(let i = 0; i < alienInvaders.length; i++) {
        squres[alienInvaders[i]].classList.remove('invader')
    }
}

squres[currenShooterIndex].classList.add('shooter')

function moveShooter(e){
    squres[currenShooterIndex].classList.remove('shooter')
    switch(e.key) {
        case 'ArrowLeft':
            if (currenShooterIndex % width !== 0) currenShooterIndex -= 1
                break;
        case 'ArrowRight':
            if (currenShooterIndex % width < width -1) currenShooterIndex += 1
                break;
    }
    squres[currenShooterIndex].classList.add('shooter')
}
document.addEventListener('keydown',moveShooter)

function moveInvaders(){
    const leftEdge = alienInvaders[0] % width === 0
    const rightEdge = alienInvaders[alienInvaders.length - 1] % width === width - 1
    remove()

        if (rightEdge && goingRight){
            for(let i = 0; i < alienInvaders.length ; i++ ){
                alienInvaders[i] += width +1
                direction = -1
                goingRight = false
            }
        }

        if (leftEdge && !goingRight){
            for(let i = 0; i < alienInvaders.length ; i++ ){
                alienInvaders[i] += width -1
                direction = 1
                goingRight = true
            }
        }

    for (let i = 0; i < alienInvaders.length; i++ ){
        alienInvaders[i] += direction
    }

    draw()

    if (squres[currenShooterIndex].classList.contains('invader','shooter')) {
        displayResult.innerHTML = "Game Over!"
        clearInterval(invaderId)
    }
    
    for (let i = 0; i < alienInvaders.length; i++){
        if (alienInvaders[i] > (squres.length)) {
            displayResult.innerHTML = "Game Over!"
            clearInterval(invaderId)
        }
    }
    if (aliensRemoved.length === alienInvaders.length) {
        displayResult.innerHTML = "You Win"
        clearInterval(invaderId)
    }
}

invaderId = setInterval(moveInvaders,200)

function shoot(e){
    let laserId
    let currenLaserIndex = currenShooterIndex
    function moveLaser() {
        squres[currenLaserIndex].classList.remove('laser')
        currenLaserIndex -= width
        squres[currenLaserIndex].classList.add('laser')

        if (squres[currenLaserIndex].classList.contains('invader')){
            squres[currenLaserIndex].classList.remove('laser')
            squres[currenLaserIndex].classList.remove('invader')
            squres[currenLaserIndex].classList.add('boom')

            setTimeout(() => squres[currenLaserIndex].classList.remove('boom'), 300)
            clearInterval(laserId)

            const alienRemoved = alienInvaders.indexOf(currenLaserIndex)
            aliensRemoved.push(alienRemoved)
            result++
            displayResult.innerHTML = result
            console.log(aliensRemoved)
        }
    }
        switch (e.key){
            case 'ArrowUp':
                laserId = setInterval(moveLaser, 100)
    } 
}

document.addEventListener('keydown', shoot)