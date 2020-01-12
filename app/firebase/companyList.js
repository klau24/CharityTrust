var db = firebase.firestore();

function getListOfCompanies() {
    var msg = "";
    db.collection("companies").get()
    .then(function(querySnapshot) {
        querySnapshot.docs.forEach(doc => {
            console.log(doc.id);
            db.collection("companies").doc(doc.id).get()
            .then(function(doc) {
                if (doc.exists) {
                    let data = doc.data();
                    console.log(data["name"]);
                    name = data["name"];
                    msg = `\
                <div class="card mb-3">\
                <div class="row no-gutters">\
                <div class="col-md-4">\
                <img src="..." class="card-img" alt="...">\
                </div>\
                <div class="col-md-8">\
                <div class="card-body">`;
                    msg = msg + loadName(name);
                    msg = msg + loadBio(data["bio"]);
                    msg = msg + `\
                    </div>\
                    </div>\
                    </div>\
                    </div>`;
                var list = document.getElementsByClassName("company-list");
                console.log(list);
                list[0].innerHTML = list[0].innerHTML.replace('', msg);
                console.log("sadfsa");
                console.log(list);
                }
                else {
                    console.log("No such document!");
                }
            })
        });
    });
}

function loadName(name) {
    return `<h5 class="card-title" id="company_name">${name}</h5>`;

    // replace text in HTML string:
    // manipulating text node:
    //for(var node of div.childNodes){
    //    if(node.nodeType == 3 && node.textContent == '')
    //        node.textContent = name;
    //}
}

function loadBio(bio) {
    return `<p class="card-text">${bio}</p>`;
}

getListOfCompanies();