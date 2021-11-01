const Mailgen = require('mailgen')

class EmailService {
    constructor(sender) {
        this.sender = sender
        switch (env) {
            case "development":
                this.link = 'http://localhost:3000'
                break
            
            case "production":
                this.link = 'link for production'
                break
            
            default:
                break
        }
    }
    createTemplateEmail(name, verifyToken) {
        const mailGenerator = new Mailgen({
    theme: 'salted',
    product: {
        name: 'GOIT',
        link: this.link
    }
        });
       const email = {
    body: {
        name,
        intro: 'Welcome to GOIT! We\'re very excited to have you on board.',
        action: {
            instructions: 'To get started with GOIT  CONTACT Book, please click here:',
            button: {
                color: '#22BC66', // Optional action button color
                text: 'Confirm your account',
                link:  `${this.link}/api/users/verify/${verifyToken}`
            }
        },
           }
        };
        return  mailGenerator.generate(email)

    }
    async sendVerifyEmail(email, name, verifyToken) {
        
    }
}