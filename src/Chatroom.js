class Chatroom {

    constructor(room, username) {
        this.unsub
        this.room = room
        this.username = username
        this.chats = db.collection('chats')
        this.password = 'DamnTrainCJ'
        this.validated = false
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

        main.style.display = 'none'
        validate.style.display = 'flex'

        function validatedMessage(name) {
            updated.innerHTML =
            `
            <div class="fade">
               Welcome to the secret chat <span class="updated-name">${name}!</span>
            </div>
            `
           setTimeout(() => {updateMesssage.innerText = ""}, 2500)
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
                secret.value = ''
                closeValidation()
                validatedMessage(this.username)
            } else {
                error.innerText = 'Wrong Password, try again'
                secret.style.borderColor = 'red'
                secret.value = ''
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
