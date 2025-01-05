document.querySelectorAll('nav ul li a').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});

// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";

// TODO: Importar otras librerías de Firebase si las necesitas, como Firestore o Authentication
// Ejemplo:
// import { getFirestore } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";

// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyADkVJLuV-sBOrMh4WWg2Gn2bG0dPWYZ_I",
  authDomain: "xolos-ramirez.firebaseapp.com",
  projectId: "xolos-ramirez",
  storageBucket: "xolos-ramirez.firebasestorage.app",
  messagingSenderId: "714862756395",
  appId: "1:714862756395:web:7192e3a97e94b2c84da06e"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Ejemplo: Configuración adicional (si usas Firestore o Storage, puedes inicializarlos aquí)
// const db = getFirestore(app);
// console.log("Firebase inicializado correctamente");


