// Importar funciones de auth
import { handleLogin, handleRegister, handleLogout, onUserStatusChange } from './auth.js';

document.addEventListener('DOMContentLoaded', () => {
    // --- Referencias UI ---
    const authContent = document.getElementById('authContent');
    const privateContent = document.getElementById('privateContent');
    const navLogoutBtn = document.getElementById('navLogoutBtn');
    
    const loginForm = document.getElementById('loginForm');
    const loginEmail = document.getElementById('loginEmail');
    const loginPass = document.getElementById('loginPass');
    const loginError = document.getElementById('loginError');

    const registerModal = document.getElementById('registerModal');
    const showRegister = document.getElementById('showRegister');
    const closeModal = document.querySelector('.close-modal');
    const registerForm = document.getElementById('registerForm');
    const registerEmail = document.getElementById('registerEmail');
    const registerPass = document.getElementById('registerPass');
    const registerError = document.getElementById('registerError');

    const btnCDMX = document.getElementById('btnCDMX');
    const btnGDLJ = document.getElementById('btnGDLJ');
    const btnMTY = document.getElementById('btnMTY');

    // --- Monitoreo de Usuario ---
    onUserStatusChange((user) => {
        if (user) {
            // Usuario logueado
            authContent.style.display = 'none';
            privateContent.style.display = 'block';
            navLogoutBtn.style.display = 'flex';
            
            // Simulación de Niveles de Acceso (Aquí irá la lógica real de Firestore pronto)
            // Por ahora mostramos los 3, pero listos para filtrar
            checkRegionalAccess(user);
            
            initDashboard(); // Inicializar gráfica solo si hay usuario
        } else {
            // Usuario no logueado
            authContent.style.display = 'block';
            privateContent.style.display = 'none';
            navLogoutBtn.style.display = 'none';
        }
    });

    // --- Login ---
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        loginError.style.display = 'none';
        
        const res = await handleLogin(loginEmail.value, loginPass.value);
        if (!res.success) {
            loginError.innerText = "Error: Credenciales inválidas.";
            loginError.style.display = 'block';
        }
    });

    // --- Registro (Modal) ---
    showRegister.addEventListener('click', (e) => {
        e.preventDefault();
        registerModal.classList.add('active');
    });

    closeModal.addEventListener('click', () => {
        registerModal.classList.remove('active');
    });

    window.addEventListener('click', (e) => {
        if (e.target === registerModal) registerModal.classList.remove('active');
    });

    registerForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        registerError.style.display = 'none';

        const res = await handleRegister(registerEmail.value, registerPass.value);
        if (res.success) {
            registerModal.classList.remove('active');
            alert("¡Registro exitoso! Ahora puedes acceder.");
        } else {
            registerError.innerText = "Error: " + res.error;
            registerError.style.display = 'block';
        }
    });

    // --- Lógica de Acceso Regional ---
    async function checkRegionalAccess(user) {
        // En el futuro, leeremos un campo 'region' de Firestore
        // Ejemplo: const userDoc = await getDoc(...);
        // Por ahora, habilitamos todos para que el usuario pueda verlos
        btnCDMX.style.display = 'flex';
        btnGDLJ.style.display = 'flex';
        btnMTY.style.display = 'flex';

        // Listeners para clics regionales
        btnCDMX.onclick = () => window.location.href = "https://script.google.com/macros/s/AKfycbwU8VRaxGQFhLPTm3MYZfQdqmVWPtetT3Kgrty34hsyqPgT3jfkCJfbZyK9Vbp8p2u6RQ/exec";
        btnGDLJ.onclick = () => window.location.href = "https://script.google.com/macros/s/AKfycbxxnWEE-Fsf4I3qQC9uA338FUJNvijBMFOPj4RcI2-KKo4nTHQzPqyOXQc_1aO9Jx4O6g/exec";
        btnMTY.onclick = () => window.location.href = "https://script.google.com/macros/s/AKfycbxmVBHV9-BP0ENlOn33709X4svvUzfwWpb59RSj6SLw85OGccqOneOA3TgZelduqYJOOw/exec";
    }

    // --- Logout ---
    navLogoutBtn.addEventListener('click', async () => {
        await handleLogout();
    });

    // --- Dashboard logic (Chart.js) ---
    function initDashboard() {
        const ctx = document.getElementById('mockChart').getContext('2d');
        if (window.myChart) window.myChart.destroy(); // Limpiar previo

        window.myChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'],
                datasets: [{
                    label: 'Crecimiento de Activos',
                    data: [12000, 19000, 15000, 25000, 22000, 30000],
                    borderColor: '#3b82f6',
                    backgroundColor: 'rgba(59, 130, 246, 0.1)',
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4,
                    pointBackgroundColor: '#fff',
                    pointBorderColor: '#3b82f6',
                    pointHoverRadius: 6
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                aspectRatio: 16 / 9,
                plugins: {
                    legend: { display: false },
                    tooltip: {
                        mode: 'index',
                        intersect: false,
                        backgroundColor: '#1e293b',
                        titleColor: '#94a3b8',
                        bodyColor: '#fff',
                        borderColor: '#3b82f6',
                        borderWidth: 1,
                        padding: 10,
                        displayColors: false
                    }
                },
                scales: {
                    x: {
                        grid: { display: false },
                        ticks: { color: '#94a3b8', font: { family: 'Outfit', size: 10 } }
                    },
                    y: {
                        beginAtZero: true,
                        grid: { color: 'rgba(255, 255, 255, 0.05)' },
                        ticks: { 
                            color: '#94a3b8', 
                            font: { family: 'Outfit', size: 10 },
                            callback: function(value) { return '$' + value.toLocaleString(); }
                        }
                    }
                }
            }
        });
    }

    // --- Otras interacciones (Scroll, etc) ---
    // Smooth scroll for nav links
    document.querySelectorAll('.nav-link, .btn').forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    window.scrollTo({
                        top: target.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Reveal animations on scroll
    const revealElements = document.querySelectorAll('.service-card, .about-content, .portal-preview');
    const revealOnScroll = () => {
        revealElements.forEach(el => {
            const elementTop = el.getBoundingClientRect().top;
            if (elementTop < window.innerHeight - 100) {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }
        });
    };

    revealElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.8s ease-out';
    });

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Lanza una vez al cargar
    
    lucide.createIcons();
});
