# Draw on map ap

### Project parts
 - Editor ui https://github.com/snicksnk/map-edit-react-redux/blob/master/app/components/FigureEditor.js
 - Maps component https://github.com/snicksnk/map-edit-react-redux/blob/master/app/components/Map.js
 - Figures draw https://github.com/snicksnk/map-edit-react-redux/blob/master/app/lib/figures.js
 - Editor state https://github.com/snicksnk/map-edit-react-redux/blob/master/app/components/Map.js

### Run project (with yarn)

```sh
$ yarn install
$ yarn start
```

### Run with docker

Install docker and docker-compose
- https://docs.docker.com/engine/installation/
- https://docs.docker.com/compose/install/


```sh
$ docker-compose up
```

### Build
yarn:
```sh
$ yarn build
```
docker-compose:
```sh
$ docker-compose exec frontend yarn build
```

### Server rendering
yarn:
```sh
$ yarn build:server
$ yarn run:server
```
docker-compose:
```sh
$ docker-compose exec frontend yarn build
$ docker-compose exec frontend yarn run:server
```
