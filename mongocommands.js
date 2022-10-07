db.rent.insertMany([
  {
    img: "img 1",
    name: "name 1",
    hours: 26,
    price: 31,
    id: "1",
  },
  {
    img: "img 2",
    name: "name 2",
    hours: 96,
    price: 53,
    id: "2",
  },
  {
    img: "img 3",
    name: "name 3",
    hours: 20,
    price: 11,
    id: "3",
  },
  {
    img: "img 4",
    name: "name 4",
    hours: 11,
    price: 33,
    id: "4",
  },
  {
    img: "img 5",
    name: "name 5",
    hours: 20,
    price: 8,
    id: "5",
  },
  {
    img: "img 6",
    name: "name 6",
    hours: 23,
    price: 52,
    id: "6",
  },
])


db.rent.find({})
