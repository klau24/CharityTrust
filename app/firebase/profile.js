import { domainToUnicode } from "url";

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
// var companyName = getParameterByName('name');

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

function loadBio(bio) {
    var div = document.getElementById('company_bio');

    // replace text in HTML string:
    div.innerHTML = div.innerHTML.replace('', bio);
}

function loadGoals(goals) {
    var div = document.getElementById('company_goals');
    var msg = "";
    // FOR LOOP
    for (i=0;i<3;i++) {
        var goal = goals[i];
        msg = msg + `<li> Goal ${i+1}: ${goal}</li></br>`;
    }

    // replace text in HTML string:
    div.innerHTML = div.innerHTML.replace('', msg);

    // manipulating text node:
    for(var node of div.childNodes){
        if(node.nodeType == 3 && node.textContent == '')
            node.textContent = msg;
    }
}



var db = firebase.firestore();

firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        var companyName = firebase.auth().currentUser.email;
        // User is signed in.
        getName(companyName);
        getBio(companyName);
        getGoals(companyName);
    }
    else {
        // User is signed out.
        window.location.replace("404.html");
        getName(companyName);
        getBio(companyName);
        getGoals(companyName);
    }
});

function getListOfCompanies() {
    var companies = [];
    db.collection("companies").get()
    .then(function(querySnapshot) {
        querySnapshot.forEach(doc => {
            companies.push(doc.id);
        });
    });
    return companies;
}

function getBio(companyName) {
    db.collection("users").doc(companyName).get()
    .then(function(doc) {
        if (doc.exists) {
            let data = doc.data();
            console.log(data["bio"]);
            bio = data["bio"];
            loadBio(bio);
        }
        else {
            db.collection("companies").doc(companyName).get()
            .then(function(doc) {
                if (doc.exists) {
                    let data = doc.data();
                    console.log(data["bio"]);
                    bio = data["bio"];
                    loadBio(bio);
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

function getGoals(companyName) {
    db.collection("users").doc(companyName).get()
    .then(function(doc) {
        if (doc.exists) {
            let data = doc.data();
            console.log(data["goals"]);
            goals = data["goals"];
            loadGoals(goals);
        }
        else {
            db.collection("companies").doc(companyName).get()
            .then(function(doc) {
                if (doc.exists) {
                    let data = doc.data();
                    console.log(data["goals"]);
                    goals = data["goals"];
                    loadGoals(goals);
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

function getName(companyName) {
    db.collection("users").doc(companyName).get()
    .then(function(doc) {
        if (doc.exists) {
            let data = doc.data();
            console.log(data["name"]);
            name = data["name"];
            loadName(name);
        }
        else {
            db.collection("companies").doc(companyName).get()
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

function getNumReviews(companyName) {
    var user = firebase.auth().currentUser;

    db.collection("users").doc(user.email).get()
    .then(function(doc) {
        if (doc.exists) {
            let data = doc.data();
            console.log(data["moneyRaised"]);
            moneyRaised = data["moneyRaised"];
            loadName(moneyRaised);
        }
        else {
            db.collection("companies").doc(user.email).get()
            .then(function(doc) {
                if (doc.exists) {
                    let data = doc.data();
                    console.log(data["moneyRaised"]);
                    moneyRaised = data["moneyRaised"];
                    loadName(moneyRaised);
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

function editBio(companyName) {
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

function donate() {
    http.post("https://localhost:8010/donate?from=0x790e07973299dC6154A0b693756CC37A4F2fc409&to=0xc04C4e06cb44FbD63ce74D29ffC72bce03410B0a&amount=20000000000000000000");
}