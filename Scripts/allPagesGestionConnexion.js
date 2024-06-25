function checkLocalCode() {
    const storedCode = localStorage.getItem('Code');
    if (storedCode) {
        var codeBis = db.collection('SU');
        codeBis.where('Valeur', '==', storedCode).get()
            .then((querySnapshot) => {
                if (querySnapshot.empty) {
                    window.location.href = '../';
                }
            })
            .catch((error) => {
                console.error('Erreur lors de la vérification du code:', error);
                window.location.href = '../';
            });
    } else {
        window.location.href = '../';
    }
}

// Run the check on page load
window.onload = function() {
    checkLocalCode();
};