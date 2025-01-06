// Smooth scrolling for navigation links
document.querySelectorAll('nav ul li a').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth',
    });
  });
});

// Import the Firebase app and Firestore libraries
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";

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
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function loadBlogPosts() {
  const blogContainer = document.getElementById('blogPosts');
  blogContainer.innerHTML = "<p>Cargando artículos...</p>";
  try {
    console.log("Connecting to Firestore...");
    const querySnapshot = await getDocs(collection(db, "blog"));
    console.log("Documents fetched:", querySnapshot.size);

    blogContainer.innerHTML = ""; // Clear loading message
    querySnapshot.forEach(doc => {
      const post = doc.data();
      console.log("Post data:", post);

      const postElement = document.createElement('div');
      postElement.className = 'blog-post';

      let videoHtml = post.videoId
        ? `<div class="video-container"><iframe src="https://www.youtube.com/embed/${post.videoId}" frameborder="0" allowfullscreen></iframe></div>`
        : "";

      postElement.innerHTML = `
        <h3>${post.title}</h3>
        <p>${post.content}</p>
        <p><strong>Autor:</strong> ${post.author}</p>
        <p><strong>Fecha:</strong> ${post.date}</p>
        ${videoHtml}
        <hr>
      `;
      blogContainer.appendChild(postElement);
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
