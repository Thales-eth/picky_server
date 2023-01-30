# PICKY: Una aplicación de fotos creada usando el Stack MERN

Picky es una red social donde los usuarios pueden subir, compartir, comentar y ver fotos de otros usuarios.

# API desplegada

La API desplegada puede encontrarse en el enlace: "https://picky.fly.dev/api"
Todas las rutas descritas en el apartado "Rutas de la aplicación" son endpoints válidos contra esta url. Así, por ejemplo "https://picky.fly.dev/api/photos/list" devuelve el conjunto de fotos de la aplicación. 

La aplicación completa desplegada se puede encontrar en el siguiente enlace: "https://picky-client.vercel.app/"

# Variables de Entorno

Si el proyecto quiere correrse en local, deberá crearse un archivo .env en el directorio raíz. 

Dicho archivo deberá comprender todas estas variables de entorno:

PORT
MONGODB_URI
ORIGIN
CLOUDINARY_NAME
CLOUDINARY_KEY
CLOUDINARY_SECRET
TOKEN_SECRET
SALT

Por motivos obvios de seguridad, no

Para instalar todas las dependencias utilizadas en el proyecto, simplemente se ha de ejecutar el comando:
```
npm install
```

# Colección Postman

En el directorio raíz del proyecto se encontrará una json denominado "Picky.postman_collection.json". A lo largo del desarrollo de este proyecto se usa Postman para testear nuestra api. Se puede importar este archivo directamente como una colección en Postman para visualizar todo el trabajo de testeo. Las peticiones están organizadas por carpetas según las correspondientes rutas. De cada petición se incluyen distintos ejemplos de respuestas y manejos de errores.

# Rutas de la aplicación

| URL path                    | HTTP Method       | Response                          | Action                        |
| :--------------------------:|:-----------------:| :--------------------------------:| :----------------------------:|
| /api/photos/list             | GET               | [photos]                           | Get all photos from the DB     |
| /api/photos/list/likedPhotos/:user_id             | GET               | [likedPhotos]                           | Get all liked photos from User     |
| /api/photos/list/personalPhotos/:user_id             | GET               | [personalPhotos]                           | Get all personal photos from User     |
| /api/photos/getOnePhoto/:photo_id             | GET               | {photo}                           | Get single photo from the DB     |
| /api/photos/upload             | POST               | {photo}                           | Create new photo      |
| /api/photos/edit/:photo_id             | PUT               | {photo}                           | Edit single photo from the DB     |
| /api/photos/delete/:photo_id             | DELETE               | {message: 'Photo deleted'}                           | Delete single photo from the DB     |
| /api/users/list             | GET               | [users]                           | Get all users from the DB     |
| /api/users/friends/:user_id             | GET               | [friends]                           | Get all user friends from the DB     |
| /api/users/getOneUser/:user_id    | GET               | {user}                            | Get single user from DB       |
| /api/users/getLoggedUser    | GET               | {user}                            | Get logged (authenticated) user from DB       |
| /api/users/edit/:user_id      | PUT               | {user}                            | Edit one user from DB         |
| /api/users/follow/:user_id      | PUT               | {user}                            | Add User to friends         |
| /api/users/unfollow/:user_id      | PUT               | {user}                            | Unfollow user from friends         |
| /api/users/like/:photo_id      | PUT               | {user}                            | Edit user likes from DB         |
| /api/users/dislike/:photo_id      | PUT               | {user}                            | Dislike photo and edit user likes from DB         |
| /api/users/delete/:user_id     | DELETE            | {message: 'User deleted'}         | Delete a user                 |
| /api/comments/list/:photo_id             | GET               | [comments]                           | Get all comments from one Photo Post     |
| /api/comments/create/:photo_id             | POST               | {commentedPhoto}                           | Create new comment     |
| /api/comments/edit/:comment_id             | PUT               | {comment}                           | Edit single comment     |
| /api/comments/delete/:comment_id/:photo_id             | DELETE               | {message: "comment deleted"}                           | Delete comment     |
| /api/auth/create            | POST              | {message: 'New User created!'}    | Create a new user             |
| /api/auth/login             | POST              | `Token`    | Log user in             |