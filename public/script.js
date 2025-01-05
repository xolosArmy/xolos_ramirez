// Navegación suave
document.querySelectorAll('nav ul li a').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});

// Importar Firebase y Firestore
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";

// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyADkVJLuV-sBOrMh4WWg2Gn2bG0dPWYZ_I",
  authDomain: "xolos-ramirez.firebaseapp.com",
  projectId: "xolos-ramirez",
  storageBucket: "xolos-ramirez.firebasestorage.app",
  messagingSenderId: "714862756395",
  appId: "1:714862756395:web:7192e3a97e94b2c84da06e"
};

// Inicializar Firebase y Firestore
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Función para cargar los artículos del blog desde Firestore
async function loadBlogPosts() {
  const blogContainer = document.getElementById('blogPosts'); // Asegúrate de que exista este contenedor en tu HTML
  blogContainer.innerHTML = "<p>Cargando artículos...</p>"; // Mensaje de carga

  try {
    // Obtener los documentos de la colección "blog"
    const querySnapshot = await getDocs(collection(db, "blog"));
    blogContainer.innerHTML = ""; // Limpia el mensaje de carga

    // Iterar sobre cada documento de la colección
    querySnapshot.forEach(doc => {
      const post = doc.data(); // Obtener los datos del artículo
      const postElement = document.createElement('div');
      postElement.className = 'blog-post';

      // Crear el contenido del artículo con soporte para video (si existe)
      let videoHtml = "";
      if (post.videoId) {
        videoHtml = `
          <div class="video-container">
            <iframe src="https://www.youtube.com/embed/${post.videoId}" frameborder="0" allowfullscreen></iframe>
          </div>
        `;
      }

      // Estructura HTML del artículo
      postElement.innerHTML = `
        <h3>${post.title}</h3>
        <p>${post.content}</p>
        <p><strong>Autor:</strong> ${post.author}</p>
        <p><strong>Fecha:</strong> ${post.date}</p>
        ${videoHtml} <!-- Agrega el video si está presente -->
        <hr>
      `;
      blogContainer.appendChild(postElement); // Añadir el artículo al contenedor
    });

    // Si no hay artículos, mostrar un mensaje
    if (querySnapshot.empty) {
      blogContainer.innerHTML = "<p>No hay artículos disponibles.</p>";
    }
  } catch (error) {
    console.error("Error al cargar los artículos del blog:", error);
    blogContainer.innerHTML = "<p>Error al cargar los artículos. Intenta nuevamente más tarde.</p>";
  }
}

// Llamar a la función cuando la página cargue
document.addEventListener('DOMContentLoaded', loadBlogPosts);
