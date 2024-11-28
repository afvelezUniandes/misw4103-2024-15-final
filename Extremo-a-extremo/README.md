# misw4103-2024-15-pruebas-cypress-kraken

Este repositorio contiene pruebas automatizadas utilizando Cypress y Kraken.

## Requisitos

- Node.js (versión 12 o superior)
- npm (versión 6 o superior)

## Instalación

1. Clona el repositorio:

   ```bash
   git clone https://github.com/afvelezUniandes/misw4103-2024-15-pruebas-cypress-kraken.git
   cd misw4103-2024-15-pruebas-cypress-kraken
   ```

2. Instala las dependencias:
   ```bash
   npm install
   ```

## Cypress y Kraken

### Configuración

Cypress está configurado en el directorio `cypress`. Puedes encontrar los archivos de configuración en `cypress.json`.
Kraken está configurado en el directorio `features`. Puedes encontrar los archivos de configuracion en `properties.json`

### Manejo de Escenarios en Kraken

Debido a la separación de los escenarios de Kraken, debes seguir estos pasos para ejecutar y mover los archivos de features:

1. Ubica los archivos con features que aún no se han ejecutado en la carpeta de kraken-feautres-para-ejecutar y moverlos a la carpeta de kraken/features.
2. Ejecuta los escenarios de Kraken con el siguiente comando, y ejecutara los escenarios del feature que esta dentro de la carpeta kraken/features.

- En la terminal de consola muevete a la carpeta kraken.

```bash
cd kraken
```

```bash
npx kraken-node run
```

3. Una vez que los escenarios se hayan ejecutado, mueve el archio de feature ejecutados a la carpeta kraken-features-ejecutados.
4. Repite los pasos 1-3 cada vez que quieras ejecutar los escenarios de Kraken.

### Ejecución de Pruebas

Para ejecutar las pruebas de Cypress, utiliza el siguiente comando:

```bash
npx cypress open
```

Para ejecutar las pruebas de Kraken, utiliza el siguiente comando:

```bash
npx kraken-node run
```
