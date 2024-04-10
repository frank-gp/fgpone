// const dato1 = [
//   { _id: 1, name: "frank 1" },
//   { _id: 2, name: "frank 2" },
//   { _id: 3, name: "frank 3" },
//   { _id: 4, name: "frank 4" },
//   { _id: 5, name: "frank 5" },
//   { _id: 6, name: "frank 6" },
//   { _id: 7, name: "frank 7" },
//   { _id: 8, name: "frank 8" },
//   { _id: 9, name: "frank 9" },
//   { _id: 10, name: "frank 10" },
// ];

// console.log(dato1.length)

// const pageSize = 

function getPaginatedItems(page = 1, perPage = 10) {
  try {
    const items = dato1;
    // .skip((page - 1) * perPage)
    // .limit(perPage);

    // const totalItems =  Item.countDocuments();
    const totalItems = dato1.length();
    console.log(totalItems);
    // return {
    //   items,
    //   currentPage: page,
    //   totalPages: Math.ceil(totalItems / perPage),
    // };
  } catch (error) {
    throw new Error(error.message);
  }
}

// getPaginatedItems()

const dato1 = [
  { _id: 1, name: "frank 1" },
  { _id: 2, name: "frank 2" },
  { _id: 3, name: "frank 3" },
  { _id: 4, name: "frank 4" },
  { _id: 5, name: "frank 5" },
  { _id: 6, name: "frank 6" },
  { _id: 7, name: "frank 7" },
  { _id: 8, name: "frank 8" },
  { _id: 9, name: "frank 9" },
  { _id: 10, name: "frank 10" },
];

function paginate(array, pageSize) {
  return array.reduce((acc, item, index) => {
    const pageIndex = Math.floor(index / pageSize);
    if (!acc[pageIndex]) {
      acc[pageIndex] = []; // create a new page if it doesn't exist
    }
    acc[pageIndex].push(item);
    return acc;
  }, []);
}

const pageSize = 3;
const pages = paginate(dato1, pageSize);

console.log(pages);
