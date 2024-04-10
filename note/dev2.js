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
  return array.reduce((acc, _, index) => {
    if (index % pageSize === 0) {
      acc.push(array.slice(index, index + pageSize));
    }
    return acc;
  }, []);
}

const pageSize = 3;
const pages = paginate(dato1, pageSize);

// console.log(pages);
console.log(pages.length);
console.log(pages[0]);
console.log(pages[1]);
console.log(pages[2]);
console.log(pages[3]);
