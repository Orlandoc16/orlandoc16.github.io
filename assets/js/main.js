// ==============================================================
// ORLANDO COSSIO MURILLO — MAIN SCRIPT
// Senior Full-Stack & Backend Engineer | Data Scientist
// ==============================================================

document.addEventListener('DOMContentLoaded', () => {

  const scenes = [
    {
      id: 0,
      year: 'Fundamentos',
      title: 'Las Raíces de la Lógica & UniValle',
      desc: 'Formación rigurosa en Ingeniería de Sistemas en la Universidad del Valle. Bases de datos relacionales, estructuras de datos y algoritmos fundamentales que cimentaron el pensamiento arquitectónico.',
      tags: ['Universidad del Valle', 'Algoritmia', 'Bases de Datos', 'Data Structures'],
      duration: 8
    },
    {
      id: 1,
      year: 'Enterprise Core',
      title: 'Arquitectura Backend & Open Systems',
      desc: 'Desarrollo de motores de facturación y telecomunicaciones de misión crítica. Implementación de Java EE, PL/SQL Oracle y procesamiento concurrente masivo de datos con alta tolerancia a fallos.',
      tags: ['Java Enterprise', 'Oracle PL/SQL', 'Billing Engines', 'Alta Concurrencia'],
      duration: 9
    },
    {
      id: 2,
      year: 'GovTech & SAUL',
      title: 'Transformación Cívica & SAUL Cali',
      desc: 'Liderazgo en la modernización digital de la Alcaldía de Cali. Arquitectura y despliegue de SAUL, automatizando trámites de Uso de Suelo, Espectáculos Públicos y Subvenciones para la ciudadanía.',
      tags: ['SAUL Digital', 'Alcaldía de Cali', 'Gestión Territorial', 'GovTech'],
      duration: 9
    },
    {
      id: 3,
      year: 'Cloud & Distributed',
      title: 'Arquitectura Cloud & CSmart Telecom',
      desc: 'Diseño e implementación de ecosistemas cloud nativos en AWS. Microservicios distribuidos, contenedores Docker/Kubernetes y arquitecturas resilientes de alta disponibilidad.',
      tags: ['AWS Cloud', 'Microservicios', 'Kubernetes & Docker', 'Event-Driven'],
      duration: 9
    },
    {
      id: 4,
      year: 'IA & Data Science',
      title: 'Inteligencia Artificial & Agent Dragon',
      desc: 'Revolución en automatización con IA Generativa y Agentes Autónomos de Voz. Integración con HubSpot, telefonía en tiempo real, síntesis de audio y flujos cognitivos de toma de decisiones.',
      tags: ['Agent Dragon', 'Voice AI', 'HubSpot CRM', 'LLMs & Machine Learning'],
      duration: 9
    },
    {
      id: 5,
      year: 'Human Tech',
      title: 'Tecnología con Alma & Arteterapia',
      desc: 'Creación de plataformas que integran arte, ciencia de datos y salud: aplicaciones de rehabilitación vocal fonoaudiológica, motores de cuentos con IA y herramientas interactivas de arteterapia consciente.',
      tags: ['Arteterapia', 'Rehabilitación Vocal', 'Cuentos IA', 'Canvas Interactivo'],
      duration: 8
    },
    {
      id: 6,
      year: 'Visión & Liderazgo',
      title: 'Senior Full-Stack & Backend Engineer | Data Scientist',
      desc: 'Más de 10 años de experiencia comprobada fusionando profundidad en backend distribuido, machine learning y visión de producto para entregar soluciones robustas y escalables.',
      tags: ['Full-Stack', 'Backend Core', 'Data Science', 'Tech Leadership'],
      duration: 8
    }
  ];

  let currentSceneIdx = 0;
  let isPlaying = true;
  let progressSec = 0;
  const totalDuration = scenes.reduce((acc, s) => acc + s.duration, 0); // 60s
  let animationInterval = null;

  const playBtn = document.getElementById('playBtn');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const timerDisplay = document.getElementById('playerTimer');
  const progressFill = document.getElementById('playerProgressFill');
  const eraTabs = document.querySelectorAll('.era-tab');
  const sceneSlides = document.querySelectorAll('.scene-slide');
  
  const sceneBadge = document.getElementById('sceneBadge');
  const sceneTitle = document.getElementById('sceneTitle');
  const sceneDesc = document.getElementById('sceneDesc');
  const sceneTags = document.getElementById('sceneTags');

  function renderScene(idx) {
    const s = scenes[idx];
    currentSceneIdx = idx;

    // Actualizar tabs
    eraTabs.forEach((tab, i) => {
      tab.classList.toggle('active', i === idx);
    });

    // Activar slide visible pre-renderizado
    sceneSlides.forEach((slide, i) => {
      slide.classList.toggle('active', i === idx);
    });

    // Textos y badges
    sceneBadge.textContent = s.year;
    sceneTitle.textContent = s.title;
    sceneDesc.textContent = s.desc;
    
    sceneTags.innerHTML = '';
    s.tags.forEach(t => {
      const pill = document.createElement('span');
      pill.className = 'scene-tag-pill';
      pill.textContent = t;
      sceneTags.appendChild(pill);
    });
  }

  function startPlayback() {
    isPlaying = true;
    if (playBtn) playBtn.innerHTML = '⏸';
    if (animationInterval) clearInterval(animationInterval);

    animationInterval = setInterval(() => {
      progressSec += 0.2;
      if (progressSec >= totalDuration) {
        progressSec = 0;
      }

      let accumulated = 0;
      let targetIdx = 0;
      for (let i = 0; i < scenes.length; i++) {
        accumulated += scenes[i].duration;
        if (progressSec <= accumulated) {
          targetIdx = i;
          break;
        }
      }

      if (targetIdx !== currentSceneIdx) {
        renderScene(targetIdx);
      }

      const percent = (progressSec / totalDuration) * 100;
      if (progressFill) progressFill.style.width = percent + '%';
      
      const secFormatted = Math.floor(progressSec).toString().padStart(2, '0');
      if (timerDisplay) timerDisplay.textContent = `00:${secFormatted} / 01:00`;

    }, 200);
  }

  function pausePlayback() {
    isPlaying = false;
    if (playBtn) playBtn.innerHTML = '▶';
    if (animationInterval) clearInterval(animationInterval);
  }

  if (playBtn) {
    playBtn.addEventListener('click', () => {
      if (isPlaying) pausePlayback();
      else startPlayback();
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      let nextIdx = (currentSceneIdx - 1 + scenes.length) % scenes.length;
      jumpToScene(nextIdx);
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      let nextIdx = (currentSceneIdx + 1) % scenes.length;
      jumpToScene(nextIdx);
    });
  }

  function jumpToScene(idx) {
    let acc = 0;
    for (let i = 0; i < idx; i++) {
      acc += scenes[i].duration;
    }
    progressSec = acc + 0.1;
    renderScene(idx);
    if (!isPlaying) {
      const percent = (progressSec / totalDuration) * 100;
      if (progressFill) progressFill.style.width = percent + '%';
      const secFormatted = Math.floor(progressSec).toString().padStart(2, '0');
      if (timerDisplay) timerDisplay.textContent = `00:${secFormatted} / 01:00`;
    }
  }

  eraTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const idx = parseInt(tab.dataset.scene, 10);
      jumpToScene(idx);
    });
  });

  renderScene(0);
  startPlayback();

  // Filtros de Galería
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const category = btn.dataset.filter;

      projectCards.forEach(card => {
        if (category === 'all' || card.dataset.category === category) {
          card.style.display = 'flex';
          card.style.opacity = '1';
        } else {
          card.style.display = 'none';
          card.style.opacity = '0';
        }
      });
    });
  });

  // Lightbox Modal
  const modal = document.getElementById('lightboxModal');
  const modalImg = document.getElementById('modalImg');
  const modalTitle = document.getElementById('modalTitle');
  const modalDesc = document.getElementById('modalDesc');
  const modalClose = document.getElementById('modalClose');

  document.querySelectorAll('.btn-view-capture').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const card = btn.closest('.project-card');
      const img = card.querySelector('.project-image-box img').src;
      const title = card.querySelector('.project-title').textContent;
      const desc = card.querySelector('.project-desc').textContent;

      modalImg.src = img;
      modalTitle.textContent = title;
      modalDesc.textContent = desc;
      modal.classList.add('active');
    });
  });

  if (modalClose) {
    modalClose.addEventListener('click', () => {
      modal.classList.remove('active');
    });
  }

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('active');
      }
    });
  }

});
