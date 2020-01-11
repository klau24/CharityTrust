function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}
// var foo = getParameterByName('foo'); // "lorem"
var companyName = getParameterByName('name');


var db = firebase.firestore();

function getListOfCompanies() {
    return await db.collection(company).get();
}

function getBio() {
    return await db.collection(company).doc(companyName).get("bio");
}

function getPhotos() {
    return await db.collection(company).doc(companyName).get("photos");

}

function getGoals() {
    return await db.collection(company).doc(companyName).get("goals");

}

function getName() {
    return await db.collection(company).doc(companyName).get("name");

}

function getMoneyRaised() {
    return await db.collection(company).doc(companyName).get("moneyRaised");
    
}

function getNumReviews() {
    return await db.collection(company).doc(companyName).get("numReviews");
    
}

function editBio() {
    var bio = $('#bio_input').val();

    if ( bio.length > 0 ) {
        db.collection("companies").doc(companyName).get("bio")
        .then((docSnapshot) => {
            db.collection("companies").doc(companyName).set({
                bio: bio
            })
            .then(function() {
                console.log("Document successfully written!");
            })
            .catch(function(error) {
                console.error("Error writing document: ", error);
            });
            console.log("Updated Company Bio.");
        });
    }
    else {
        windows.alert("Error: Invalid input for bio.");
    }
}

function editPhotos() {
    var photos = $('#photos_input').val();

    db.collection("companies").doc(companyName).get("photos")
    .then((docSnapshot) => {
        db.collection("companies").doc(companyName).set({
            photos: photos
        })
        .then(function() {
            console.log("Document successfully written!");
        })
        .catch(function(error) {
            console.error("Error writing document: ", error);
        });
        console.log("Updated Company Photos.");
    });
}

function editGoals() {
    var goalsRaw = $('#goals_input').val();
    var goals = goalsRaw.split(';');

    db.collection("companies").doc(companyName).get("goals")
    .then((docSnapshot) => {
        db.collection("companies").doc(companyName).set({
            goals: goals
        })
        .then(function() {
            console.log("Document successfully written!");
        })
        .catch(function(error) {
            console.error("Error writing document: ", error);
        });
        console.log("Updated Company Goals.");
    });
}

function editName() {
    var name = $('#name_input').val();

    db.collection("companies").doc(companyName).get("name")
    .then((docSnapshot) => {
        db.collection("companies").doc(companyName).set({
            name: name
        })
        .then(function() {
            console.log("Document successfully written!");
        })
        .catch(function(error) {
            console.error("Error writing document: ", error);
        });
        console.log("Updated Company Name.");
    });
}