const chatList = document.querySelector('.chat-list')
const newChatForm = document.querySelector('.new-chat')
const newNameForm = document.querySelector('.new-name')
const updateMesssage = document.querySelector('.update-messsage')


newChatForm.addEventListener('submit', e => {
    e.preventDefault()
    chatroom.addChat(newChatForm.message.value.trim())
        .then(() => newChatForm.reset())
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

const chatUI = new ChatUI(chatList)
const chatroom = new Chatroom('gaming', username)

chatroom.getChats((data) => {
    chatUI.render(data)
})