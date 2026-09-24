function divide_array(input_array, size) {
  // size must be a positive whole number, otherwise the loop below never ends
  if (!Number.isInteger(size) || size < 1) {
    throw new RangeError("size must be a positive integer");
  }
  var result = [];
  // slice() copies each group, so the caller's array is left untouched
  for (var i = 0; i < input_array.length; i += size) {
    result.push(input_array.slice(i, i + size));
  }
  return result;
}
console.log(divide_array(["a","b","c"],2))