    const puppeteer = require('puppeteer')

    describe('Prueba Pagina GAP', () => {    
        it('Prueba por imagen', async () => {
            const browser = await puppeteer.launch({ headless: true,args: ['--start-maximized'],defaultViewport: {
                width: 1920,
                height: 1080
            }})
            const page = await browser.newPage()
            await page.goto('https://www.gap.com.mx/tienda/home')
            await page.waitForSelector('#__next > main > header > div.o-header > div.o-container__fluid.container-fluid.d-none.d-lg-block.c-megaMenu > div > div > ul > li:nth-child(1) > a')
            const modulo = await page.$('#__next > main > header > div.o-header > div.o-container__fluid.container-fluid.d-none.d-lg-block.c-megaMenu > div > div > ul > li:nth-child(1) > a')

            const moduloText = await page.evaluate(anchor => anchor.textContent, modulo);
            if (moduloText =='Mujer') {
                await modulo.click()
            }  else {
                throw new Error(`El enlace no contiene el texto esperado. Se encontró: "${moduloText}".`)
            }

            await page.waitForSelector('#__next > main > div.min-vh-100.behind-overlay > main > div.container-fluid.o-main-container.p-0.o-clp-secondaryContainer > div > div > div.row.mt-lg-3.m-row-bootstrap.leftMenu-clpMobile > div > div.o-clp-mainContent > section > div > div > div > figure > a > div > img') 
            const imageSelector = '#__next > main > div.min-vh-100.behind-overlay > main > div.container-fluid.o-main-container.p-0.o-clp-secondaryContainer > div > div > div.row.mt-lg-3.m-row-bootstrap.leftMenu-clpMobile > div > div.o-clp-mainContent > section > div > div > div > figure > a > div > img'

            const imageExists = await page.$(imageSelector) !== null
    
            if (imageExists) {
                console.log('La imagen se encuentra en la página.')
            } else {
                throw new Error('La imagen no se encuentra en la página.')
            }
            await browser.close()
    })

        it('Prueba por Selector', async () => {
            const browser = await puppeteer.launch({ headless: true,args: ['--start-maximized'],defaultViewport: {
                width: 1920,
                height: 1080
            }})
            const page = await browser.newPage()
            await page.goto('https://www.gap.com.mx/tienda/home')
            await page.waitForSelector('#__next > main > header > div.o-header > div.o-container__fluid.container-fluid.d-none.d-lg-block.c-megaMenu > div > div > ul > li:nth-child(1) > a')
            const modulo = await page.$('#__next > main > header > div.o-header > div.o-container__fluid.container-fluid.d-none.d-lg-block.c-megaMenu > div > div > ul > li:nth-child(1) > a')

            const moduloText = await page.evaluate(anchor => anchor.textContent, modulo);
            if (moduloText =='Mujer') {
                await modulo.click()
            }  else {
                throw new Error(`El enlace no contiene el texto esperado. Se encontró: "${moduloText}".`)
            }

            const esperaSelector = await page.waitForSelector('#__next > main > div.min-vh-100.behind-overlay > main > div.container-fluid.o-main-container.p-0.o-clp-secondaryContainer > div > div > div.row.mt-lg-3.m-row-bootstrap.leftMenu-clpMobile > aside > div > div > div') 
            
            if (esperaSelector) {
                console.log('Selector esperado')
            }

            await browser.close()
            
        })

        it('Prueba por URL', async () => {
            console.log('La version no me permite el uso de waitForXpath, tercera prueba con base en la URL esperada')
            const browser = await puppeteer.launch({ headless: true,args: ['--start-maximized'],defaultViewport: {
                width: 1920,
                height: 1080
            }})
            const page = await browser.newPage()
            await page.goto('https://www.gap.com.mx/tienda/home')
            await page.waitForSelector('#__next > main > header > div.o-header > div.o-container__fluid.container-fluid.d-none.d-lg-block.c-megaMenu > div > div > ul > li:nth-child(1) > a')
            const modulo = await page.$('#__next > main > header > div.o-header > div.o-container__fluid.container-fluid.d-none.d-lg-block.c-megaMenu > div > div > ul > li:nth-child(1) > a')

            const moduloText = await page.evaluate(anchor => anchor.textContent, modulo);
            if (moduloText =='Mujer') {
                await modulo.click()
            }  else {
                throw new Error(`El enlace no contiene el texto esperado. Se encontró: "${moduloText}".`)
            }

            const esperaUrl = 'https://www.gap.com.mx/tienda/mujer/catst19116464'
            await page.waitForSelector('#__next > main > div.min-vh-100.behind-overlay > main > div.container-fluid.o-main-container.p-0.o-clp-secondaryContainer > div > div > div.row.mt-lg-3.m-row-bootstrap.leftMenu-clpMobile > div > div.o-clp-mainContent > section > div > div > div > figure > a > div > img') 
            
            const obtenURL = page.url()

            if (esperaUrl == obtenURL) {
                console.log('URL esperada')
            }  else {
                throw new Error(`URL No esperada`)
            }

            await browser.close()

        })
    })