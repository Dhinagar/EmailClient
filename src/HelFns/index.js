
export class Email {
    constructor(from, to, cc, bcc, sub, body, created) {
        this.from = from;
        this.to = to;
        this.cc = cc;
        this.bcc = bcc;
        this.sub = sub;
        this.body = body;
        this.created = created
    }
}




export const getEmails = () => {

    if (typeof (Storage) !== "undefined") {
        if (localStorage.getItem("emails") === null || localStorage.getItem("emails") === "undefined") {
            console.log("Storage is empty...")
            return []
        } else {
            return JSON.parse(localStorage.getItem("emails")) ? JSON.parse(localStorage.getItem("emails")) : []
        }


    } else {
        console.log("Storage not supported...")
        return []
    }

}

export const getDeletedEmails = () => {

    if (typeof (Storage) !== "undefined") {
        if (localStorage.getItem("deletedEmails") === null || localStorage.getItem("deletedEmails") === "undefined") {
            console.log("Storage is empty...")
            return []
        } else {
            return JSON.parse(localStorage.getItem("deletedEmails")) ? JSON.parse(localStorage.getItem("deletedEmails")) : []
        }


    } else {
        console.log("Storage not supported...")
        return []
    }

}

export const addEmails = (email) => {
    console.log("addEmails.....", typeof email, email)
    if (typeof (Storage) !== "undefined") {
        let emailArray = []
        if (localStorage.getItem("emails") === null) {
            emailArray = []
            console.log("Storage is empty...")
        } else {
            emailArray = JSON.parse(localStorage.getItem("emails"))

        }
        emailArray.unshift(email)
        localStorage.setItem("emails", JSON.stringify(emailArray))

        return getEmails()
    } else {
        console.log("Storage not supported...")
        return getEmails()
    }

}

export const deleteEmail = (email) => {

    let emails = getEmails()
    let deletedEmail = getDeletedEmails()
    emails.map((e, i) => ((e.to === email.to) && deletedEmail.unshift(emails[i]), emails.splice(i, 1)))
    localStorage.setItem("emails", JSON.stringify(emails))
    localStorage.setItem("deletedEmails", JSON.stringify(deletedEmail))

}

