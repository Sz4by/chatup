class ChatUI {
    constructor(list) {
        this.list = list
    }

    clear() {
        this.list.innerHTML = ''
    }
    
    scrollDown() {
        // scroll to the most recent message
        const messageCount = document.getElementsByClassName('list-group-item').length -1
        const lastMessage = document.getElementsByClassName('list-group-item')[messageCount]
        if (lastMessage !== 'undefined' || lastMessage !== null) {
            document.querySelector('.chat-window').scrollTop = lastMessage.offsetTop
        }
    }

    render(data) {
        const when = dateFns.distanceInWordsToNow(
            data.created_at.toDate(),
            { addSuffix: true }
        )

        const name = data.username.replace(/ /g, '')
        this.list.innerHTML +=
            `
            <li class="list-group-item ${name}">
                <span class="username">${name + ':'}</span>
                <span class="message">${data.message}</span>
                <div class="time">${when}</div>
            </li>
        `
    }
}
