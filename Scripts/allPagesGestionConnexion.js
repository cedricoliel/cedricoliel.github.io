function encryptPassword(password) {
    return CryptoJS.SHA256(password).toString();
}

// Check if the user has a valid code in local storage
function checkLocalCode() {
    const storedCode = localStorage.getItem('Code');
    if (storedCode) {
        var code = db.collection('Code');
        code.where('Valeur', '==', storedCode).get()
            .then((querySnapshot) => {
                if (querySnapshot.empty) {
                    // Invalid code, redirect to login
                    window.location.href = '../index.html';
                }
            })
            .catch((error) => {
                console.error('Erreur lors de la vérification du code:', error);
                window.location.href = '../index.html';
            });
    } else {
        // No code stored, redirect to login
        window.location.href = '../index.html';
    }
}

// Run the check on page load
window.onload = checkLocalCode;