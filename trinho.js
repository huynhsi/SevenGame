const carArray = [
    {
        name: 'fries',
        img: 'img/iPhone-11-64.jpg',
    },
    {
        name:'cheeseburger',
        img: 'img/iPhone-12-mini-64.jpg',
    },
    {
        name:'hotdog',
        img: 'img/iphone-12-thumb.jpg',
    },
    {
        name:'ice-cream',
        img: 'img/iPhone-13-128.jpg',
    },
    {
        name:'milkshake',
        img: 'img/iPhone-13-mini-128.jpg',
    },
    {
        name:'pizza',
        img: 'img/iPhone-13-Pro-128.jpg',
    },
    {
        name: 'fries',
        img: 'img/iPhone-11-64.jpg',
    },
    {
        name:'cheeseburger',
        img: 'img/iPhone-12-mini-64.jpg',
    },
    {
        name:'hotdog',
        img: 'img/iphone-12-thumb.jpg',
    },
    {
        name:'ice-cream',
        img: 'img/iPhone-13-128.jpg',
    },
    {
        name:'milkshake',
        img: 'img/iPhone-13-mini-128.jpg',
    },
    {
        name:'pizza',
        img: 'img/iPhone-13-Pro-128.jpg',
    }
]

carArray.sort(() => 0.5 - Math.random())

const gridDisplay = document.querySelector('#grid')
const resultDisplay = document.querySelector('#result')
let cardChoose = []
let cardChoosenId = []
const cardWon = []

function createBoard () {
    for(let i=0; i < carArray.length; i++){
       const card = document.createElement('img')
       card.setAttribute('src','img/iPhone-11-64.jpg')
       card.setAttribute('data-id',i)
       card.style.width = '100px'
       card.addEventListener('click',flipCard)
       gridDisplay.appendChild(card)
    }
}
createBoard()

function checkMath(){
    const cards = document.querySelectorAll('img')
    const optionOneId = cardChoose[0]
    const optionTowId = cardChoose[1]
    console.log('card')
    console.log('check for match!')
    if(optionOneId == optionTowId){
        card[optionOneId].setAttribute('src','img/iPhone-11-64.jpg')
        card[optionTowId].setAttribute('src','img/iPhone-11-64.jpg')
        alert('You have cliked the same image!')
    }
    if (cardChoose[0] == cardChoose[1]){
        alert('you found a match!')
        cards[optionOneId].setAttribute('src','img/oppo-reno4-pro-trang.jpg')
        cards[optionTowId].setAttribute('src','img/oppo-reno4-pro-trang.jpg')
        cards[optionOneId].removeEventListener('click',flipCard)
        cards[optionTowId].removeEventListener('click',flipCard)
        cardWon.push(cardChoose)
    }else {
        card[optionOneId].setAttribute('src','img/iPhone-11-64.jpg')
        card[optionTowId].setAttribute('src','img/iPhone-11-64.jpg')
        alert('sory try aganin!')
    }
    resultDisplay.textContent = cardWon.length
    cardChoose = []
    cardChoosenId = []

    if(cardWon.length == carArray.length/2){
        resultDisplay.textContent = 'congratulations you found them all!'
    }
}

function flipCard() {
    
    const cardId = this.getAttribute('data-id')
    cardChoose.push(carArray[cardId].name)
    cardChoosenId.push(cardId)
    console.log(cardChoose)
    console.log(cardChoosenId)

    this.setAttribute('src',carArray[cardId].img)
    if (cardChoose.length === 2) {
        setTimeout(checkMath, 500)
    }
}
flipCard()