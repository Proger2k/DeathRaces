async function Login(user) {
    let response = await fetch("users/login", {
        method: "POST",
        headers: { "Accept": "application/json", "Content-Type": "application/json" },
        body: JSON.stringify(user)
    });
    if (response.ok === true) {

        const user = await response.json()

        document.location.href = "index.html" + "?id=" + user.userid
    }
    else {
        console.log()
    }
}

function addError(errors) {
    errors.forEach(error => {
        const p = document.createElement("p");
        p.append(error);
        document.getElementById("errors").append(p);
    });
}

document.forms["loginForm"].addEventListener("submit", e => {
    e.preventDefault();

    const form = document.forms["loginForm"]
    const name = form.elements["name"].value
    const password = form.elements["password"].value

    let user = {
        'nickName': name,
        'password': password
    }

    Login(user)
})
