const obj = {
    name: 'Alex',
    age: 33,
    adress: { country: 'UA',
              city: 'Dnipro'},
  };

function copy(val) {
    if (typeof val !== 'object' || val === null) return val;
    
    const objCopy = {};
    for(let key in val){
        objCopy[key] = copy(val[key]);
    }

    return objCopy;
}

const objCopy = copy(obj);