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
    
        uploadTask.on('state_changed', 
            (snapshot) => {
                // Progress tracking
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
            },
            (error) => {
                // Handle unsuccessful uploads
                console.error('Error uploading file:', error);
                statusUpload.innerHTML = ''; // Clear any previous messages
                const errorMessage = document.createElement('p');
                errorMessage.style.color = 'red';
                errorMessage.innerText = `Erreur de téléchargement pour le fichier ${file.name}: ${error.message}`;
                statusUpload.appendChild(errorMessage);
            },
            () => {
                // Handle successful uploads on complete
                console.log('File uploaded successfully');
                statusUpload.innerHTML = ''; // Clear any previous messages
                const successMessage = document.createElement('p');
                successMessage.style.color = 'green';
                successMessage.innerText = `Fichier ${file.name} téléchargé avec succès.`;
                statusUpload.appendChild(successMessage);
            }
        );
    }
}
