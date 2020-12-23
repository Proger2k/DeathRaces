var paramValue = ""
function OnLoad() {
    paramValue = window.location.href.split("?")[1].split("=")[1];
}

OnLoad()