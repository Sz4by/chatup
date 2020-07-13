
// TODO:
// create chat rooms on the right side
// user can create unique room with password
// updated name appears on the top left
// delete chat/messages option
// make dark mode
// pick username on page load

/*
for(let x = 0; x < 20; x++) {
    document.getElementById('message').value = 'sup'
    document.getElementsByClassName('btn')[2].click()
}
*/


function loader(query) {
    let loading = '<img src="assets/spinner.gif" alt="Loading..." id="loader">'
    document.querySelector(query).innerHTML = loading
    setTimeout(() => {
        document.getElementById('loader').remove()
    }, 1000)
}


const rooms = document.querySelector('.chat-rooms')
const chatList = document.querySelector('.chat-list')
const newChatForm = document.querySelector('.new-chat')
const newNameForm = document.querySelector('.new-name')
const updateMesssage = document.querySelector('.update-messsage')


newChatForm.addEventListener('submit', e => {
    e.preventDefault()
    chatroom.addChat(newChatForm.message.value.trim())
        .then(() => newChatForm.reset())
        .then(() => {chatUI.scrollDown()})
        .catch(err => console.log(err))
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
    setTimeout(() => {updateMesssage.innerText = ""}, 2500)
})

const username = localStorage.username ? localStorage.username : 'Anonymous'

rooms.addEventListener('click', e => {
    if (e.target.tagName === 'BUTTON') {
        chatUI.clear()
        loader('.chat-list')
        setTimeout(() => {
            chatroom.updateRoom(e.target.getAttribute('id'))
            chatroom.getChats(chat => chatUI.render(chat))
            setTimeout(() => {chatUI.scrollDown()}, 500)
        }, 1200)
    }
})

// initialize

const chatUI = new ChatUI(chatList)
const chatroom = new Chatroom('public', username)


chatroom.getChats((data) => {
    chatUI.render(data)
    setTimeout(() => {chatUI.scrollDown()}, 250)
}) 
