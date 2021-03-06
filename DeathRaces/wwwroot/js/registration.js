async function Registration(user) {
    let response = await fetch("users/registration", {
        method: "POST",
        headers: { "Accept": "application/json", "Content-Type": "application/json" },
        body: JSON.stringify(user)
    });
    if (response.ok === true) {
        const user = await response.json()
        document.location.href = "index.html" + "?id=" + user.id
    }
}

function addError(errors) {
    errors.forEach(error => {
        const p = document.createElement("p");
        p.append(error);
        document.getElementById("errors").append(p);
    });
}

document.forms["registrationForm"].addEventListener("submit", e => {
    e.preventDefault();
    const form = document.forms["registrationForm"]
    const name = form.elements["name"].value
    const email = form.elements["email"].value
    const age = parseInt(form.elements["age"].value)
    const password = form.elements["password"].value
    const passwordConfirm = form.elements["passwordConfirm"].value

    let user = {
        'nickName': name,
        'email': email,
        'age': age,
        'password': password,
        'passwordConfirm': passwordConfirm
    }

    Registration(user)
})
