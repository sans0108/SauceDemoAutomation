class LoginPage {

    constructor(page) {

        this.page = page;
        this.baseURL = process.env.BASE_URL;

        // Locators
        this.usernameInput = page.getByPlaceholder("Username");
        this.passwordInput = page.getByPlaceholder("Password");
        this.loginButton = page.getByRole('button', { name: 'login' });

    }

    async open() {
        console.log('Opening Base URL : this.baseURL');
        console.log(this.baseURL);
        this.page.goto(this.baseURL);
        console.log('Landing Page Successfully opened');
    }

    async login(username, password) {

        await this.usernameInput.fill(username);

        await this.passwordInput.fill(password);

        await this.loginButton.click();

    }
}

module.exports = { LoginPage }