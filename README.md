# OrderEmails-Microservices-with-docker-compose

This project uses Docker & Docker compose.
To run this project you need to have Docker installed on your computer.
Make sure you have MongoDB installed on your computer. (connection uri points to localhost).

To run this project you need to follow these steps:

1-Create a folder and run: git clone https://github.com/mvs24/OrderEmails-Microservices-with-docker-compose.git (you will get a folder with the name OrderEmails-Microservices-with-docker-compose with the entire project inside)
2- Run on terminal: cd OrderEmails-Microservices-with-docker-compose
3- cd orders-service
3- Run on terminal: npm i (to install all the dependencies of orders-service)
4- cd ..
5- Run: cd messaging-service
6- Run: npm i (to install all the dependencies of messaging-service)
7- cd ..
8- Run: docker-compose up --build, and wait until everything is finished running.
That's it, so easy just 1 command (docker-compose up --build) on the root directory.
Now open the postman and hit a POST REQUEST to localhost:3050/api/orders  (3050 on our host points to port 80 inside the NGINX container)
Do not forget to send some data on the body (ex..{
  "userId":"sfasf",
   "userEmail":"df@gmail.csom", 
   "address":"dfsdf", 
   "products":[
       "dsfsd"
   ]
}
)
That's all. 
Enjoy it!!!
