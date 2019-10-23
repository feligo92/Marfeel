function httpGet(theUrl, callback) {

    let xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
            console.log("CALLBACK")
            callback(JSON.parse(xmlHttp.responseText));
        }
        else if (xmlHttp.readyState == 4) {
            error(xmlHttp.status);
        }
    }

    xmlHttp.open("GET", theUrl);

    xmlHttp.setRequestHeader("X-Requested-With", "XMLHttpRequest");

    xmlHttp.send();
}


function error(status) {
    let Banner1 = document.querySelectorAll(".Banner__input")[0];
    let Banner2 = document.querySelectorAll(".Banner__input1")[0];
    let Banner3 = document.querySelectorAll(".Banner__input2")[0];
    Banner1.className = "Banner Banner__input d-none";
    Banner2.className = "Banner Banner__input1 d-none";
    Banner3.className = "Banner Banner__input2"
}


function getUser(objUser) {
    let userName = document.querySelector("#inputUserName").value;


    let Banner1 = document.querySelectorAll(".Banner__input")[0];
    let Banner2 = document.querySelectorAll(".Banner__input1")[0];
    let CardImg = document.querySelectorAll(".carta-img")[0];
    let user = document.querySelectorAll(".card-title")[0];
    let fullName = document.querySelectorAll(".card-text")[0];
    let bio = document.querySelectorAll(".bio")[0];







    fullName.innerHTML = objUser.name
    bio.innerHTML = objUser.bio
    user.innerHTML = `@${objUser.login}`
    CardImg.src = objUser.avatar_url
    Banner1.className = "Banner Banner__input d-none";
    Banner2.className = "Banner Banner__input1 ";




    let link = `https://api.github.com/users/${userName}/repos`
    httpGet(link, imprimir)

}



function getLink() {
    let userName = document.querySelector("#inputUserName").value;
    let link = `https://api.github.com/users/${userName}`;
    httpGet(link, getUser);
}

function imprimir(objRepo) {
    // let fav = document.querySelectorAll(".fav")[0];
    // let fork = document.querySelectorAll(".fork")[0];
    
    for (i = 0; i < objRepo.length; i++) {
        let sigleRepo = objRepo[i];
        let tr = `<th scope="row" class="numeroRepo text-left">${i+1}</th>
        <td><i class="fas fa-star"></i><span class="fav">${sigleRepo.watchers_count} </span><i class="fas fa-code-branch"></i><span class="fork"> ${sigleRepo.forks_count}</span></td>`

        document.querySelector("#tablaEspecial tbody").innerHTML += tr;

    }
    


    // fav.innerHTML = ` ${objRepo[0].watchers_count} `
    // fork.innerHTML = ` ${objRepo[0].forks_count}`
    console.log(objRepo)
}





let arrButton = document.querySelectorAll(".boton");
for (i = 0; i < arrButton.length; i++) {
    let button = arrButton[i];

    button.addEventListener(`click`, () => {
        getLink()


    })
} 
