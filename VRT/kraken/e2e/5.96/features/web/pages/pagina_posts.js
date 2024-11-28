const path = require('path');
const properties = require(path.join(__dirname, '../../../properties.json'));

class PaginaPosts {
    constructor(driver) {
        this.driver = driver;
    }

    async ingresarTituloPost(titulo) {
        let element = await this.driver.$('textarea[placeholder="Post title"]');
        await element.setValue(titulo);
    }

    async ingresarDescripcionPost(descripcion) {
        let element = await this.driver.$('div[contenteditable="true"]');
        await element.setValue(descripcion);
    }

    async clickBoton(tipo) {
        let selector;
        switch(tipo) {
            case "Posts":
                selector = '[data-test-nav="posts"]';
                break;
            case "New post":
                selector = 'a[href="#/editor/post/"]';
                break;
            case "Publish":
                selector = '.gh-publish-trigger';
                break;
            case "Continue, final review":
                selector = '[data-test-button="continue"]';
                break;
            case "Publish post, right now - crear":
                selector = '[data-test-button="confirm-publish"]';
                break;
            case "Publish post, right now - crear":
                selector = '[data-test-button="confirm-publish"]';
                break;
            case "Publish post, right now - draft publicado":
                selector = '[data-test-button="confirm-publish"]';
                break;
            case "Editor":
                selector = '[data-test-button="close-publish-flow"]';
                break;
            case "opciones de cuando publicar":
                selector = '[data-test-setting="publish-at"] button';
                break;
            case "programar para publicar luego":
                selector = '.gh-publish-schedule .gh-radio:last-child';            
                break;
            case "Update":
                selector = '[data-test-button="publish-save"]';
                break;
            case "Ver preview post":
                selector = '[data-test-button="publish-preview"]';
                break;
            case "opciones posts":
                selector = '.settings-menu-toggle';
                break;
            case "eliminar post modal": 
                selector = '[data-test-button="delete-post"]';
                break;
            case "eliminar post": 
                selector = '[data-test-button="delete-post-confirm"]';
                break;
            case "obtener primer draft":
                selector = '.gh-post-list-plain-status:has(.draft) a.gh-list-data.gh-post-list-title';
                break;
            default:
                throw new Error(`Tipo de botón no soportado: ${tipo}`);
        }
        await (await this.driver.$(selector)).click();
    }

    async obtenerPost(titulo) {
        const posts = await this.driver.$$('.gh-posts-list-item');
        for (const post of posts) {
            const titleElement = await post.$('.gh-content-entry-title');
            const titleText = await titleElement.getText();
            if (titleText.trim() === titulo) {
                await post.$('a.gh-list-data.gh-post-list-title').click();
                return;
            }
        }
        throw new Error(`No se encontró el post con título "${titulo}"`);
    }

    async verificarPostEnLista(postName) {
        await this.driver.pause(2000);
        const posts = await this.driver.$$('.gh-content-entry-title');
        for (const post of await posts) {
            const titleText = await post.getText();
            if (titleText.trim() === postName) {
                return true;
            }
        }
        return false;
    }

    async verificarPostNoExiste(postName) {
        await this.driver.pause(1000);
        const posts = await this.driver.$$('.gh-content-entry-title');
        for (const post of posts) {
            const titleText = await post.getText();
            if (titleText.trim() === postName) {
                return false;
            }
        }
        return true;
    }

    async verificarPostEnListaProgramados(postName) {
        await this.driver.pause(2000);
        const posts = await this.driver.$$('.gh-posts-list-item-group .gh-content-entry-title');
        for (const post of await posts) {
            const titleText = await post.getText();
            if (titleText.trim() === postName) {
                return true;
            }
        }
        return false;
    }

    async verificarPreviewTitulo(expectedTitle) {
        await this.driver.pause(2000);
        const iframe = await this.driver.$('.gh-pe-iframe');
        await this.driver.switchToFrame(iframe);
        try {
            const titleElement = await this.driver.$('h1.gh-article-title.is-title');
            const actualTitle = await titleElement.getText();
            if (actualTitle !== expectedTitle) {
                throw new Error(`El título en el preview "${actualTitle}" no coincide con el esperado "${expectedTitle}"`);
            }
            return true;
        } finally {
            await this.driver.switchToParentFrame();
        }
    }
}

module.exports = PaginaPosts;