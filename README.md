## Prerequisite

To get started, make sure you have [Docker installed](https://docs.docker.com/) on your system and [Docker Compose](https://docs.docker.com/compose/install/), and then clone this repository.

## Getting Started


1. Clone this project:

   ```sh
   git clone https://github.com/djamal-soft/products-categories-js.git
   ```

2. Build the project whit the next commands:

   ```sh
   docker compose up --build
   ```

3. install dependencies via npm:

   ```sh
   npm install
   ```
   
4. Open this url for test project in local server

    ```
    http://localhost:5000
    ```

5. run tests:

   ```sh
   npm test
   ```
## Special Cases

To Down and remove the volumes we use the next command:

```sh
docker compose down -v
```
