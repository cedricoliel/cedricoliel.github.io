// Soumission du formulaire
document.getElementById('musicSuggestForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Empêcher le formulaire de se soumettre normalement

    // Récupération des valeurs du formulaire
    const titre = document.getElementById('titleMusic').value;
    const artistes = document.getElementById('artistesMusic').value;
    const remarque = document.getElementById('remarqueMusic').value;
    const fromMusic = document.getElementById('fromMusic').value;
    const forMusic = document.getElementById('forMusic').value;

    // Effacer les messages précédents
    const statusSuggestMusiques = document.getElementById('statusSuggestMusiques');
    statusSuggestMusiques.innerHTML = '';

    if (titre.length > 0 && artistes.length > 0) {
        // Envoi des données à Firebase
        db.collection('Musiques').add({
            Titre: titre,
            Artistes: artistes,
            Remarque: remarque,
            From: fromMusic,
            For: forMusic
        }).then(function() {
            console.log("Données envoyées avec succès !");
            const successMessage = document.createElement('p');
            successMessage.style.color = 'green';
            successMessage.innerText = `Suggestion de musique envoyée avec succès.`;
            statusSuggestMusiques.appendChild(successMessage);
            // Effacer le formulaire après l'envoi
            document.getElementById('musicSuggestForm').reset();
        }).catch(function(error) {
            console.error("Erreur d'envoi des données:", error);
            const errorMessage = document.createElement('p');
            errorMessage.style.color = 'red';
            errorMessage.innerText = `Erreur de l'envoi de la musique: ${error.message}`;
            statusSuggestMusiques.appendChild(errorMessage);
        });
    } else {
        const errorMessage = document.createElement('p');
        errorMessage.style.color = 'red';
        errorMessage.innerText = `Veuillez saisir tous les champs`;
        statusSuggestMusiques.appendChild(errorMessage);
    }    
});
