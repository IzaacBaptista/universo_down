export function checkProperties(obj) {
    let arr = [];
    for (let key in obj) {
      arr.push(obj[key] !== undefined && obj[key] !== null && obj[key] !== "");
    }
    return arr.includes(false);
  }

  