function encryptPassword(password) {
    return CryptoJS.SHA256(password).toString();
}

// Check if the user has a valid code in local storage
function checkLocalCode() {
    const storedCode = localStorage.getItem('Code');
    var validInput = true;
    if (storedCode) {
        var codeBis = db.collection('SU');
        codeBis.where('Valeur', '==', storedCode).get()
            .then((querySnapshot) => {
                if (querySnapshot.empty) {
                    validInput = false;
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