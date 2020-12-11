const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers')
const Campground = require('../models/campground')

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
})

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error"));
db.once("open", () => {
  console.log("Database Connected");
})

const sample = (array) => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
  await Campground.deleteMany({});
  for(let i = 0; i < 200; i++){
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 30);
    const camp = new Campground({
      author: '5fd0d8ba07365b06c0fffa65',
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      description: 'This operas as lousy as it is brilliant! Your lyrics lack subtlety. You cant just have your characters announce how they feel. That makes me feel angry',
      price,
      geometry: {
        type: "Point",
        coordinates: [
            cities[random1000].longitude,
            cities[random1000].latitude,
        ]
      },
      images: [
        {
          url: 'https://res.cloudinary.com/dysu2ctc9/image/upload/v1607599355/YelpCamp/bxxl4bqixt2ofrk58mxh.jpg',
          filename: 'YelpCamp/bxxl4bqixt2ofrk58mxh'
        },
        {
          url: 'https://res.cloudinary.com/dysu2ctc9/image/upload/v1607599357/YelpCamp/qtxyl9nd7wkwanfd6raf.jpg',
          filename: 'YelpCamp/qtxyl9nd7wkwanfd6raf'
        },
        {
          url: 'https://res.cloudinary.com/dysu2ctc9/image/upload/v1607599358/YelpCamp/a0f7rcanntpb4j82qzgl.jpg',
          filename: 'YelpCamp/a0f7rcanntpb4j82qzgl'
        },
        {
          url: 'https://res.cloudinary.com/dysu2ctc9/image/upload/v1607599361/YelpCamp/k13xshyd2z5rjle6cfo8.jpg',
          filename: 'YelpCamp/k13xshyd2z5rjle6cfo8'
        }
      ]
    })
    await camp.save();
  }
}

seedDB().then(() => {
  mongoose.connection.close();
})
