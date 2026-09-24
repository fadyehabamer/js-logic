function largestOfFour(arr) {
  var results = [];
  for (var n = 0; n < arr.length; n++) {
    if (arr[n].length === 0) {
      results[n] = null;
      continue;
    }

    var largestNumber = arr[n][0];
    for (var sb = 1; sb < arr[n].length; sb++) {
      if (arr[n][sb] > largestNumber) {
        largestNumber = arr[n][sb];
      }
    }

    results[n] = largestNumber;
  }

  return results;
}
