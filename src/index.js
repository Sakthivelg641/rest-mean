import express from "express";
import mongoose from "mongoose";
import userController from "./userController";
import bodyParser from "body-parser";

const server = async () => {
  const app = express();

  let urlencodedParser = bodyParser.json();
  app.use(bodyParser.json()); app.use(bodyParser.urlencoded({extended: true,}));

   try {
     await mongoose.connect("<MongoDB Atlas Connection String>", {useNewUrlParser: true})
   }catch (err) {
     console.log(err)
   }
  app.get('/api', function (req, res) {
    res.json({
      status: 'API is working',
      message: 'Welcome to REST API'
    });
  });
  app.route('/api/user').get(userController.index).post(userController.new);
  app.route('/api/user/:id').get(userController.view)
    .patch(userController.update)
    .put(userController.update)
    .delete(userController.delete);

  app.get('/', (req, res) => res.send("Hello world! from REST"))
  app.listen({port: 4002}, () => {
    console.log('Connected');
  })
}

server();
