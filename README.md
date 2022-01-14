# sylladex
Microservice for storing files

TODO
+ Dockerise
+ persistence volume
- pass fileUpload params through env
+ post a file
- check ways to pass params:
 - multipart
 - query string
 - 2-pass with json
- pass params
 - ttl/strategy/rm after x reads
 - origin
 - meta?
 - owner/privacy?
+ serve file
 + just serve a file
 + make sure application type is correct
 + make sure downloaded filename is correct
- https: enforce or delegate to infra?
- make sure hotlinking and downloading work
