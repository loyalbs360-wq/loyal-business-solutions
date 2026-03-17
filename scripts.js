document.addEventListener('DOMContentLoaded', () => {
    // 1. Chart.js - Simulación de Dashboard Financiero
    const ctx = document.getElementById('mockChart');
    if (ctx) {
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'],
                datasets: [{
                    label: 'Crecimiento de Activos',
                    data: [12000, 19000, 15000, 25000, 22000, 30000],
                    borderColor: '#3b82f6',
                    backgroundColor: 'rgba(59, 130, 246, 0.1)',
                    borderWidth: 3,
                    tension: 0.4,
                    fill: true,
                    pointRadius: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true, // Asegura que se respete el contenedor
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

    // 2. Animaciones de revelado al hacer scroll
    const observerOptions = {
        threshold: 0.1
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                revealObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const revealElements = document.querySelectorAll('.card, .hero-content, #nosotros .contact-container > div, .portal-preview, .portal-section > div:last-child');
    
    revealElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
        revealObserver.observe(el);
    });

    // 3. Simulación de Login en el Portal
    const loginBtn = document.querySelector('#portal .btn-primary');
    if (loginBtn) {
        loginBtn.addEventListener('click', (e) => {
            e.preventDefault();
            loginBtn.innerHTML = '<span class="loading-spinner"></span> Accediendo...';
            loginBtn.style.opacity = '0.7';
            
            setTimeout(() => {
                alert('¡Portal disponible próximamente! Estamos integrando tu información en tiempo real.');
                loginBtn.innerHTML = 'Acceder al Portal';
                loginBtn.style.opacity = '1';
            }, 1500);
        });
    }

    // 4. Navegación pegajosa (cambio de fondo al scroll)
    const nav = document.querySelector('nav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.style.padding = '0.8rem 0';
            nav.style.background = 'rgba(2, 6, 23, 0.95)';
        } else {
            nav.style.padding = '1.2rem 0';
            nav.style.background = 'rgba(2, 6, 23, 0.8)';
        }
    });

    // 5. Envío de Formulario (Simulación)
    const contactForm = document.querySelector('form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const submitBtn = contactForm.querySelector('button');
            submitBtn.innerText = 'Enviando...';
            
            setTimeout(() => {
                alert('Gracias por tu mensaje. Un asesor financiero se pondrá en contacto contigo pronto.');
                contactForm.reset();
                submitBtn.innerText = 'Enviar Mensaje';
            }, 1500);
        });
    }
});

// Estilos extra para el spinner
const style = document.createElement('style');
style.innerHTML = `
    .loading-spinner {
        display: inline-block;
        width: 14px;
        height: 14px;
        border: 2px solid rgba(255,255,255,0.3);
        border-radius: 50%;
        border-top-color: #fff;
        animation: spin 1s ease-in-out infinite;
        vertical-align: middle;
        margin-right: 8px;
    }
    @keyframes spin {
        to { transform: rotate(360deg); }
    }
`;
document.head.appendChild(style);
