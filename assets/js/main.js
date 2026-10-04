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
      yearEn: 'Foundations', titleEn: 'The Roots of Logic & UniValle', descEn: 'Rigorous training in Systems Engineering at Universidad del Valle. Relational databases, data structures and core algorithms that laid the foundation of architectural thinking.',
      tags: ['Universidad del Valle', 'Algoritmia', 'Bases de Datos', 'Data Structures'],
      duration: 8
    },
    {
      id: 1,
      year: 'Enterprise Core',
      title: 'Arquitectura Backend & Open Systems',
      desc: 'Desarrollo de motores de facturación y telecomunicaciones de misión crítica. Implementación de Java EE, PL/SQL Oracle y procesamiento concurrente masivo de datos con alta tolerancia a fallos.',
      yearEn: 'Enterprise Core', titleEn: 'Backend Architecture & Open Systems', descEn: 'Mission-critical billing and telecom engines. Java EE, Oracle PL/SQL and massively concurrent data processing with high fault tolerance.',
      tags: ['Java Enterprise', 'Oracle PL/SQL', 'Billing Engines', 'Alta Concurrencia'],
      duration: 9
    },
    {
      id: 2,
      year: 'GovTech & SAUL',
      title: 'Transformación Cívica & SAUL Cali',
      desc: 'Liderazgo en la modernización digital de la Alcaldía de Cali. Arquitectura y despliegue de SAUL, automatizando trámites de Uso de Suelo, Espectáculos Públicos y Subvenciones para la ciudadanía.',
      yearEn: 'GovTech & SAUL', titleEn: 'Civic Transformation & SAUL Cali', descEn: 'Led the digital modernization of Cali City Hall. Architected and deployed SAUL, automating Land Use, Public Entertainment and Grants services for citizens.',
      tags: ['SAUL Digital', 'Alcaldía de Cali', 'Gestión Territorial', 'GovTech'],
      duration: 9
    },
    {
      id: 3,
      year: 'Cloud & Distributed',
      title: 'Arquitectura Cloud & CSmart Telecom',
      desc: 'Diseño e implementación de ecosistemas cloud nativos en AWS. Microservicios distribuidos, contenedores Docker/Kubernetes y arquitecturas resilientes de alta disponibilidad.',
      yearEn: 'Cloud & Distributed', titleEn: 'Cloud Architecture & CSmart Telecom', descEn: 'Design and implementation of cloud-native ecosystems on AWS. Distributed microservices, Docker/Kubernetes containers and resilient high-availability architectures.',
      tags: ['AWS Cloud', 'Microservicios', 'Kubernetes & Docker', 'Event-Driven'],
      duration: 9
    },
    {
      id: 4,
      year: 'IA & Data Science',
      title: 'Inteligencia Artificial & Agent Dragon',
      desc: 'Revolución en automatización con IA Generativa y Agentes Autónomos de Voz. Integración con HubSpot, telefonía en tiempo real, síntesis de audio y flujos cognitivos de toma de decisiones.',
      yearEn: 'AI & Data Science', titleEn: 'Artificial Intelligence & Agent Dragon', descEn: 'Automation revolution with Generative AI and Autonomous Voice Agents. HubSpot integration, real-time telephony, audio synthesis and cognitive decision flows.',
      tags: ['Agent Dragon', 'Voice AI', 'HubSpot CRM', 'LLMs & Machine Learning'],
      duration: 9
    },
    {
      id: 5,
      year: 'Human Tech',
      title: 'Tecnología con Alma & Arteterapia',
      desc: 'Creación de plataformas que integran arte, ciencia de datos y salud: aplicaciones de rehabilitación vocal fonoaudiológica, motores de cuentos con IA y herramientas interactivas de arteterapia consciente.',
      yearEn: 'Human Tech', titleEn: 'Technology with Soul & Art Therapy', descEn: 'Platforms blending art, data science and health: speech-therapy vocal rehabilitation apps, AI storytelling engines and interactive mindful art-therapy tools.',
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
    // selección de idioma
    const en = window.LANG === 'en';
    sceneBadge.textContent = en ? (s.yearEn || s.year) : s.year;
    sceneTitle.textContent = en ? (s.titleEn || s.title) : s.title;
    sceneDesc.textContent = en ? (s.descEn || s.desc) : s.desc;
    
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
  // re-render al cambiar idioma
  window.addEventListener('langchange', () => renderScene(currentSceneIdx));

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
