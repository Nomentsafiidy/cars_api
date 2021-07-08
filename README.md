# cars

APIs permettant géré des voitures

## technology used

```
NodeJS Javascript MySQL

```

## Project setup

```
npm install
```

```
copy .env.local in .env file any configue it
```

### run project in dev

```
npm run dev
```

### run production file

```
npm run start
```

# DB table

create a DB and exec commands below

## table user

```

CREATE TABLE `cars`.`user` ( `id` INT NOT NULL AUTO_INCREMENT , `email` MEDIUMTEXT NOT NULL , `name` MEDIUMTEXT NOT NULL , `password` TEXT NOT NULL , PRIMARY KEY (`id`)) ENGINE = InnoDB;

```

## table car

```

CREATE TABLE `cars`.`car` ( `id` INT NOT NULL AUTO_INCREMENT , `user_id` INT NOT NULL , `registration` MEDIUMTEXT NOT NULL , `name` MEDIUMTEXT NOT NULL , PRIMARY KEY (`id`)) ENGINE = InnoDB;

```

## table comment

```

CREATE TABLE `cars`.`comment` ( `id` INT NOT NULL AUTO_INCREMENT , `car_id` INT NOT NULL , `user_id` INT NOT NULL , `content` TEXT NOT NULL , `createdAt` BIGINT NOT NULL , PRIMARY KEY (`id`)) ENGINE = InnoDB;

```

# Configue

```
Configue your .env before runnig project
```

```
copy .env.local in .env file any configue it
```

# API

```
POST /login

bodyParams => {
	"email": "mnomentsafidy@gmail.com",
	"password":"123456"
     }
```

```
POST /addUser

bodyParams => {
	"user": {
		"name": "nomentsafidy",
		"email": "mnomentsafidy@gmail.com",
		"password": "123456"
	}
 }
```

```
GET /getCars

headersParams => {
	Authorization: "Bearer [token]"
 }

```

```
POST /addCar

headersParams => {
	Authorization: "Bearer [token]"
 }

bodyParams => {
	"car": {
		"name": "Camaro",
	"user_id":"1",
	"registration": "3025 TAB"
	}
}
```

```
POST /addComment

headersParams => {
	Authorization: "Bearer [token]"
 }

bodyParams => {
	"comment": {
		"car_id": 1,
	"user_id":1,
	"content": "Comment content"
	}
}
```
