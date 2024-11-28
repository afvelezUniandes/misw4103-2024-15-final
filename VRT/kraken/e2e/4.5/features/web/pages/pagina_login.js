const path = require('path');
const properties = require(path.join(__dirname, '../../../properties.json'));

class PaginaLogin {
    constructor(driver) {
        this.driver = driver;
    }

    async abrirGhost() {
        await this.driver.url(properties.BASE_URL + "/ghost/#/signin");
    }

    async iniciarSesionInvalido() {
        await this.driver.$('input[name="identification"]').setValue("wrong@example.com");
        await this.driver.$('input[name="password"]').setValue("wrongpassword");
        await this.driver.$('button[type="submit"]').click();
    }

    async iniciarSesionValido() {
        await this.driver.$('input[name="identification"]').setValue(properties.USERNAME);
        await this.driver.$('input[name="password"]').setValue(properties.PASSWORD);
        await this.driver.$('button[type="submit"]').click();
    }

    async obtenerMensajeError() {
        return await this.driver.$("p.main-error").getText();
    }

    async cerrarSesion() {
        await this.driver.$(".gh-user-avatar").click();
        await this.driver.$("a.user-menu-signout").click();
    }

    async obtenerUrl() {
        return await this.driver.getUrl();
    }
}

module.exports = PaginaLogin;