// import { MongoClient, ObjectID } from 'mongodb';
// import test from 'assert';

// import { Log } from './index.js';
// const Log = () => {} // Use this Log function logs will disappear

// import { Kitten } from './models/kitty.js';
const Kitten = require('./models/kitty')
// Connection URL
const url = 'mongodb://demo:123456@127.0.0.1:27017/demo_mongoose';
const collectionName = 'book';

// import mongoose from 'mongoose';
const mongoose = require('mongoose')
mongoose.connect(url, { useNewUrlParser: true });

// for Connected
// const doneCB = () => {
//   mongoose.disconnect();
//   console.log('MongoClient is closing...');
// };
const MongoDo = (toDo) => {
  /// 开启 mongon 的联结
  mongoose.connection.on('error', console.error.bind(console, 'connection error:'));
  mongoose.connection.once('open', function () {
    console.log('Mongoose connection open');
  });

  toDo(() => {
    mongoose.disconnect();
    console.log('MongoClient is closing...');
  });
  // toDo(mongoose, () => {
  //   mongoose.disconnect();
  //   console.log('MongoClient is closing...');
  // });
};

// const insertOne = function () {
//   const toDo = (db, doneCB) => {
//     const fluffy = new Kitten({ name: 'fluffy' });
//     fluffy.save(function (err, fluffy) {
//       if (err) return console.error(err);
//       fluffy.speak();
//       const result = {};
//       // resultCB(result);
//       doneCB(result);
//     });
//   };

//   MongoDo(toDo);
// };
// export { MongoDo };
// const insertOne2 = function (data = null, resultCB = () => {}, { name } = { name: collectionName }) {
//   test.ok(!!data && data !== '');
//   Log('Prepare to insert data', JSON.stringify(data), `to ${name}`);

//   const toDo = (db, doneCB) => {
//     const collection = db.collection(name);
//     collection.insertOne(data, function (err, result) {
//       // test.equal(err, null)
//       if (err) {
//         Log(err);
//       } else {
//         test.equal(1, result.result.n);
//         test.equal(1, result.ops.length);

//         Log('Inserted', JSON.stringify(data), `into the ${name} collection`);
//       }

//       resultCB(result);
//       doneCB(result);
//     });
//   };

//   MongoDo(toDo);
// };

// const insertMany = function (dataList = [], resultCB = () => {}, { name } = { name: collectionName }) {
//   const toDo = (db, doneCB) => {
//     Log('Prepare to insert dataList', JSON.stringify(dataList), `to ${name}`);

//     const dataLength = dataList.length;
//     const collection = db.collection(name);
//     collection.insertMany(
//       dataList,
//       {
//         ordered: false,
//       },
//       function (err, result) {
//         // test.equal(err, null)
//         if (err) {
//           Log(err);
//         } else {
//           test.equal(dataLength, result.result.n);
//           test.equal(dataLength, result.ops.length);

//           Log(`Inserted ${dataLength} items into the ${name} collection`);
//         }

//         resultCB(result);
//         doneCB(result);
//       }
//     );
//   };

//   MongoDo(toDo);
// };

// const find = function (
//   query = {}, // { status: { $exists: true } }
//   resultCB = () => {},
//   { name, skip, limit, sort }
// ) {
//   const toDo = (db, doneCB) => {
//     name = name || collectionName;
//     skip = skip ? parseInt(skip) : 0;
//     limit = limit ? parseInt(limit) : 10;
//     sort = sort ? JSON.parse(sort) : {};

//     Log('Prepare to find the query:', JSON.stringify(query), `with ${JSON.stringify({ name, skip, limit, sort })}`);

//     const collection = db.collection(name);
//     collection
//       .find(query)
//       .skip(skip)
//       .limit(limit)
//       .sort(sort)
//       .toArray(function (err, result) {
//         test.equal(err, null);

//         Log(`Found the following ${result.length} records`);
//         // console.dir(result)

//         resultCB(result);
//         doneCB(result);
//       });
//   };

//   MongoDo(toDo);
// };

// const findOne = function (query = {}, resultCB = () => {}, { name } = { name: collectionName }) {
//   const toDo = (db, doneCB) => {
//     Log('Prepare to find the query:', JSON.stringify(query), `in ${name}`);

//     const collection = db.collection(name);
//     collection.findOne(query, {}, function (err, result) {
//       test.equal(err, null);

//       if (result) {
//         Log(`Found record with filter: ${JSON.stringify(query)}`);
//         // console.dir(result)
//         resultCB(result);
//       } else {
//         Log('Not found any record');
//         resultCB({ message: 'Not found' });
//       }
//       doneCB(result);
//     });
//   };

//   MongoDo(toDo);
// };

// const deleteMany = function (query = {}, resultCB = () => {}, { name } = { name: collectionName }) {
//   const toDo = (db, doneCB) => {
//     Log('Prepare to delete with query:', JSON.stringify(query), `in ${name}`);

//     const collection = db.collection(name);
//     collection.deleteMany(query, { w: 1 }, function (err, result) {
//       test.equal(err, null);

//       Log(`Deleted the following ${result.length} records`);
//       // console.dir(result)

//       resultCB(result);
//       doneCB(result);
//     });
//   };

//   MongoDo(toDo);
// };

// const createIndex = function (fieldOrSpec = '' || {}, resultCB = () => {}, options = {}, name = collectionName) {
//   const toDo = (db, doneCB) => {
//     Log(`Prepare to create Index for ${JSON.stringify(fieldOrSpec)} with ${JSON.stringify(options)}`);

//     const collection = db.collection(name);
//     collection.createIndex(fieldOrSpec, options, function (err, indexName) {
//       test.equal(err, null);

//       Log(`Created Index for ${indexName} with`, JSON.stringify(options));

//       resultCB(indexName);
//       doneCB(indexName);
//     });
//   };

//   MongoDo(toDo);
// };

// const updateMany = function (filter = {}, update = {}, options = {}, resultCB = () => {}, { name } = { name: collectionName }) {
//   const toDo = (db, doneCB) => {
//     Log(`Prepare to updateMany with filter ${JSON.stringify(filter)} and`, JSON.stringify(update));

//     const collection = db.collection(name);
//     collection.updateMany(filter, update, options, function (err, result) {
//       test.equal(err, null);

//       Log(`Update mathced ${result.mathcedCount} modified ${result.modifiedCount}`);

//       resultCB(result);
//       doneCB(result);
//     });
//   };

//   MongoDo(toDo);
// };

// const updateOne = function (filter = {}, update = {}, options = {}, resultCB = () => {}, { name } = { name: collectionName }) {
//   const toDo = (db, doneCB) => {
//     Log(`Prepare to updateOne with filter ${JSON.stringify(filter)} and`, JSON.stringify(update));

//     const collection = db.collection(name);
//     collection.updateOne(filter, update, options, function (err, result) {
//       test.equal(err, null);

//       Log(`Updated! matched ${result.n} modified ${result.nModified}`);

//       resultCB(result);
//       doneCB(result);
//     });
//   };

//   MongoDo(toDo);
// };

// const deleteOne = function (filter = {}, options = {}, resultCB = () => {}, { name } = { name: collectionName }) {
//   const toDo = (db, doneCB) => {
//     Log(`Prepare to deleteOne with filter ${JSON.stringify(filter)} options`, JSON.stringify(options));

//     const collection = db.collection(name);
//     collection.deleteOne(filter, options, function (err, result) {
//       test.equal(err, null);

//       Log(`Removed ${result.n} item!`);

//       resultCB(result);
//       doneCB(result);
//     });
//   };

//   MongoDo(toDo);
// };

// const count = function (query = {}, resultCB = () => {}, { name } = { name: collectionName }) {
//   const toDo = (db, doneCB) => {
//     Log(`Prepare to get count with query ${JSON.stringify(query)}`);

//     const collection = db.collection(name);
//     collection.count(query, function (err, result) {
//       test.equal(err, null);

//       Log(`Count result ${result} records!`);

//       resultCB(result);
//       doneCB(result);
//     });
//   };

//   MongoDo(toDo);
// };

// export default {
//   Client: MongoClient,
//   ObjectId: ObjectID,
//   Do: MongoDo,
//   version: '0.0.1',

//   url,
//   collectionName,
//   test,

//   insertMany,
//   insertOne,
//   find,
//   findOne,
//   deleteMany,
//   createIndex,
//   updateMany,
//   updateOne,
//   deleteOne,
//   count,
// };
