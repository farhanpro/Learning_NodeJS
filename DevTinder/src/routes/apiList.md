
## profile router
-GET /profile/view
-PATCH /profile/edit
-PATCH /profile/password

## connection Request Router
-POST /request/send/intersted/:userId
-POST /request/send/ignored/:userId
-POST /request/review/accepted/:requestId
-POST /request/review/rejected/:requestId

## usrtRouter
- GET /user/connections
-GET /user/requests
-GET/ users/feed/ - Gets you the profile of other users from the platform

STATUS: ignored,intrested,accepted,rejected
