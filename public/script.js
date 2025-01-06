// Import Firebase and Firestore libraries
import firebase from 'firebase/app';
import 'firebase/firestore'; // Import Firestore
import 'firebase/dataConnect'; // Import Data Connect

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyADkVJLuV-sBOrMh4WWg2Gn2bG0dPWYZ_I",
  authDomain: "xolos-ramirez.firebaseapp.com",
  projectId: "xolos-ramirez",
  storageBucket: "xolos-ramirez.appspot.com",
  messagingSenderId: "714862756395",
  appId: "1:714862756395:web:7192e3a97e94b2c84da06e"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Function to load blog posts
async function loadBlogPosts() {
  const blogContainer = document.getElementById('blogPosts');
  blogContainer.innerHTML = "<p>Cargando artículos...</p>"; // Loading message

  try {
    console.log("Obteniendo artículos del blog...");

    // Replace 'your-data-source-id' with the actual Data Connect source ID
    const dataSourceId = 'your-data-source-id'; 
    const querySnapshot = await firebase.dataConnect.query(dataSourceId); 

    blogContainer.innerHTML = ""; // Clear the loading message

    querySnapshot.forEach((doc) => {
      const post = doc.data(); // Retrieve document data
      console.log("Datos del artículo:", post);

      const postElement = document.createElement('div');
      postElement.className = 'blog-post';

      // Add image if available
      let imageHtml = post.imageUrl
        ? `<img src="${post.imageUrl}" alt="${post.title}" style="width: 100%; border-radius: 8px; margin-bottom: 15px;">`
        : "";

      // Add video embed if available
      let videoHtml = post.videoId
        ? `<div class="video-container"><iframe src="https://www.youtube.com/embed/${post.videoId}" frameborder="0" allowfullscreen></iframe></div>`
        : "";

      // Create the HTML structure for the blog post
      postElement.innerHTML = `
        ${imageHtml}
        <h3>${post.title}</h3>
        <p>${post.content}</p>
        <p><strong>Autor:</strong> ${post.author}</p>
        <p><strong>Fecha:</strong> ${post.date}</p>
        ${videoHtml}
        <hr>
      `;

      blogContainer.appendChild(postElement); // Append post to the container
    });

    if (querySnapshot.empty) {
      blogContainer.innerHTML = "<p>No hay artículos disponibles.</p>";
    }
  } catch (error) {
    console.error("Error al cargar los artículos del blog:", error);
    blogContainer.innerHTML = "<p>Error al cargar los artículos. Intenta nuevamente más tarde.</p>";
  }
}

// Load blog posts on page load
document.addEventListener('DOMContentLoaded', loadBlogPosts);
