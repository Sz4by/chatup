
// TODO:
// create chat rooms on the right side
// user can create unique room with password
// updated name appears on the top left
// delete chat/messages option
// make dark mode

function generateRandomName() {
    /* credit to: Thomas Konings @ https://gist.github.com/tkon99 */
    function capitalize(string) { return string.charAt(0).toUpperCase() + string.slice(1) }
    function randomNumber(min, max) { return Math.floor(Math.random() * (max - min)) + min }
    
    var first = ["abandoned","able","absolute","adorable","adventurous","academic","acceptable","youthful","yummy","zany","zealous","zesty","zigzag","rocky"];
    var second = ["load","mirror","neck","pension","plate","ruin","ship","skirt","slice","snow","specialist","punch","silly","spell","stretch","stupid","temporary"];
    
    return capitalize(first[randomNumber(0, first.length + 1)]) 
           + ' ' +
           capitalize(second[randomNumber(0, second.length + 1)])
           + ' ' +
           randomNumber(0, 99)
}


window.onload = function() {
    const root = document.querySelector('#root')
    const pageLoader = document.querySelector('#page-loader')
    const chooseName = document.querySelector('#choose-name')
    const submit = document.querySelector('#submit')
    const main = document.querySelector('#main')
    const name = document.querySelector('#name')

    setTimeout(() => { root.classList.remove('hidden') }, 1500)
    setTimeout(() => { pageLoader.classList.add('hidden')}, 1000)
    
    chooseName.style.display = 'flex'
    
    submit.addEventListener('click', () => {
        this.room = 'public'
        
        if (name.value.trim() === '' || name.value.trim() === undefined) {
            name.value = generateRandomName()
        }

        setTimeout(() => { main.classList.remove('hidden') }, 3500)
        setTimeout(() => { chooseName.style.display = 'none' }, 3000)
    })
}

function loader(query) {
    let loading = '<img src="assets/spinner.gif" alt="Loading..." id="loader">'
    document.querySelector(query).innerHTML = loading
    setTimeout(() => {
        document.getElementById('loader').remove()
    }, 1500)
}

const rooms = document.querySelector('.chat-rooms')
const chatList = document.querySelector('.chat-list')
const newChatForm = document.querySelector('.new-chat')
const newNameForm = document.querySelector('.new-name')
const updateMesssage = document.querySelector('.update-messsage')

newChatForm.addEventListener('submit', e => {
    e.preventDefault()
    let msg = newChatForm.message.value.trim()

    if (msg !== '') {
        chatroom.addChat(msg)
            .then(() => newChatForm.reset())
            .then(() => { chatUI.scrollDown() })
            .catch(err => console.log(err))
    }
})

newNameForm.addEventListener('submit', e => {
    e.preventDefault()
    const newName = newNameForm.name.value.trim().replace(/ /g, '')
    chatroom.updateName(newName)
    newNameForm.reset()
    updateMesssage.innerHTML =
     `
     <div class="fade">
        Updated name to <span class="updated-name">${newName}</span>
     </div>
     `
    setTimeout(() => { updateMesssage.innerText = '' }, 2500)
})

const username = localStorage.username ? localStorage.username : 'Anonymous'

rooms.addEventListener('click', e => {
    if (e.target.tagName === 'BUTTON') {
        chatUI.clear()
        loader('.chat-list')
        setTimeout(() => {
            chatroom.updateRoom(e.target.getAttribute('id'))
            chatroom.getChats(chat => chatUI.render(chat))
            setTimeout(() => { chatUI.scrollDown() }, 500)
        }, 1200)
    }
})

// initialize
const chatUI = new ChatUI(chatList)
const chatroom = new Chatroom('public', username)

document.getElementById('submit').addEventListener('click', () => {
    chatroom.getChats((data) => {
        chatUI.render(data)
        setTimeout(() => { chatUI.scrollDown() }, 3000)
    }) 
})
