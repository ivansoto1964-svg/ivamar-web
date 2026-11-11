(() => {
  const days = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
  const timeFormat = new Intl.DateTimeFormat('es-PR', {
    timeZone: 'UTC', hour: 'numeric', minute: '2-digit',
  });
  const time = value => timeFormat.format(new Date(`2000-01-01T${value}:00Z`));
  const byId = id => document.getElementById(`radio-${id}`);
  const audio = byId('audio');
  const play = byId('play');
  const status = byId('status');
  const link = byId('link');
  const next = byId('next');
  const list = byId('programs');
  let state;
  let listening = false;
  let source = '';
  let failedStream = '';
  let timer;
  let requestInProgress = false;
  let renderKey = '';

  function updateButton() {
    play.hidden = !source && !failedStream;
    play.textContent = !source ? 'Reintentar' : audio.paused ? 'Escuchar' : 'Pausar';
  }

  function playAudio() {
    const requested = source;
    audio.play().then(() => {
      if (source === requested) updateButton();
    }).catch(error => {
      if (source !== requested || error.name === 'AbortError') return;
      updateButton();
      if (error.name === 'NotSupportedError') useBackup();
    });
  }

  function useBackup() {
    if (!state?.current?.stream || source !== state.current.stream) {
      if (source) status.textContent = 'Audio temporalmente no disponible';
      return;
    }
    failedStream = source;
    render();
  }

  function render() {
    const current = state.current;
    const unavailable = Boolean(current?.stream && current.stream === failedStream);
    const activeStream = !unavailable && current?.stream;
    const desired = activeStream || state.fallback || '';
    status.textContent = activeStream ? 'Al aire'
      : unavailable ? 'Señal temporalmente no disponible'
      : current?.link ? 'En vivo por la emisora'
      : desired ? 'Audio de Planeta Boricua' : 'Fuera del aire';
    byId('title-current').textContent = current?.title || (desired ? 'Cápsula de Planeta Boricua' : 'Pronto en Radio PB');
    byId('station').textContent = current?.station || '';
    if (current?.link) link.href = current.link;
    else link.removeAttribute('href');
    link.hidden = !current?.link;
    if (source !== desired) {
      source = desired;
      if (source) audio.src = source;
      else {
        audio.removeAttribute('src');
        audio.load();
      }
      if (source && listening) playAudio();
    }
    updateButton();
    next.hidden = !state.next;
    if (state.next) next.textContent = `Próximo · ${state.next.title} · ${days[state.next.day]} a las ${time(state.next.start)}`;
    const key = JSON.stringify(state.programs);
    if (key !== renderKey) {
      renderKey = key;
      list.replaceChildren(...state.programs.map(program => {
        const row = document.createElement('li');
        row.className = 'program';
        const title = document.createElement('h3');
        title.textContent = program.title;
        const details = document.createElement('p');
        details.textContent = `${program.station} · ${days[program.day]} · ${time(program.start)} a ${time(program.end)}`;
        row.append(title, details);
        return row;
      }));
      if (!state.programs.length) {
        const empty = document.createElement('li');
        empty.textContent = 'Todavía no hay programas anunciados.';
        list.append(empty);
      }
    }
  }

  async function refresh() {
    if (requestInProgress) return;
    clearTimeout(timer);
    requestInProgress = true;
    let delay = 30000;
    try {
      const response = await fetch('/api/pb-radio', { cache: 'no-store', signal: AbortSignal.timeout(8000) });
      if (!response.ok) throw new Error('Programación no disponible');
      const updated = await response.json();
      if (updated.current?.id !== state?.current?.id || updated.current?.stream !== state?.current?.stream) failedStream = '';
      state = updated;
      render();
      if (state.refreshMs !== null) delay = Math.min(delay, Math.max(250, state.refreshMs));
    } catch {
      if (!state) status.textContent = 'No se pudo cargar la programación. Reintentando…';
    } finally {
      requestInProgress = false;
      timer = setTimeout(refresh, delay);
    }
  }

  play.addEventListener('click', () => {
    if (source && !audio.paused) {
      listening = false;
      audio.pause();
      updateButton();
      return;
    }
    listening = true;
    if (failedStream && !source) {
      failedStream = '';
      render();
    }
    if (source) playAudio();
  });
  audio.addEventListener('error', useBackup);
  audio.addEventListener('playing', updateButton);
  audio.addEventListener('pause', updateButton);
  audio.addEventListener('ended', updateButton);
  document.addEventListener('visibilitychange', () => { if (!document.hidden) refresh(); });
  refresh();
})();
