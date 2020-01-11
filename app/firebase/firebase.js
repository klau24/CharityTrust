var user = firebase.auth().currentUser;
var db = firebase.firestore();

firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        // User is signed in.
        var displayName = user.displayName;
        var email = user.email;
        var emailVerified = user.emailVerified;
        var photoURL = user.photoURL;
        var isAnonymous = user.isAnonymous;
        var uid = user.uid;
        var providerData = user.providerData;
        // ...
    }
    else {
        // User is signed out.
        // ...
    }
});

function signIn() {
    firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
    });
}

function signUpUser() {
    var firstName = $('#first_name').val();
    var lastName = $('#last_name').val();
    var fullName = firstName + " " + lastName;
    var userEmail = $('#email_field').val();
    var userPass = $('#password_field').val();
    var userPassConf = $('#password_conf_field').val();
    var userSSN = $('#user_ssn').val();

    if (userPassConf == userPass) {
        firebase.auth().createUserWithEmailAndPassword(userEmail, userPass).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        window.alert("Error : " + errorMessage);
        // Do other stuff??
        });

        db.collection("users").doc(fullName).set({
            name: fullName,
            email: userEmail,
            ssn: userSSN,
            balance: "$0.00",
            numReviews: 0,
            dateCreated: firebase.firestore.FieldValue.serverTimestamp()
        })
        .then(function() {
            console.log("Document successfully written!");
        })
        .catch(function(error) {
            console.error("Error writing document: ", error);
        });
    }
    else {
        window.alert("Error : Passwords do not match");
    }
}

function signUpCompany() {
    var companyName = $('#company_name').val();
    var companyEmail = $('#email_field').val();
    var companyPass = $('#password_field').val();
    var companyPassConf = $('#password_conf_field').val();

    if (companyPassConf == companyPass) {
        firebase.auth().createUserWithEmailAndPassword(companyEmail, companyPass).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        window.alert("Error : " + errorMessage);
        // Do other stuff??
        });

        db.collection("companies").doc(companyName).set({
            name: companyName,
            email: companyEmail,
            balance: "$0.00",
            numReviews: 0,
            dateCreated: firebase.firestore.FieldValue.serverTimestamp()
        })
        .then(function() {
            console.log("Document successfully written!");
        })
        .catch(function(error) {
            console.error("Error writing document: ", error);
        });
    }
    else {
        window.alert("Error : Passwords do not match");
    }
}

function signOut() {
    firebase.auth().signOut();
}

