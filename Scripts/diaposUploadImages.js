// Function to upload images to Firebase Storage
function uploadImages() {
    const fileInput = document.getElementById('fileInput');
    const files = fileInput.files;
    const statusUpload = document.getElementById('statusUpload');

    statusUpload.innerHTML = ''; // Clear any previous messages

    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const storageRef = firebase.storage().ref();
        const uploadTask = storageRef.child('Ced/Diapos/' + file.name).put(file);

        // Create a container for the progress bar and status message
        const fileStatusContainer = document.createElement('div');
        fileStatusContainer.className = 'file-status-container';

        // Create a progress bar element
        const progressBar = document.createElement('progress');
        progressBar.value = 0;
        progressBar.max = 100;

        // Create a status message element
        const statusMessage = document.createElement('p');
        statusMessage.innerText = `Téléchargement de ${file.name} : 0%`;

        // Append progress bar and status message to the container
        fileStatusContainer.appendChild(progressBar);
        fileStatusContainer.appendChild(statusMessage);
        statusUpload.appendChild(fileStatusContainer);

        uploadTask.on('state_changed',
            (snapshot) => {
                // Progress tracking
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
                progressBar.value = progress;
                statusMessage.innerText = `Téléchargement de ${file.name} : ${progress.toFixed(2)}%`;
            },
            (error) => {
                // Handle unsuccessful uploads
                console.error('Error uploading file:', error);
                statusMessage.style.color = 'red';
                statusMessage.innerText = `Erreur de téléchargement pour le fichier ${file.name}: ${error.message}`;
            },
            () => {
                // Handle successful uploads on complete
                console.log('File uploaded successfully');
                statusMessage.style.color = 'green';
                statusMessage.innerText = `Fichier ${file.name} téléchargé avec succès.`;
            }
        );
    }
}