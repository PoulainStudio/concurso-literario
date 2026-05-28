/**
 * CONCURSO LITERARIO - COLEGIO PARROQUIAL SAN JUSTO
 * Script principal con manejo de formularios, animaciones y EmailJS
 */

// ============================================
// CONFIGURACIÓN EMAILJS
// ============================================
// Descomenta y reemplaza con tus credenciales

const EMAILJS_CONFIG = {
    PUBLIC_KEY: 'YOUR_PUBLIC_KEY_HERE',        // Reemplaza con tu Public Key de EmailJS
    SERVICE_ID: 'YOUR_SERVICE_ID_HERE',        // Reemplaza con tu Service ID
    TEMPLATE_ID_INSCRIPTION: 'TEMPLATE_INSCRIPTION_ID',  // Reemplaza con Template ID para inscripciones
    TEMPLATE_ID_CONTACT: 'TEMPLATE_CONTACT_ID'  // Reemplaza con Template ID para contacto
};

// Inicializar EmailJS (descomenta cuando hayas configurado las credenciales)
// emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY);

// ============================================
// INICIALIZACIÓN
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    // Establecer año actual en footer
    const yearElement = document.getElementById('year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

    // Inicializar funcionalidades
    initNavigation();
    initScrollAnimations();
    initFormHandlers();
});

// ============================================
// NAVEGACIÓN
// ============================================

function initNavigation() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
            menuToggle.setAttribute('aria-expanded', navLinks.style.display === 'flex');
        });
    }

    // Cerrar menú al hacer clic en un enlace
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks) {
                navLinks.style.display = 'none';
            }
        });
    });

    // Smooth scroll para enlaces internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// ============================================
// ANIMACIONES AL SCROLL
// ============================================

function initScrollAnimations() {
    // Crear Intersection Observer para animaciones al scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observar todos los elementos con clase scroll-animate
    document.querySelectorAll('.scroll-animate').forEach(el => {
        observer.observe(el);
    });

    // Animar secciones al scroll
    document.querySelectorAll('.section').forEach((section, index) => {
        if (index > 0) { // Excluir la primera sección (hero)
            section.classList.add('scroll-animate');
        }
    });
}

// ============================================
// MANEJO DE FORMULARIOS
// ============================================

function initFormHandlers() {
    const registrationForm = document.getElementById('registrationForm');
    const contactForm = document.getElementById('contactForm');

    if (registrationForm) {
        registrationForm.addEventListener('submit', handleRegistrationSubmit);
    }

    if (contactForm) {
        contactForm.addEventListener('submit', handleContactSubmit);
    }
}

/**
 * Maneja el envío del formulario de inscripción
 */
async function handleRegistrationSubmit(e) {
    e.preventDefault();

    const form = e.target;
    const messageDiv = document.getElementById('formMessage');
    const submitButton = form.querySelector('button[type="submit"]');

    // Validaciones
    const validationError = validateInscriptionForm(form);
    if (validationError) {
        showMessage(messageDiv, validationError, 'error');
        return;
    }

    // Deshabilitar botón durante el envío
    submitButton.disabled = true;
    showMessage(messageDiv, '📤 Enviando inscripción...', 'info');

    try {
        // Preparar datos
        const formData = new FormData(form);
        const data = {
            fullName: formData.get('fullName'),
            age: formData.get('age'),
            grade: formData.get('grade'),
            division: formData.get('division'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            title: formData.get('title'),
            category: formData.get('category'),
            genre: formData.get('genre'),
            textContent: formData.get('text'),
            inspiration: formData.get('inspiration'),
            fileName: formData.get('file')?.name || 'Sin archivo'
        };

        // Si EmailJS está configurado, enviar por email
        if (EMAILJS_CONFIG.PUBLIC_KEY !== 'YOUR_PUBLIC_KEY_HERE') {
            await emailjs.send(
                EMAILJS_CONFIG.SERVICE_ID,
                EMAILJS_CONFIG.TEMPLATE_ID_INSCRIPTION,
                data
            );
            showMessage(messageDiv, '✅ ¡Inscripción enviada exitosamente! Nos pondremos en contacto pronto.', 'success');
        } else {
            // Sin EmailJS, guardar en localStorage
            const submissions = JSON.parse(localStorage.getItem('inscriptions') || '[]');
            submissions.push({
                ...data,
                timestamp: new Date().toISOString()
            });
            localStorage.setItem('inscriptions', JSON.stringify(submissions));
            showMessage(messageDiv, '✅ ¡Inscripción registrada localmente! (EmailJS no está configurado)', 'success');
        }

        // Limpiar formulario
        form.reset();

        // Re-habilitar botón después de 3 segundos
        setTimeout(() => {
            submitButton.disabled = false;
        }, 3000);

    } catch (error) {
        console.error('Error al enviar inscripción:', error);
        showMessage(messageDiv, `❌ Error al enviar: ${error.message}. Intenta de nuevo.`, 'error');
        submitButton.disabled = false;
    }
}

/**
 * Maneja el envío del formulario de contacto
 */
async function handleContactSubmit(e) {
    e.preventDefault();

    const form = e.target;
    const messageDiv = document.getElementById('contactMessage');
    const submitButton = form.querySelector('button[type="submit"]');

    // Validar datos requeridos
    if (!form.contactName.value.trim() || !form.contactEmail.value.trim() || !form.message.value.trim()) {
        showMessage(messageDiv, '❌ Por favor completa todos los campos requeridos.', 'error');
        return;
    }

    submitButton.disabled = true;
    showMessage(messageDiv, '📤 Enviando mensaje...', 'info');

    try {
        const data = {
            contactName: form.contactName.value,
            contactEmail: form.contactEmail.value,
            subject: form.subject.value,
            message: form.message.value
        };

        // Si EmailJS está configurado
        if (EMAILJS_CONFIG.PUBLIC_KEY !== 'YOUR_PUBLIC_KEY_HERE') {
            await emailjs.send(
                EMAILJS_CONFIG.SERVICE_ID,
                EMAILJS_CONFIG.TEMPLATE_ID_CONTACT,
                data
            );
            showMessage(messageDiv, '✅ ¡Mensaje enviado exitosamente! Te responderemos pronto.', 'success');
        } else {
            // Guardar en localStorage
            const messages = JSON.parse(localStorage.getItem('contactMessages') || '[]');
            messages.push({
                ...data,
                timestamp: new Date().toISOString()
            });
            localStorage.setItem('contactMessages', JSON.stringify(messages));
            showMessage(messageDiv, '✅ ¡Mensaje registrado! (EmailJS no está configurado)', 'success');
        }

        form.reset();
        setTimeout(() => {
            submitButton.disabled = false;
        }, 3000);

    } catch (error) {
        console.error('Error al enviar mensaje:', error);
        showMessage(messageDiv, `❌ Error: ${error.message}`, 'error');
        submitButton.disabled = false;
    }
}

/**
 * Validar formulario de inscripción
 */
function validateInscriptionForm(form) {
    const fullName = form.fullName.value.trim();
    const email = form.email.value.trim();
    const title = form.title.value.trim();
    const category = form.category.value;
    const genre = form.genre.value;
    const text = form.text.value.trim();
    const file = form.file.files[0];
    const original = form.original.checked;
    const authorship = form.authorship.checked;
    const rights = form.rights.checked;
    const terms = form.terms.checked;

    // Validaciones
    if (!fullName) return '❌ Por favor ingresa tu nombre completo.';
    if (!email || !isValidEmail(email)) return '❌ Por favor ingresa un correo electrónico válido.';
    if (!title) return '❌ Por favor ingresa el título de tu obra.';
    if (!category) return '❌ Por favor selecciona una categoría.';
    if (!genre) return '❌ Por favor selecciona un género literario.';
    if (!text && !file) return '❌ Por favor proporciona el texto o carga un archivo.';
    if (!original) return '❌ Debes confirmar que el trabajo es original.';
    if (!authorship) return '❌ Debes confirmar tu autoría.';
    if (!rights) return '❌ Debes autorizar la publicación de tu obra.';
    if (!terms) return '❌ Debes aceptar las bases y condiciones.';

    return null;
}

/**
 * Validar formato de email
 */
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Mostrar mensaje en un div
 */
function showMessage(messageDiv, text, type) {
    if (!messageDiv) return;

    messageDiv.textContent = text;
    messageDiv.className = `form-message visible ${type}`;

    // Auto-ocultar mensaje después de 10 segundos
    if (type === 'success') {
        setTimeout(() => {
            messageDiv.classList.remove('visible');
        }, 10000);
    }
}

// ============================================
// UTILIDADES
// ============================================

/**
 * Obtener datos del localStorage (para verificar inscripciones)
 */
function getStoredInscriptions() {
    return JSON.parse(localStorage.getItem('inscriptions') || '[]');
}

/**
 * Obtener mensajes de contacto del localStorage
 */
function getStoredMessages() {
    return JSON.parse(localStorage.getItem('contactMessages') || '[]');
}

/**
 * Log de inscripciones (para desarrollo)
 */
function logInscriptions() {
    console.log('Inscripciones almacenadas:', getStoredInscriptions());
    console.log('Mensajes almacenados:', getStoredMessages());
}

// ============================================
// INSTRUCCIONES EMAILJS
// ============================================
/*
Para configurar EmailJS completo:

1. VE A: https://www.emailjs.com/
2. CREA UNA CUENTA GRATUITA

3. OBTÉN TU PUBLIC KEY:
   - Dashboard > Account > API Keys
   - Copia tu Public Key (ej: "AbCdEfGhIjKlMnOpQrS")

4. CREA UN SERVICE (Proveedor de email):
   - Email Services > Add New Service
   - Selecciona tu proveedor (Gmail, Outlook, etc.)
   - Sigue las instrucciones
   - Copia el Service ID (ej: "service_xyz123abc")

5. CREA TEMPLATES PARA TUS FORMULARIOS:

   TEMPLATE INSCRIPCIÓN:
   - Templates > Create New Template
   - Asunto: "Nueva Inscripción - Concurso Literario"
   - Content:
     ---
     Nombre: {{fullName}}
     Email: {{email}}
     Edad: {{age}}
     Curso: {{grade}}
     División: {{division}}
     Título: {{title}}
     Categoría: {{category}}
     Género: {{genre}}
     Inspiración: {{inspiration}}
     Archivo: {{fileName}}
     Texto: {{textContent}}
     ---
   - Copia el Template ID (ej: "template_xyz123abc")

   TEMPLATE CONTACTO:
   - Templates > Create New Template
   - Asunto: "Nuevo mensaje - Concurso Literario"
   - Content:
     ---
     Nombre: {{contactName}}
     Email: {{contactEmail}}
     Asunto: {{subject}}
     Mensaje: {{message}}
     ---
   - Copia el Template ID

6. REEMPLAZA EN ESTE ARCHIVO:
   const EMAILJS_CONFIG = {
       PUBLIC_KEY: 'TU_PUBLIC_KEY_AQUI',
       SERVICE_ID: 'TU_SERVICE_ID_AQUI',
       TEMPLATE_ID_INSCRIPTION: 'TU_TEMPLATE_INSCRIPTION_ID_AQUI',
       TEMPLATE_ID_CONTACT: 'TU_TEMPLATE_CONTACT_ID_AQUI'
   };

7. DESCOMENTA LA LÍNEA EN index.html:
   <script type="text/javascript" src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/build/index.min.js"></script>

8. PRUEBA ENVIANDO UN FORMULARIO

¡Listo! Los formularios ahora enviarán emails automáticamente.
*/
