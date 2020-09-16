const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectID;
require("dotenv").config();

const url = process.env.MONGODB_URL;
const databaseName = process.env.MONGODB_DATABASE;

console.log(url);
console.log(databaseName);

const collectionName = "todo";
const settings = {
  useUnifiedTopology: true,
};

let databaseClient;
let todoName;

// connect()
const connect = function () {
  return new Promise((resolve, reject) => {
    MongoClient.connect(url, settings, (error, client) => {
      if (error) {
        console.log(error);
        reject(error);
        return;
      }

      databaseClient = client.db(databaseName);
      todoName = databaseClient.collection(collectionName);
      console.log("Successfully Connected to Database!");
      resolve();
    });
  });
};

// insert()
const insertOne = function (todo) {
  return new Promise((resolve, reject) => {
    todoName.insertOne(todo, (error, result) => {
      if (error) {
        console.log(error);
        reject(error);
        return;
      }

      console.log("Successfully Inserted Document");
      resolve();
    });
  });
};
// find()
const findAll = function () {
  const query = {};

  return new Promise((resolve, reject) => {
    todoName.find(query).toArray((error, documents) => {
      if (error) {
        console.log(error);
        reject(error);
        return;
      }
      console.log(`Sucessfully found ${documents.length} Documents`);
      resolve(documents);
    });
  });
};
// update()
const updateOne = function (query, todoList) {
  const todoListQuery = {};

  if (todoList.title) {
    todoListQuery.title = todoList.title;
  }
  console.log(query);

  return new Promise((resolve, reject) => {
    todoName.updateOne(query, { $set: todoListQuery }, (error, result) => {
      if (error) {
        console.log(error);
        reject(error);
        return;
      }

      console.log("Successfully Updated Document");
      resolve();
    });
  });
};

// delete()
const deleteOne = function (query) {
  return new Promise((resolve, reject) => {
    todoName.deleteOne(query, (error, result) => {
      if (error) {
        console.log(error);
        reject(error);
        return;
      }
      console.log("Successfully Deleted Document!");
      resolve();
    });
  });
};

// TESTS
(async () => {
  // run node dataAccessLayer.js
  await connect();

  //   Test insertOne
  //   const todoList = {
  //     chore: "vacuum",
  //   };
  //   await insertOne(todoList);

  // Test findall
  const todo = await findAll();
  console.log(todo);

  //   Test updateOne
  //   const todoListQuery = {
  //     _id: new ObjectId("5f615d7c041378306570d906"),
  //   };
  //   const todoList = {
  //     chore: "Walk the dog",
  //   };

  //   await updateOne(todoListQuery, todoList);

  // Test DeleteOne
  //   const todoListQuery = {
  //     _id: new ObjectId("5f615d7c041378306570d906"),
  //   };
  //   await deleteOne(todoListQuery);

  console.log("END");
  process.exit(0);
})();
