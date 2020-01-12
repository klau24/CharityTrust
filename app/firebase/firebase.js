var user = firebase.auth().currentUser;
var db = firebase.firestore();

web3 = new Web3(window.ethereum);
console.log(web3.eth.accounts[0]);

var keys = ["0xc04C4e06cb44FbD63ce74D29ffC72bce03410B0a", 
"0x790e07973299dC6154A0b693756CC37A4F2fc409",
"0x0834BBE0c0b492e6A6b285b58E9EB0CBfACB5aAC",
"0x1dc632f6Bb919ffFe3D448eFebCFF0BAbf26FC6d",
"0xEEF25C230527affC44Cdd8bCbFbd2659AB9d0C2b",
"0xa9ab01965673D6b256bD006c351b97E6D16D6e8f",
"0xF21d2B816C87e13BDB4C075F92956d7046F0807C",
"0x276E512760854E481C3afc5F2ddcdaC2463B2C12",
"0x7E1E33eEBFb9683ca5afb71b972351806AbB521d",
"0x457044d0EEa68850d2FFa25fE9Fa676C5311C6F8"]

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
    console.log("Attempting to sign in...");
    var email = $("#login_email").val();
    var password = $("#login_password").val();
    firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.error(errorMessage);
        // ...
    });
}

function signUpUser() {
    var firstName = $('#first_name').val();
    var lastName = $('#last_name').val();
    var fullName = firstName + " " + lastName;
    var userEmail = $('#email_field').val().toLowerCase();
    var userPass = $('#password_field').val();
    var userPassConf = $('#password_conf_field').val();
    var userSSN = $('#user_ssn').val();

    if (userPassConf == userPass) {
        firebase.auth().createUserWithEmailAndPassword(userEmail, userPass).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;

        db.collection("users").doc(userEmail).get().then((docSnapshot) => {
            if (docSnapshot.exists) {
                window.alert("Error : " + errorMessage + `. This person is of type User.`);
            }
            else {
                window.alert("Error : " + errorMessage + `. This person is of type Company.`);
            }
        })

        // Do other stuff??
        });
        
        db.collection("users").doc(userEmail).get()
        .then((docSnapshot) => {
            if (docSnapshot.exists) {
                console.log("User exists already.");
            }
            else {
                db.collection("companies").doc(userEmail).get()
                .then((docSnapshot) => {
                    if (docSnapshot.exists) {
                        console.log("Company exists already.")
                    }
                    else {
                        db.collection("users").doc(userEmail).set({
                            name: fullName,
                            type: "user",
                            email: userEmail,
                            ssn: userSSN,
                            balance: "$0.00",
                            numReviews: 0,
                            key: keys[keynum],
                            dateCreated: firebase.firestore.FieldValue.serverTimestamp()
                        })
                        .then(function() {
                            console.log("Document successfully written!");
                        })
                        .catch(function(error) {
                            console.error("Error writing document: ", error);
                        });
                    }
                })
            }
        });   
    }
    else {
        window.alert("Error : Passwords do not match");
    }
}

function signUpCompany() {
    var companyName = $('#company_name').val();
    var companyEmail = $('#email_field').val().toLowerCase();
    var companyPass = $('#password_field').val();
    var companyPassConf = $('#password_conf_field').val();
    var companyBio = $('#company_bio').val();
    var companyGoal1 = $('#company_goal1').val();
    var companyGoal2 = $('#company_goal2').val();
    var companyGoal3 = $('#company_goal3').val();


    if (companyPassConf == companyPass) {
        firebase.auth().createUserWithEmailAndPassword(companyEmail, companyPass).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        
        db.collection("company").doc(companyEmail).get().then((docSnapshot) => {
            if (docSnapshot.exists) {
                window.alert("Error : " + errorMessage + `. This person is of type Company.`);
            }
            else {
                window.alert("Error : " + errorMessage + `. This person is of type User.`);
            }
        })

        // Do other stuff??
        });

        db.collection("companies").doc(companyEmail).get()
        .then((docSnapshot) => {
            if (docSnapshot.exists) {
                console.log("company exists already.");
            }
            else {
                db.collection("users").doc(companyEmail).get()
                .then((docSnapshot) => {
                    if (docSnapshot.exists) {
                        console.log("User exists already.")
                    }
                    else {
                        db.collection("companies").doc(companyEmail).set({
                            name: companyName,
                            type: "company",
                            email: companyEmail,
                            bio: companyBio,
                            moneyRaised: "$0.00",
                            numReviews: 0,
                            goals: [companyGoal1, companyGoal2, companyGoal3],
                            photos: [],
                            key: keys[keynum],
                            dateCreated: firebase.firestore.FieldValue.serverTimestamp()
                        })
                        .then(function() {
                            console.log("Document successfully written!");
                        })
                        .catch(function(error) {
                            console.error("Error writing document: ", error);
                        });
                    }
                })
            }
        });
    }
    else {
        window.alert("Error : Passwords do not match");
    }
}

function signOut() {
    firebase.auth().signOut();
}

function removeSignIn() {
    $("#loginDropdown").addClass("remove");
}

function showSignIn() {
    $("#loginDropdown").removeClass("remove");
}

function showProfile() {
    $("#profileDropdown").removeClass("remove");
}

function removeProfile() {
    $("#profileDropdown").addClass("remove");
}

firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        // User is signed in.
        var div = document.getElementById('profile-name');
        removeSignIn();
        showProfile();
        var name = getNavName()
        div.innerHTML = div.innerHTML.replace('', name);
        
    }
    else {
        // User is signed out.
        showSignIn();
        removeProfile();
    }
});

function getNavName() {
    var user = firebase.auth().currentUser;

    db.collection("users").doc(user.email).get()
    .then(function(doc) {
        if (doc.exists) {
            let data = doc.data();
            console.log(data["name"]);
            name = data["name"];
            loadNavName(name);
        }
        else {
            db.collection("companies").doc(user.email).get()
            .then(function(doc) {
                if (doc.exists) {
                    let data = doc.data();
                    console.log(data["name"]);
                    name = data["name"];
                    loadNavName(name);
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

function loadNavName(name) {
    var div = document.getElementById('profile-name');
    console.log(`name is ${name}`);

    // replace text in HTML string:
    div.innerHTML = name;
}
