# 📧 GUÍA COMPLETA: CONFIGURAR EMAILJS

Esta guía te ayudará a configurar EmailJS paso a paso para que el Concurso Literario envíe emails automáticamente.

## ¿Qué es EmailJS?

EmailJS es un servicio gratuito que permite enviar emails directamente desde el navegador sin necesidad de un servidor backend. Es perfecto para formularios estáticos.

## 🆓 Plan Gratuito de EmailJS

- **200 emails por mes** (suficiente para un concurso)
- Sin tarjeta de crédito requerida
- Sin cobros ocultos

---

## 📋 PASO A PASO

### PASO 1: Registrarse en EmailJS

1. **Abre** https://www.emailjs.com/
2. Haz clic en **"Sign Up Free"** (esquina superior derecha)
3. Completa el formulario:
   - Email
   - Contraseña
   - Nombre de usuario
4. Haz clic en **"Create account"**
5. **Verifica tu email** (busca el correo de confirmación)

### PASO 2: Obtén tu Public Key

1. **Inicia sesión** en EmailJS
2. Ve a **Account** (icono en la esquina superior derecha)
3. Ve a la pestaña **API Keys**
4. Copia el **Public Key** (verás algo como: `AbCdEfGhIjKlMnOpQrS...`)
5. **Guárdalo en un lugar seguro**

### PASO 3: Configura un Servicio de Email

Un "Service" es tu proveedor de email (Gmail, Outlook, etc.).

#### Si usas Gmail:
1. En EmailJS, ve a **Email Services** (en el menú de la izquierda)
2. Haz clic en **"Add New Service"**
3. Selecciona **Gmail**
4. Haz clic en **"Connect Account"**
5. **Autoriza** la conexión en la ventana de Google
6. Copia el **Service ID** (verás: `service_xxxxxxxxx`)

#### Si usas Outlook:
1. Sigue los mismos pasos pero selecciona **Outlook**
2. Autoriza con tu cuenta de Microsoft

#### Si usas Otro Proveedor:
1. Selecciona tu proveedor en la lista
2. Sigue las instrucciones específicas

### PASO 4: Crear Template para Inscripciones

Un "Template" es la estructura del email que recibirás.

1. En EmailJS, ve a **Templates** (en el menú de la izquierda)
2. Haz clic en **"Create New Template"**
3. Dale un nombre descriptivo: `inscription-template`

4. **Llena los campos:**

   **To Email**: `[TU_EMAIL_AQUI@GMAIL.COM]` (donde recibirás las inscripciones)
   
   **Subject**: `Nueva Inscripción - {{title}}`
   
   **Content**:
   ```
   ¡Hola!

   Has recibido una nueva inscripción al Concurso Literario:

   ---- DATOS DEL PARTICIPANTE ----
   Nombre: {{fullName}}
   Email: {{email}}
   Teléfono: {{phone}}
   Edad: {{age}}
   Curso: {{grade}}
   División: {{division}}

   ---- INFORMACIÓN DE LA OBRA ----
   Título: {{title}}
   Categoría: {{category}}
   Género: {{genre}}
   
   ---- INSPIRACIÓN ----
   {{inspiration}}

   ---- ARCHIVO ----
   {{fileName}}

   ---- CONTENIDO ----
   {{textContent}}

   ---

   Este email fue generado automáticamente desde el formulario de inscripción.
   ```

5. Haz clic en **"Save"** (parte inferior)
6. Copia el **Template ID** (verás: `template_xxxxxxxxx`)

### PASO 5: Crear Template para Contacto

1. Haz clic nuevamente en **"Create New Template"**
2. Dale un nombre: `contact-template`

3. **Llena los campos:**

   **To Email**: `[TU_EMAIL_AQUI@GMAIL.COM]`
   
   **Subject**: `Nuevo Mensaje - {{subject}}`
   
   **Content**:
   ```
   Mensaje desde el formulario de contacto:

   De: {{contactName}}
   Email: {{contactEmail}}
   
   Asunto: {{subject}}
   
   ---- MENSAJE ----
   {{message}}

   ---

   Este email fue generado automáticamente.
   ```

4. Haz clic en **"Save"**
5. Copia el **Template ID**

### PASO 6: Configura las Credenciales en el Código

Ahora que tienes todas las credenciales, configura el archivo `script.js`:

1. **Abre** `script.js` en tu editor
2. **Busca** las líneas al inicio:
   ```javascript
   const EMAILJS_CONFIG = {
       PUBLIC_KEY: 'YOUR_PUBLIC_KEY_HERE',
       SERVICE_ID: 'YOUR_SERVICE_ID_HERE',
       TEMPLATE_ID_INSCRIPTION: 'TEMPLATE_INSCRIPTION_ID',
       TEMPLATE_ID_CONTACT: 'TEMPLATE_CONTACT_ID'
   };
   ```

3. **Reemplaza** con tus credenciales reales:
   ```javascript
   const EMAILJS_CONFIG = {
       PUBLIC_KEY: 'AbCdEfGhIjKlMnOpQrS...',  // Tu Public Key
       SERVICE_ID: 'service_abc123def456',      // Tu Service ID
       TEMPLATE_ID_INSCRIPTION: 'template_xyz789', // Template ID inscripción
       TEMPLATE_ID_CONTACT: 'template_abc456'     // Template ID contacto
   };
   ```

**⚠️ IMPORTANTE:**
- ✅ La Public Key es SEGURA de compartir
- ❌ NUNCA compartas la Secret Key (si la ves)
- ✅ El Service ID es público
- ⚠️ Los Template IDs son públicos pero únicos para ti

### PASO 7: Habilitar EmailJS en HTML

1. **Abre** `index.html`
2. **Busca** esta línea (casi al final del `<head>`):
   ```html
   <!-- <script type="text/javascript" src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/build/index.min.js"></script> -->
   ```

3. **Descomenta** (elimina los `<!--` y `-->`):
   ```html
   <script type="text/javascript" src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/build/index.min.js"></script>
   ```

4. **Guarda** el archivo

### PASO 8: Prueba el Sistema

1. **Recarga** el navegador (Ctrl+F5 o Cmd+Shift+R)
2. **Llena** el formulario de inscripción
3. **Haz clic** en "Enviar Inscripción"
4. **Busca** el email en tu bandeja de entrada (o spam)

**¡Si recibes el email, está funcionando correctamente!**

---

## 🔍 Verificar Configur ación

### ¿Cómo sé si algo está mal?

1. **Abre la consola** (F12 > Console)
2. **Llena y envía** un formulario
3. **Busca errores** en rojo

### Errores Comunes:

| Error | Solución |
|-------|----------|
| `Public Key invalid` | Verifica que la Public Key sea correcta en `script.js` |
| `Service not found` | Verifica que el Service ID sea correcto |
| `Template not found` | Verifica que los Template IDs sean correctos |
| `CORS error` | Asegúrate de que EmailJS esté descomentado en `index.html` |
| `Email service error` | Verifica que tu cuenta de Gmail/Outlook esté autorizada |

---

## 🚀 Próximos Pasos

Después de configurar EmailJS:

1. **Prueba** con varios emails
2. **Verifica** que recibas todos los datos correctamente
3. **Considera** crear reglas en tu email para filtrar las inscripciones
4. **Personaliza** los Templates según sea necesario

---

## 📊 Monitor de Emails

Para ver el historial de emails enviados:

1. En EmailJS, ve a **Dashboard**
2. Verás un gráfico de emails enviados/fallidos
3. Haz clic en **"View Activity"** para más detalles

---

## 💡 Consejos Útiles

### Crear Múltiples Destinatarios

Si quieres que varios docentes reciban los emails, modifica el campo "To Email" en el Template:

```
emailprincipal@gmail.com, email2@gmail.com, email3@gmail.com
```

### Agregar Remitente Personalizado

En el campo "From Email" del Template:
```
concurso@colegio.edu.ar
```

### Filtrar Emails

En Gmail, puedes crear reglas para:
- Etiquetar automáticamente las inscripciones
- Archivar emails automáticamente
- Activar alertas especiales

---

## 🆘 Solución de Problemas

### "No recibo emails"
1. Verifica que la dirección de email esté correcta en el Template
2. Verifica que tu cuenta de email esté autorizada en EmailJS
3. Revisa la carpeta de SPAM
4. Comprueba en el Dashboard de EmailJS si dice "Error"

### "Las variables no se llenan {{example}}"
1. Verifica que los nombres exactos coincidan con el formulario HTML
2. En el HTML, verifica que el atributo `name` sea igual a `{{nombre}}`

### "Funciona en mi computadora pero no en mi celular"
1. Abre la consola (F12)
2. Busca errores específicos del navegador
3. Intenta con otro navegador

### "Se acabaron mis 200 emails del mes"
- Actualiza a un plan pago (desde $2.99 USD/mes)
- O espera al mes siguiente (se renuevan automáticamente)

---

## 📞 Soporte

- **EmailJS Support**: support@emailjs.com
- **Documentación**: https://www.emailjs.com/docs/
- **Foro de Ayuda**: https://github.com/emailjs-com/emailjs-sdk/issues

---

## ✅ Checklist Final

- [ ] Registrado en EmailJS
- [ ] Copié mi Public Key
- [ ] Configuré un Service (Gmail/Outlook)
- [ ] Copié mi Service ID
- [ ] Creé Template para Inscripciones
- [ ] Copié Template ID Inscripciones
- [ ] Creé Template para Contacto
- [ ] Copié Template ID Contacto
- [ ] Configuré `script.js` con mis credenciales
- [ ] Descomente EmailJS en `index.html`
- [ ] Probé enviando un formulario
- [ ] Recibí el email correctamente

**Si completaste todos los pasos, ¡ya está listo!** 🎉

---

**Última actualización**: Mayo 2026
**Versión**: 1.0
