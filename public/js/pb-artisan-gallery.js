(() => {
  const MAX_IMAGES = 12;
  const MAX_BYTES = 5 * 1024 * 1024;
  const TYPES = new Set(['image/jpeg', 'image/png', 'image/webp']);
  const PROMPTS = [
    '¿Qué materiales utilizaste y por qué los elegiste?',
    '¿Qué técnica artesanal utilizaste para crear esta pieza?',
    '¿Qué inspiró el diseño, los colores o la forma?',
    '¿Tiene conexión con Puerto Rico, tu pueblo o una tradición?',
    '¿Qué detalle hecho a mano hace especial esta creación?',
    '¿Qué experiencia o historia personal hay detrás de esta pieza?'
  ];

  const normalizeCreation = (value,allNew=false) => {
    if (typeof value === 'string') return {image:value,title:'',description:'',alt:'',historical:!allNew};
    if (!value || typeof value !== 'object') return null;
    return {
      image:String(value.image || value.url || '').trim(),
      title:String(value.title || '').slice(0,120),
      description:String(value.description || '').slice(0,700),
      alt:String(value.alt || '').slice(0,180),
      historical:!allNew && (!String(value.title || '').trim() || !String(value.description || '').trim())
    };
  };

  const init = () => document.querySelectorAll('[data-pb-gallery-editor]').forEach((editor,editorIndex) => {
    const input = editor.querySelector('[data-pb-gallery-files]');
    const hidden = editor.querySelector('[data-pb-gallery-value]');
    const preview = editor.querySelector('[data-pb-gallery-preview]');
    const status = editor.querySelector('[data-pb-gallery-status]');
    if (!input || !hidden || !preview || !status) return;

    let creations = [];
    try { creations = JSON.parse(hidden.value || '[]'); } catch (_) {}
    const seen = new Set();
    const allNew = editor.hasAttribute('data-pb-gallery-all-new');
    creations = (Array.isArray(creations) ? creations : []).map(value => normalizeCreation(value,allNew)).filter(item => {
      if (!item || !/^https:\/\//.test(item.image) || seen.has(item.image)) return false;
      seen.add(item.image);
      return true;
    }).slice(0, MAX_IMAGES);

    const announceChange = () => {
      hidden.value = JSON.stringify(creations.map(({image,title,description,alt}) => ({image,title,description,alt})));
      hidden.dispatchEvent(new Event('input',{bubbles:true}));
      hidden.dispatchEvent(new Event('change',{bubbles:true}));
    };

    let fieldIndex = 0;
    const field = (tag,label,value,maxLength,onInput,help='') => {
      const wrap = document.createElement('div');
      wrap.className = 'pb-creation-field';
      const caption = document.createElement('label');
      caption.textContent = label;
      const control = document.createElement(tag);
      control.id = `pb-creation-${editorIndex}-${fieldIndex++}`;
      caption.htmlFor = control.id;
      control.value = value;
      control.maxLength = maxLength;
      control.required = false;
      if (tag === 'textarea') control.rows = 4;
      control.addEventListener('input',event => onInput(event.target.value));
      wrap.append(caption,control);
      if (help) {
        const small = document.createElement('small');
        small.textContent = help;
        wrap.append(small);
      }
      return wrap;
    };

    const sync = () => {
      announceChange();
      preview.replaceChildren(...creations.map((creation, index) => {
        const card = document.createElement('article');
        card.className = 'pb-creation-editor-card';
        const media = document.createElement('div');
        media.className = 'pb-creation-editor-media';
        const image = document.createElement('img');
        image.src = creation.image;
        image.alt = creation.alt || `Creación ${index + 1}`;
        image.loading = 'lazy';
        image.width = 320;
        image.height = 240;
        const remove = document.createElement('button');
        remove.type = 'button';
        remove.textContent = 'Quitar';
        remove.className = 'pb-creation-remove';
        remove.setAttribute('aria-label', `Quitar creación ${index + 1}`);
        remove.addEventListener('click', () => { creations.splice(index, 1); status.textContent = 'Creación eliminada. Guarda los cambios para confirmar.'; sync(); });
        media.append(image,remove);
        const fields = document.createElement('div');
        fields.className = 'pb-creation-editor-fields';
        let promptIndex = index % PROMPTS.length;
        const descriptionField = field('textarea',creation.historical ? 'Descripción' : 'Descripción *',creation.description,700,value => { creation.description=value; announceChange(); },PROMPTS[promptIndex]);
        const descriptionControl = descriptionField.querySelector('textarea');
        descriptionControl.required = !creation.historical;
        const promptText = descriptionField.querySelector('small');
        const nextPrompt = document.createElement('button');
        nextPrompt.type = 'button';
        nextPrompt.className = 'pb-prompt-refresh';
        nextPrompt.textContent = 'Mostrar otra idea';
        nextPrompt.addEventListener('click',() => {
          promptIndex = (promptIndex + 1) % PROMPTS.length;
          promptText.textContent = PROMPTS[promptIndex];
        });
        descriptionField.append(nextPrompt);
        fields.append(
          (() => {
            const titleField = field('input',creation.historical ? 'Título de la creación' : 'Título de la creación *',creation.title,120,value => { creation.title=value; announceChange(); });
            titleField.querySelector('input').required = !creation.historical;
            return titleField;
          })(),
          descriptionField,
          field('input','Texto alternativo',creation.alt,180,value => { creation.alt=value; image.alt=value || `Creación ${index + 1}`; announceChange(); },'Describe brevemente lo que aparece en la fotografía para personas que utilizan lectores de pantalla.')
        );
        card.append(media,fields);
        return card;
      }));
      input.disabled = creations.length >= MAX_IMAGES;
    };

    const upload = file => new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onerror = () => reject(new Error('No se pudo leer la imagen.'));
      reader.onload = async () => {
        try {
          const response = await fetch('/api/upload-photo', { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({data:reader.result}) });
          const data = await response.json();
          if (!response.ok || !data.ok) throw new Error(data.error || 'No se pudo subir la imagen.');
          resolve(data.url);
        } catch (error) { reject(error); }
      };
      reader.readAsDataURL(file);
    });

    input.addEventListener('change', async () => {
      const available = MAX_IMAGES - creations.length;
      const selected = [...input.files].slice(0, available);
      input.value = '';
      if (!selected.length) return;
      for (const file of selected) {
        if (!TYPES.has(file.type)) { status.textContent = 'Usa solamente imágenes JPG, PNG o WebP.'; continue; }
        if (file.size > MAX_BYTES) { status.textContent = 'Cada imagen debe pesar 5 MB o menos.'; continue; }
        status.textContent = `Subiendo ${creations.length + 1} de ${MAX_IMAGES}…`;
        try { creations.push({image:await upload(file),title:'',description:'',alt:'',historical:false}); sync(); }
        catch (error) { status.textContent = `❌ ${error.message}`; break; }
      }
      if (creations.length) status.textContent = `✅ ${creations.length} creación${creations.length === 1 ? '' : 'es'} lista${creations.length === 1 ? '' : 's'} para guardar.`;
    });
    sync();
  });
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, {once:true});
  else init();
})();
