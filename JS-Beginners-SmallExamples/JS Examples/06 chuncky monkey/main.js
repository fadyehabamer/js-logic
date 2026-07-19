function divide_array(input_array, size) {
  var result = []; 
  while (input_array.length > 0) { 
    result.push(input_array.splice(0, size)); 
  }
  return result; 
}
console.log(divide_array(["a","b","c"],2))