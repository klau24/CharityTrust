var db = firebase.firestore();

function getListOfCompanies() {
    var companies = [];
    db.collection("companies").get()
    .then(function(querySnapshot) {
        querySnapshot.forEach(doc => {
            companies.push(doc.id.toString());
        });
    });
    return companies;
}

function getEachCompanyInfo() {
    var companies = [];
    companies = getListOfCompanies();
    console.log(companies);
    console.log(getListOfCompanies().length);
    console.log(companies);
    console.log(companies[0]);
    for (i=0;i<companies.length;i++) {
        console.log(companies[i]);
        db.collection("companies").doc(companies[i]).get()
        .then(function(doc) {
            if (doc.exists) {
                let data = doc.data();
                console.log(data["name"]);
                name = data["name"];
                loadName(name);
            }
            else {
                console.log("No such document!");
            }
        })
    }
}

function loadName(name) {
    var div = document.getElementById('company_name');
    console.log(`name is ${name}`);

    // replace text in HTML string:
    div.innerHTML = div.innerHTML.replace('', name);

    // manipulating text node:
    for(var node of div.childNodes){
        if(node.nodeType == 3 && node.textContent == '')
            node.textContent = name;
    }
}

getEachCompanyInfo();