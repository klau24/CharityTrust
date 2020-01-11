var db = firebase.firestore();

firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        // User is signed in.
        getName()
    }
    else {
        // User is signed out.
    }
});

function loadName(name) {
    var div = document.getElementById('your_name');
    console.log(`name is ${name}`);

    // replace text in HTML string:
    div.innerHTML = div.innerHTML.replace('', name);

    // manipulating text node:
    for(var node of div.childNodes){
        if(node.nodeType == 3 && node.textContent == '')
            node.textContent = name;
    }
}

function getName() {
    var user = firebase.auth().currentUser;

    db.collection("users").doc(user.email).get()
    .then(function(doc) {
        if (doc.exists) {
            let data = doc.data();
            console.log(data["name"]);
            name = data["name"];
            loadName(name);
        }
        else {
            db.collection("companies").doc(user.email).get()
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
    })
    .catch(function(error) {
        console.log("Error getting document:", error);
    });
}

function getEmail() {
    var user = firebase.auth().currentUser;
    db.collection("users").doc(user.email).get()
    .then(function(doc) {
        if (doc.exists) {
            let data = doc.data();
            return data["email"];
        }
        else {
            db.collection("companies").doc(user.email).get()
            .then(function(doc) {
                if (doc.exists) {
                    let data = doc.data();
                    return data["email"];
                }
                else {
                    console.log("No such document!");
                }
            })
        }
    })
    .catch(function(error) {
        console.log("Error getting document:", error);
    });
}

function getNumReviews() {
    var user = firebase.auth().currentUser;
    db.collection("users").doc(user.email).get()
    .then(function(doc) {
        if (doc.exists) {
            let data = doc.data();
            return data["numReviews"];
        }
        else {
            db.collection("companies").doc(user.email).get()
            .then(function(doc) {
                if (doc.exists) {
                    let data = doc.data();
                    return data["numReviews"];
                }
                else {
                    console.log("No such document!");
                }
            })
        }
    })
    .catch(function(error) {
        console.log("Error getting document:", error);
    });
}

function editName() {
    var name = $('#name_input').val();

    if ( name.length > 0 ) {
        db.collection("users").doc(companyName).get(user.email)
        .then((docSnapshot) => {
            db.collection("users").doc(companyName).set({
                name: name
            })
            .then(function() {
                console.log("Document successfully written!");
            })
            .catch(function(error) {
                console.error("Error writing document: ", error);
            });
            console.log("Updated User Name.");
        });
    }
    else {
        windows.alert("Error: Invalid input for Name.");
    }
}