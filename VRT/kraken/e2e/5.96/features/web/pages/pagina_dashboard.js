const path = require('path');
const properties = require(path.join(__dirname, '../../../properties.json'));

class PaginaDashboard {
    constructor(driver) {
        this.driver = driver;
    }

    async navegarADashboard() {
        await this.driver.navigate(properties.URL_DASHBOARD);
    }

    async navegarAPosts() {
        await this.driver.navigate(properties.URL_POSTS);
    }

    async navegarABorradores() {
        await this.driver.navigate(properties.URL_POST_DRAFTS);
    }

    async navegarAPostsProgramados() {
        await this.driver.navigate(properties.URL_POST_SCHEDULE);
    }

    async cerrarSesion() {
        await this.driver.click('.gh-user-name');
        await this.driver.click('.gh-sign-out');
    }

    async estaEnDashboard() {
        return await this.driver.isPresent('.gh-nav');
    }
}

module.exports = PaginaDashboard;