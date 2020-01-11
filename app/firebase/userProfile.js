var db = firebase.firestore();
var user = firebase.auth().currentUser;

function getEmail() {
    return await db.collection("users").doc(user.email).get("email");
}

function getName() {
    return await db.collection("users").doc(user.email).get("name");

}

function getNumReviews() {
    return await db.collection("users").doc(user.email).get("numReviews");
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