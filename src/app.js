
// TODO:
// create chat rooms on the right side
// user can create unique room with password
// updated name appears on the top left
// put chat in an iframe
// make animations
// delete chat/messages option


const chatList = document.querySelector('.chat-list')
const newChatForm = document.querySelector('.new-chat')
const newNameForm = document.querySelector('.new-name')
const updateMesssage = document.querySelector('.update-messsage')
const rooms = document.querySelector('.chat-rooms')


// function scrollDown() {
//     // scroll to the most recent message
//     let messageCount = document.getElementsByClassName(username).length -1
//     let lastMessage = document.getElementsByClassName(username)[messageCount]
//     document.querySelector('.chat-window').scrollTop = lastMessage.offsetTop
// }


newChatForm.addEventListener('submit', e => {
    e.preventDefault()
    chatroom.addChat(newChatForm.message.value.trim())
        .then(() => newChatForm.reset())
        .then(() => {
            chatUI.scrollDown()
        })
        .catch(err => console.log(err))
})

newNameForm.addEventListener('submit', e => {
    e.preventDefault()
    const newName = newNameForm.name.value.trim()
    chatroom.updateName(newName)
    newNameForm.reset()
    updateMesssage.innerHTML =
     `
     <div>
        Updated name to <span class="updated-name">${newName}</span>
     </div>
     `
    setTimeout(() => updateMesssage.innerText = "", 3000)
})

const username = localStorage.username ? localStorage.username : 'Anonymous'

rooms.addEventListener('click', e => {
    if (e.target.tagName === 'BUTTON') {
        chatUI.clear()
        chatroom.updateRoom(e.target.getAttribute('id'))
        chatroom.getChats(chat => chatUI.render(chat))
        setTimeout(() => {chatUI.scrollDown()}, 500)
    }
})

// initialize
const chatUI = new ChatUI(chatList)
const chatroom = new Chatroom('public', username)

chatroom.getChats((data) => {
    chatUI.render(data)
    chatUI.scrollDown()
}) 
