// * https://jsonplaceholder.typicode.com/users

// * if data returns from {promise} => resolve
// * if data not returns from {promise} => reject

// * .json () is also a response

let url = "https://jsonplaceholder.typicode.com/users"


let getUsers = (callbackData) => {
    // callbackData === function
    fetch(url)
        // * if sucess
        .then(response => {
            // * respone with no data
            // console.log(response);
            return response.json()
        }).then(data => {
            // console.log(data)
            //  * Not recomended to put logic on data here..
            // * Single reponsability principal (function for one purpose)
            callbackData(data)
        })
        .catch()
        // * if fail
        .catch()
}
getUsers(
    function (data) {
        console.log(data);
        // * add Logic Here
        let ul = document.createElement("ul")
        for (let i = 0; i < data.length; i++) {
            ul.innerHTML +=
                `
            <li>
            id  =   ${data[i].id} 
            <br/>
            name = ${data[i].name}
            <br/>
            phone = ${data[i].phone}

            </li>
            `
        }
        document.body.appendChild(ul)

    }
)

// ====================================================================

// * Call Back Functions

function testCallBack(x) {
    x()
}
testCallBack(
    function () {
        console.log("hi")
    }
)

// * ==================================================================

// * Promisies

let promiseFunc = new Promise(function (resolve, reject) {
    if (true) {
        resolve("YES")
    } else {
        reject("ERROR")
    }
})
promiseFunc
    .then(res => console.log(res))
    .catch()

// * ===================================================================

//  * ASYNC  //  AWAIT

async function ASYNCgetUsers() {
    try {
        let response = await fetch(url) // promise

        let data = await response.json() // promise
        console.log(data)
    }
    catch (error) {
        console.log(error)
    }
}
ASYNCgetUsers()