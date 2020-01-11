var db = firebase.firestore();
var user = firebase.auth().currentUser;

$("#your_name").text(getName());
$("#your_name").text(getName());
$("#your_name").text(getName());

function getName() {
    db.collection("users").doc(user.email).get()
    .then(function(doc) {
        if (doc.exists) {
            let data = doc.data();
            return data["name"];
        }
        else {
            db.collection("companies").doc(user.email).get()
            .then(function(doc) {
                if (doc.exists) {
                    let data = doc.data();
                    return data["name"];
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