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
| /api/users/getOneUser/:user_id    | GET               | {user}                            | Get single user from DB       |
| /api/users/getLoggedUser    | GET               | {user}                            | Get logged (authenticated) user from DB       |
| /api/users/edit/:user_id      | PUT               | {user}                            | Edit one user from DB         |
| /api/users/like/:photo_id      | PUT               | {user}                            | Edit user likes from DB         |
| /api/users/dislike/:photo_id      | PUT               | {user}                            | Dislike photo and edit user likes from DB         |
| /api/users/delete/:user_id     | DELETE            | {message: 'User deleted'}         | Delete a user                 |
| /api/comments/list/:photo_id             | GET               | [comments]                           | Get all comments from one Photo Post     |
| /api/comments/create/:photo_id             | POST               | {commentedPhoto}                           | Create new comment     |
| /api/comments/edit/:comment_id             | PUT               | {comment}                           | Edit single comment     |
| /api/comments/delete/:comment_id/:photo_id             | DELETE               | {message: "comment deleted"}                           | Delete comment     |
| /api/auth/create            | POST              | {message: 'New User created!'}    | Create a new user             |
| /api/auth/login             | POST              | `Token`    | Log user in             |