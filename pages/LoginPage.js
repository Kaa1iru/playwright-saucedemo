export class LoginPage {
    constructor(page){
        this.page = page;

        this.usernameInput = page.getByPlaceholder('Username');
        this.passwordInput = page.getByPlaceholder('Password');
        this.loginButton = page.getByRole('button', { name: 'Login' });
        this.errorMessage = page.getByText('Epic sadface');
    }

    async goto(){
        await this.page.goto('https://www.saucedemo.com/');
    }

    async inputCredentials(username, password){
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
    }

    async login(){
        await this.loginButton.click();
    }
}