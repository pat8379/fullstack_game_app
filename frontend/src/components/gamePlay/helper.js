const itemCounter = (array, item) => {
    return array.filter((currentItem) => currentItem === item).length;
};

function getAllIndexes(arr, val) {
    let indexes = [];
    for(let i = 0; i < arr.length; i++)
        if (arr[i] === val)
            indexes.push(i);
    return indexes;
}

const randomizerTest = () => {
    return [3,1,3,3,1,3,3,3,3]
}

const randomizer = (point) => {
    let arr = [3,3,3,3,3,3,3,3,3]
    let index = Math.floor(Math.random() * 9)
    let first = Math.floor(Math.random() * 3)
    if (point < 30) {
        arr[index] = first
    } else if (point < 70) {
        arr[index] = first
        let index2 = Math.floor(Math.random() * 9)
        while (index2 === index) {
            index2 = Math.floor(Math.random() * 9)
        }
        arr[index2] = Math.floor(Math.random() * 3)
    } else if (point < 140) {
        arr[index] = first
        let index2 = Math.floor(Math.random() * 9)
        let index3 = Math.floor(Math.random() * 9)
        while (index2 === index) {
            index2 = Math.floor(Math.random() * 9)
        }
        arr[index2] = Math.floor(Math.random() * 3)
        while(index3 === index || index3 === index2) {
            index3 = Math.floor(Math.random() * 9)
        }
        arr[index3] = Math.floor(Math.random() * 3)
    } else if (point < 320) {
        arr[index] = 1
        let index2 = Math.floor(Math.random() * 9)
        let index3 = Math.floor(Math.random() * 9)
        while (index2 === index) {
            index2 = Math.floor(Math.random() * 9)
        }
        arr[index2] = 1
        while(index3 === index || index3 === index2) {
            index3 = Math.floor(Math.random() * 9)
        }
        arr[index3] = 1
    } else if (point < 400) {
        arr[index] = first
        let index2 = Math.floor(Math.random() * 9)
        let index3 = Math.floor(Math.random() * 9)
        let index4 = Math.floor(Math.random() * 9)
        while (index2 === index) {
            index2 = Math.floor(Math.random() * 9)
        }
        arr[index2] = Math.floor(Math.random() * 3)
        while(index3 === index || index3 === index2) {
            index3 = Math.floor(Math.random() * 9)
        }
        arr[index3] = Math.floor(Math.random() * 3)
        while (index4 === index3 || index4 === index2 || index4 === index) {
            index4 = Math.floor(Math.random() * 9)
        }
        arr[index4] = Math.floor(Math.random() * 3)
    } else if (point < 500) {
        arr = [2,2,2,2,2,2,2,2,2]
        arr[index] = 1
    } else if (point < 550) {
        arr = [2,2,2,2,2,2,2,2,2]
        arr[index] = 1
        let index2 = Math.floor(Math.random() * 9)
        let index3 = Math.floor(Math.random() * 9)
        while (index2 === index) {
            index2 = Math.floor(Math.random() * 9)
        }
        arr[index2] = 1
        while(index3 === index || index3 === index2) {
            index3 = Math.floor(Math.random() * 9)
        }
        arr[index3] = 1
    } else if (point < 700) {
        arr = [2,2,2,2,2,2,2,2,2]
        arr[index] = 1
        let index2 = Math.floor(Math.random() * 9)
        let index3 = Math.floor(Math.random() * 9)
        let index4 = Math.floor(Math.random() * 9)
        while (index2 === index) {
            index2 = Math.floor(Math.random() * 9)
        }
        arr[index2] = 1
        while(index3 === index || index3 === index2) {
            index3 = Math.floor(Math.random() * 9)
        }
        arr[index3] = 1
        while (index4 === index3 || index4 === index2 || index4 === index) {
            index4 = Math.floor(Math.random() * 9)
        }
        arr[index4] = 1
    } else {
        arr = [1,1,1,1,1,1,1,1,1]
        arr[index] = 2
        let index2 = Math.floor(Math.random() * 9)
        let index3 = Math.floor(Math.random() * 9)
        let index4 = Math.floor(Math.random() * 9)
        while (index2 === index) {
            index2 = Math.floor(Math.random() * 9)
        }
        arr[index2] = 2
        while(index3 === index || index3 === index2) {
            index3 = Math.floor(Math.random() * 9)
        }
        arr[index3] = 2
        while (index4 === index3 || index4 === index2 || index4 === index) {
            index4 = Math.floor(Math.random() * 9)
        }
        arr[index4] = 2
    }

   return arr
}

// console.log(itemCounter([1,1,1,1,1,1,1,1,1],1))
// console.log(getAllIndexes([1,2,2,2,1,2,2,1,0],1))

module.exports = {
    randomizer,
    itemCounter,
    getAllIndexes,
    randomizerTest
}

/* 
1 random - 30
2 random - 70
3 random - 120
3 fast - 300
4 random - 400
8 red 1 fast - 450
6 red 3 fast - 600
4 fast 5 red - 700
5 fast 4 red - inf

*/ 
