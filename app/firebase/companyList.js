var db = firebase.firestore();

function getListOfCompanies() {
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
                    loadName(name);
                }
                else {
                    console.log("No such document!");
                }
            })
        });
    });
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

getListOfCompanies();