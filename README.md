# OrderEmails-Microservices-with-docker-compose

This project uses Docker & Docker compose. <br>
To run this project you need to have Docker installed on your computer.<br>
Make sure you have MongoDB installed on your computer. (connection uri points to localhost).<br>

To run this project you need to follow these steps:<br>

1-Create a folder and run: git clone https://github.com/mvs24/OrderEmails-Microservices-with-docker-compose.git (you will get a folder with the name OrderEmails-Microservices-with-docker-compose with the entire project inside)<br>
2- Run on terminal: cd OrderEmails-Microservices-with-docker-compose<br>
3- cd orders-service<br>
3- Run on terminal: npm i (to install all the dependencies of orders-service)<br>
4- cd ..<br>
5- Run: cd messaging-service<br>
6- Run: npm i (to install all the dependencies of messaging-service)<br>
7- cd ..<br>
8- Run: docker-compose up --build, and wait until everything is finished running.<br>
That's it, so easy just 1 command (docker-compose up --build) on the root directory.<br>
Now open the postman and hit a POST REQUEST to localhost:3050/api/orders  (3050 on our host points to port 80 inside the NGINX container)<br>
Do not forget to send some data on the body (ex..{
  "userId":"sfasf",
   "userEmail":"df@gmail.csom", 
   "address":"dfsdf", 
   "products":[
       "dsfsd"
   ]
}
)
That's all. <br>
Enjoy it!!!<br>
