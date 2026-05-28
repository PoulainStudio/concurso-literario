document.addEventListener('DOMContentLoaded',()=>{
  // set year in footer
  const y = new Date().getFullYear();
  const yearEl = document.getElementById('year');
  if(yearEl) yearEl.textContent = y;

  const form = document.getElementById('registrationForm');
  const message = document.getElementById('formMessage');

  form.addEventListener('submit', async (e)=>{
    e.preventDefault();
    message.textContent = '';
    const data = new FormData(form);

    // basic validation: ensure original checkbox is checked
    if(!form.original.checked){
      message.style.color = 'crimson';
      message.textContent = 'Debe confirmar que el trabajo es original.';
      form.original.focus();
      return;
    }

    // require either text or file
    const text = data.get('text') && data.get('text').toString().trim();
    const file = form.querySelector('#file').files[0];
    if(!text && !file){
      message.style.color = 'crimson';
      message.textContent = 'Por favor pega el texto o sube un archivo.';
      return;
    }

    // simulate submission (no backend)
    message.style.color = 'green';
    message.textContent = 'Enviando inscripción...';

    // simulate delay
    await new Promise(r=>setTimeout(r,800));

    // log form values (for demo)
    const output = {};
    for(const [k,v] of data.entries()){
      if(k==='file') continue;
      output[k]=v;
    }
    if(file) output.fileName = file.name;
    console.log('Simulated submission:', output);

    message.textContent = 'Inscripción recibida. ¡Gracias por participar!';
    form.reset();
  });
});
