function reverse(s) {
  var result = '';
  var i ;
  for (i = s.length-1 ; i >= 0; i--)
    result += s[i];
  return result;
}
console.log(reverse("fady"))