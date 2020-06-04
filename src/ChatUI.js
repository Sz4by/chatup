class ChatUI {
    constructor(list) {
        this.list = list
    }

    clear() {
        this.list.innerHTML = ""
    }

    render(data) {
        const when = dateFns.distanceInWordsToNow(
            data.created_at.toDate(),
            { addSuffix: true }
        )

        const name = data.username.replace(/ /g, '')
        this.list.innerHTML +=
         `
            <li class="list-group-item" id="${name}">
                <span class="username">${name}:</span>
                <span class="message">${data.message}</span>
                <div class="time">${when}</div>
            </li>
        `
    }
}