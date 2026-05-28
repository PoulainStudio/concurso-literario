# 📚 Concurso Literario - Colegio Parroquial San Justo

Sitio web moderno y elegante para el Concurso Literario del Colegio Parroquial San Justo, con formularios de inscripción completos, integración con EmailJS y diseño responsivo.

## 🎯 Características

✅ **Diseño Institucional**
- Paleta de colores inspirada en la identidad oficial del colegio
- Diseño moderno, elegante y profesional
- Degradados suaves, patrones y efectos de profundidad

✅ **Navegación Intuitiva**
- Navbar sticky con navegación suave
- Enlaces internos funcionales
- Menú responsive para dispositivos móviles
- Footer con enlaces e información institucional

✅ **Secciones Completas**
- Presentación del concurso
- Bases y condiciones detalladas
- 20 categorías literarias
- 20 géneros literarios
- Tabla comparativa de géneros
- Preguntas frecuentes
- Información sobre la importancia de la lectura
- Frases inspiradoras
- Contacto directo

✅ **Formulario de Inscripción Avanzado**
- Datos personales completos
- Selección de categoría y género
- Carga de texto o archivo
- Múltiples declaraciones obligatorias
- Validación completa
- Integración con EmailJS

✅ **Formulario de Contacto**
- Mensajes directos
- Validación de datos
- Respuestas automáticas

✅ **Responsividad**
- Optimizado para móviles, tablets y computadoras
- Grid layouts adaptativos
- Tipografía responsive
- Touch-friendly buttons

✅ **Animaciones y Efectos**
- Animaciones al scroll
- Transiciones suaves
- Efectos hover en tarjetas
- Glassmorphism cards

## 📁 Estructura de Archivos

```
concurso-literario/
├── index.html          # Página principal con todas las secciones
├── styles.css          # Estilos CSS con paleta institucional
├── script.js           # JavaScript con lógica de formularios
├── README.md           # Este archivo
└── EMAILJS_SETUP.md    # Guía detallada de EmailJS
```

## 🚀 Instalación y Uso

### 1. **Descargar o Clonar**
```bash
# Si tienes Git
git clone <url-del-repositorio>

# O simplemente descargar los archivos
```

### 2. **Abrir en el Navegador**
- Abre `index.html` en tu navegador favorito
- El sitio funcionará completamente (excepto el envío de emails sin EmailJS configurado)

### 3. **Probar Localmente**
- Los formularios guardarán datos en `localStorage` si EmailJS no está configurado
- Usa la consola del navegador (F12 > Console) para ver los datos:
  ```javascript
  logInscriptions()  // Ver todas las inscripciones
  ```

## 📧 Configurar EmailJS

Para que los formularios envíen emails reales, sigue estos pasos:

### **Paso 1: Crear Cuenta en EmailJS**
1. Ve a https://www.emailjs.com/
2. Haz clic en "Sign Up Free"
3. Completa el formulario de registro
4. Verifica tu email

### **Paso 2: Obtener Credenciales**
1. En el Dashboard, ve a **Account > API Keys**
2. Copia tu **Public Key** (similar a: `AbCdEfGhIjKlMnOpQrS`)

### **Paso 3: Configurar Servicio de Email**
1. Ve a **Email Services > Add New Service**
2. Selecciona tu proveedor (Gmail, Outlook, etc.)
3. Sigue las instrucciones de autorización
4. Copia el **Service ID** generado

### **Paso 4: Crear Templates**

#### Template para Inscripciones:
1. Ve a **Templates > Create New Template**
2. Nombre: "inscription-template"
3. Asunto: `Nueva Inscripción - {{title}}`
4. Contenido:
```
Nombre: {{fullName}}
Email: {{email}}
Edad: {{age}}
Curso: {{grade}}
División: {{division}}
Título de la Obra: {{title}}
Categoría: {{category}}
Género: {{genre}}
Inspiración: {{inspiration}}
Archivo: {{fileName}}
Texto: {{textContent}}
Fecha: {{timestamp}}
```
5. Copia el **Template ID**

#### Template para Contacto:
1. **Templates > Create New Template**
2. Nombre: "contact-template"
3. Asunto: `Nuevo Mensaje - {{subject}}`
4. Contenido:
```
Nombre: {{contactName}}
Email: {{contactEmail}}
Asunto: {{subject}}
Mensaje: {{message}}
Fecha: {{timestamp}}
```
5. Copia el **Template ID**

### **Paso 5: Configurar en script.js**
Abre `script.js` y reemplaza estas líneas al inicio:

```javascript
const EMAILJS_CONFIG = {
    PUBLIC_KEY: 'TU_PUBLIC_KEY_AQUI',
    SERVICE_ID: 'TU_SERVICE_ID_AQUI',
    TEMPLATE_ID_INSCRIPTION: 'TU_TEMPLATE_INSCRIPTION_ID_AQUI',
    TEMPLATE_ID_CONTACT: 'TU_TEMPLATE_CONTACT_ID_AQUI'
};
```

### **Paso 6: Descomenta EmailJS en index.html**
Busca la línea comentada y descomenta:
```html
<!-- <script type="text/javascript" src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/build/index.min.js"></script> -->
```

Conviértela en:
```html
<script type="text/javascript" src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/build/index.min.js"></script>
```

### **Paso 7: Prueba**
1. Recarga el navegador
2. Llena un formulario y envía
3. Deberías recibir un email

**¡Listo!** Los formularios ahora enviarán emails automáticamente.

## 🎨 Personalización

### Cambiar Colores
En `styles.css`, modifica las variables de color en `:root`:
```css
:root {
  --primary-red: #a85241;
  --primary-blue: #3a7ca5;
  --primary-yellow: #ffc000;
  /* etc... */
}
```

### Agregar Más Categorías
En `index.html`, busca la sección de categorías y agrega:
```html
<div class="card">
  <h4>Tu Categoría</h4>
  <p>Descripción aquí...</p>
</div>
```

### Cambiar Fechas Límite
Busca en `index.html` las fechas marcadas como `[FECHA A CONFIRMAR]` y reemplázalas.

### Cambiar Información de Contacto
Busca la sección de "Contacto" y actualiza los números de teléfono, emails y ubicaciones.

## 📱 Responsividad

El sitio se adapta automáticamente a:
- 📱 Móviles (320px - 768px)
- 📱 Tablets (768px - 1024px)
- 💻 Computadoras (1024px+)

## ✨ Características Técnicas

- **HTML5 Semántico**: Estructura correcta y accesible
- **CSS3 Moderno**: Variables CSS, Grid, Flexbox, Media Queries
- **JavaScript Vanilla**: Sin dependencias externas (excepto EmailJS opcional)
- **Sin Bloat**: Optimizado y rápido
- **Accesibilidad**: ARIA labels, navegación por teclado

## 🔒 Seguridad

- Validación de email en cliente
- Validación de formularios obligatorios
- Protección contra spam con checkboxes obligatorios
- La Public Key de EmailJS es segura de compartir

## 🐛 Solución de Problemas

### "El formulario no envía emails"
- ✅ Verifica que EmailJS esté descomentado en `index.html`
- ✅ Verifica que las credenciales sean correctas en `script.js`
- ✅ Abre la consola (F12) para ver errores

### "Los datos no se guardan"
- ✅ Abre DevTools (F12) > Application > LocalStorage
- ✅ Verifica que el navegador tenga habilitado localStorage

### "Los formularios no validan"
- ✅ Verifica que todos los campos requeridos estén llenos
- ✅ Verifica que el email sea válido
- ✅ Verifica que los checkboxes obligatorios estén marcados

## 📚 Recursos

- [EmailJS Documentación](https://www.emailjs.com/docs/)
- [MDN Web Docs](https://developer.mozilla.org/)
- [Google Fonts](https://fonts.google.com/)

## 📝 Licencia

Este proyecto está disponible para uso educativo en el Colegio Parroquial San Justo.

## 👨‍💼 Autor

Diseñado y desarrollado con ❤️ para fomentar la creatividad y la pasión por la literatura.

---

**Última actualización**: 2026
**Versión**: 2.0 Completa
