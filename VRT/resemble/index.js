const compareImages = require("resemblejs/compareImages");
const fs = require('fs');
const config = require('./config.json');

function createReport(datetime, scenarios, resultInfo) {
    return `
    <html>
        <head>
            <title>Reporte de Regresión Visual - Ghost</title>
            <style>
                ${fs.readFileSync('./index.css', 'utf8')}
            </style>
        </head>
        <body>
            <h1>Reporte de comparación - Ghost versión 4.5 vs 5.96</h1>
            <p>Ejecutado: ${datetime}</p>
            <div id="visualizer">
                ${scenarios.map(scenario => {
                    const sanitizedLabel = scenario.label.replace(/\s+/g, '-').toLowerCase();
                    return `
                    <div class="browser">
                        <div class="btitle">
                            <h2>Escenario: ${scenario.label}</h2>
                            ${resultInfo[scenario.label] ? `
                                <p>Diferencia: ${resultInfo[scenario.label].misMatchPercentage}%</p>
                                <p>Tiempo de análisis: ${resultInfo[scenario.label].analysisTime}ms</p>
                            ` : ''}
                        </div>
                        <div class="imgline">
                            <div class="imgcontainer">
                                <span class="imgname">Versión 4.5</span>
                                <img class="img2" src="../../screenshots/${scenario.before}" id="refImage">
                            </div>
                            <div class="imgcontainer">
                                <span class="imgname">Versión 5.96</span>
                                <img class="img2" src="../../screenshots/${scenario.after}" id="testImage">
                            </div>
                        </div>
                        <div class="imgline">
                            <div class="imgcontainer">
                                <span class="imgname">Diferencias</span>
                                <img class="imgfull" src="./compare-${sanitizedLabel}.png" id="diffImage">
                            </div>
                        </div>
                    </div>
                    `;
                }).join('')}
            </div>
        </body>
    </html>`;
}

async function executeTest() {
    let resultInfo = {};
    const datetime = new Date().toISOString().replace(/:/g, ".");
    
    if (!fs.existsSync('./results')){
        fs.mkdirSync('./results', { recursive: true });
    }
    
    const resultDir = `./results/${datetime}`;
    fs.mkdirSync(resultDir, { recursive: true });

    for (const scenario of config.scenarios) {
        console.log(`Comparando escenario: ${scenario.label}`);
        
        const beforeImageFile = `./screenshots/${scenario.before}`;
        const afterImageFile = `./screenshots/${scenario.after}`;

        if (!fs.existsSync(beforeImageFile)) {
            console.error(`No se encuentra la imagen de referencia: ${beforeImageFile}`);
            continue;
        }
        if (!fs.existsSync(afterImageFile)) {
            console.error(`No se encuentra la imagen de prueba: ${afterImageFile}`);
            continue;
        }

        try {
            const data = await compareImages(
                fs.readFileSync(beforeImageFile),
                fs.readFileSync(afterImageFile),
                config.options
            );

            resultInfo[scenario.label] = {
                isSameDimensions: data.isSameDimensions,
                dimensionDifference: data.dimensionDifference,
                rawMisMatchPercentage: data.rawMisMatchPercentage,
                misMatchPercentage: data.misMatchPercentage,
                diffBounds: data.diffBounds,
                analysisTime: data.analysisTime
            };

            const sanitizedLabel = scenario.label.replace(/\s+/g, '-').toLowerCase();
            fs.writeFileSync(`${resultDir}/compare-${sanitizedLabel}.png`, data.getBuffer());
            
        } catch (error) {
            console.error(`Error al procesar ${scenario.label}:`, error);
        }
    }

    fs.writeFileSync(`${resultDir}/report.html`, createReport(datetime, config.scenarios, resultInfo));
    fs.copyFileSync('./index.css', `${resultDir}/index.css`);
    console.log(`Reporte generado en: ${resultDir}/report.html`);
    return resultInfo;
}

(async () => {
    try {
        console.log("Iniciando comparación de imágenes...");
        const results = await executeTest();
        console.log("Proceso completado exitosamente");
    } catch (error) {
        console.error("Error durante la ejecución:", error);
    }
})();