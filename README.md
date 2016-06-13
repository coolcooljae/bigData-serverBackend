This simple project shows how to serve **REST APIs via Node.js** server and store data into **Mongodb**.  I tried to cover various aspects of REST APIs including GET, POST, PUT, and DELETE.  Also I chose a simple document that has three fields to represent a cell phone user info; firstName, lastName, and cellNumber.

##### Initial simple version
- I started with a single js file to have functionalities working first.  It has all code including Mongodb connection, express setup & start, and actual code to serve REST APIs.

rest2mongodb.js


##### Refactored version
- Then I refactroed the initial simple version to have structures that I'd like to have if I were to ship this code; application (app.js), request routing part (routes/), and actual code to serve REST APIs (cellphone/).  Of course this might be an overkill for my simple example, but it never hurts to have right code structure. ;-)

app.js

cellphone/

package.json

routes/
