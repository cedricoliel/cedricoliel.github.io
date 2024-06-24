// Check if the user has a valid code in local storage
function checkLocalCode() {
    console.log("debug");
    const storedCode = localStorage.getItem('Code');
    var validInput = true;
    if (storedCode) {
        var codeBis = db.collection('SU');
        codeBis.where('Valeur', '==', storedCode).get()
            .then((querySnapshot) => {
                if (querySnapshot.empty) {
                    validInput = false;
                    console.log("pas de correspondance");
                } else {
                    console.log("correspondance");
                }
            })
            .catch((error) => {
                console.error('Erreur lors de la vérification du code:', error);
                validInput = false;
            });
    }

    if (!validInput) {
        window.location.href = '../index.html';
    }
}

// Run the check on page load
window.onload = checkLocalCode;