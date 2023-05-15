# PROJECT NAME

## Description 

## Tools
- Javascript
- HTML
- CSS (Boostrap)
- MongoDB
- Node. Dependences:
    - Express (IronLauncher)
    - Mongoose
    - Brcryptjs
    - Axios
    - Cloudinary
    - Multer

## APIS
- Spotify API
- Google Maps API

## MODELS
- User
- Events

## MIDDLEWARES



## Index endpoint table

| HTTP Method 	| URI path      	| Description                                    	| JSON 	|
|-------------	|---------------	|------------------------------------------------	|---------	|
| GET         	| `/`             	| Index page            	| |


## Auth endpoint table

| HTTP Method 	| URI path      	| Description                                    	| JSON 	|
|-------------	|---------------	|------------------------------------------------	|---------	|
| GET         	| `/signup` 	    | Signup form render       	| |
| POST         	| `/signup` 	    | Signup form handler    	| |
| GET         	| `/login`   	    | Login form render     	| |
| POST         	| `/login` 	        | Login form handler     	| |
| POST         	| `/logout` 	    | Logout                    | |


## User endpoint table

| HTTP Method 	| URI path      	            | Description                                    	| JSON 	|
|-------------	|---------------	            |------------------------------------------------	|---------	|
| GET         	| `/users`                      | Users List                                    | |
| GET         	| `/users/:id` 	                | User profile       	                        | |
| GET         	| `/users/:id/edit`             | User profile edit form render                 | |
| POST         	| `/users/:id/edit`             | User profile edit form render                 | |
| POST         	| `/users/:id/delete`           | User delete profile handler      	            | |


## Event endpoint table

| HTTP Method 	| URI path      	            | Description                                    	| JSON 	|
|-------------	|---------------	            |------------------------------------------------	|---------	|
| GET         	| `/events`                  	| Events List                       | |
| GET         	| `/events/:id` 	            | Event Details       	            | |
| GET         	| `/events/create`              | Event create form render          | |
| POST         	| `/events/create`              | Event create form handler         | |
| GET         	| `/events/:id/edit`            | Event edit form render            | |
| POST         	| `/events/:id/edit`            | Event edit form handler           | |
| POST         	| `/events/:id/delete`          | Event delete handler              | |


## Artist endpoint table

| HTTP Method 	| URI path      	| Description                                    	| JSON 	|
|-------------	|---------------	|------------------------------------------------	|---------	|
| GET         	| `/artists`        | Artists List                      | |             |  ✅  |
| GET         	| `/artists/:id` 	| Artist Details       	            | |             |  ✅  |


## API endpoint table

| HTTP Method 	| URI path      	| Description                                    	| JSON 	|
|-------------	|---------------	|------------------------------------------------	|---------	|
| GET         	| `/api/artists` 	| Artists `Array` 	                                |  ✅  |