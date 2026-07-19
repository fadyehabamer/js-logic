function fetchdata() {
  fetch("https://reqres.in/api/users")
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      const appdata = data.data
        .map((getusers) => {
          return `
          <div class= "data">
          <p> this is ${getusers.first_name} <br></p>
          <p> this is his her avatar<br> <img src="${getusers.avatar}"></p>
          <p> and this is his / her email <br> ${getusers.email}  </p>
          </div> `;
        })
        .join("");

      document.querySelector("#app").insertAdjacentHTML("beforebegin", appdata);
    })
    .catch((error) => {
      console.log(error);
    });
}
fetchdata();
