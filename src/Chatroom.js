class Chatroom {
    constructor(room, username) {
        this.unsub
        this.room = room
        this.validated = false
        this.username = username
        this.password = privateRoomPassword
        this.chats = db.collection('chats')
    }

    async addChat(message) {
        const now = new Date()
        const chat = {
            message,
            username: this.username,
            room: this.room,
            created_at: firebase.firestore.Timestamp.fromDate(now)
        }
        return await this.chats.add(chat)
    }

    getChats(callback) {
        this.unsub = this.chats
        .where('room', '==', this.room)
        .orderBy('created_at')
        .onSnapshot(snapshot => {
            snapshot.docChanges().forEach(change => {
                if (change.type === 'added') {
                    callback(change.doc.data())
                }
            })
        })
    }

    updateName(username) {
        this.username = username
        localStorage.setItem('username', username)
    }

    validate() {
        const main = document.querySelector('#main')
        const error = document.querySelector('#error')
        const enter = document.querySelector('#enter')
        const cancel = document.querySelector('#cancel')
        const secret = document.querySelector('#secret')
        const validate = document.querySelector('.validate')
        const publicRoom = document.querySelector('#public')
        const privateRoom = document.querySelector('#private')
        const updated = document.querySelector('.update-messsage')
        const welcome = document.querySelector('#welcome-message')

        main.style.display = 'none'
        validate.style.display = 'flex'

        function validatedMessage(name) {
            welcome.innerHTML =
            `
            <div class="fade welcome-message">
               Welcome <span class="updated-name">${name}!</span>
            </div>
            `
           setTimeout(() => { updateMesssage.innerText = '' }, 2500)
        }

        function clearError() {
            error.innerText = ''
            secret.style.borderColor = ''
        }

        function closeValidation() {
            main.style.display = 'block'
            validate.style.display = 'none'
        }

        enter.addEventListener('click', () => {
            let password = secret.value
            if (password === this.password) {
                this.validated = true
                secret.value = null
                closeValidation()
                validatedMessage(this.username)
            } else  if (password === '') {
                error.innerText = 'That wouldn\'t work'
                secret.style.borderColor = 'red'
                secret.value = null
            } else {
                error.innerText = 'Who told you that?'
                secret.style.borderColor = 'red'
                secret.value = null
            }
        })

        cancel.addEventListener('click', () => {
            closeValidation()
            publicRoom.click()
            clearError()
        })
    }

    updateRoom(room) {
        if (room === 'private') { 
            if (this.validated === false) {
                this.validate()
            } 
        }
        this.room = room
        console.log(`Updated room to ${room}`)
        if (this.unsub) {
            this.unsub()
        }
    }
}
