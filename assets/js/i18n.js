// ==============================================================
// I18N — Bilingüe ES/EN con botón en el menú
// ==============================================================
(function () {
  const I18N = [
    // [selector, ES, EN]
    // Navegación
    ['.nav-links a[href="#hero"]', 'Inicio', 'Home'],
    ['a[href="#journey"]', 'Recorrido 60s', '60s Journey'],
    ['a[href="#gallery"]', 'Galería de Proyectos', 'Project Gallery'],
    ['a[href="#stack"]', 'Stack & Arquitectura', 'Stack & Architecture'],
    ['a[href="#contact"].btn-nav-action', 'Contactar', 'Contact'],
    // Hero
    ['.hero-tag', '10+ Años de Experiencia Comprobada', '10+ Years of Proven Experience'],
    ['.hero-title', 'Senior Full-Stack & Backend Engineer | Data Scientist', 'Senior Full-Stack & Backend Engineer | Data Scientist'],
    ['.hero-bio', 'Ingeniero de Sistemas de la Universidad del Valle. Especializado en arquitectura de software distribuido, pipelines de datos, microservicios cloud y desarrollo de agentes autónomos con Inteligencia Artificial.', 'Systems Engineer from Universidad del Valle. Specialized in distributed software architecture, data pipelines, cloud microservices and autonomous AI agent development.'],
    ['.metric-item:nth-child(1) .metric-lbl', 'Años de Experiencia', 'Years of Experience'],
    ['.metric-item:nth-child(2) .metric-lbl', 'Proyectos Clave', 'Key Projects'],
    ['.metric-item:nth-child(3) .metric-lbl', 'Usuarios Impactados', 'Users Impacted'],
    ['.hero-cta-group a[href="#journey"]', 'Ver Animación (60s)', 'Watch Animation (60s)'],
    ['.hero-cta-group a[href$=".pdf"]', '📄 Descargar CV', '📄 Download CV'],
    ['.hero-cta-group .btn-outline', 'Explorar Proyectos', 'Explore Projects'],
    // Journey
    ['#journey .section-tag', 'Cinematic Journey', 'Cinematic Journey'],
    ['#journey .section-head h2', '1 Minuto por Mi Recorrido Profesional', '1 Minute Through My Professional Journey'],
    ['#journey .section-head p', 'Una experiencia visual a través de cada era técnica: desde los fundamentos algorítmicos hasta la computación en la nube, machine learning y agentes de voz.', 'A visual experience through each technical era: from algorithmic foundations to cloud computing, machine learning and voice agents.'],
    ['.live-indicator', 'RECORRIDO EN VIVO', 'LIVE JOURNEY'],
    ['#prevBtn', '⏮', '⏮'], ['#playBtn', '⏸', '⏸'], ['#nextBtn', '⏭', '⏭'],
    // Tabs de eras (span.tab-year / .tab-title)
    ['.era-tab[data-scene="0"] .tab-year', 'Fundamentos', 'Foundations'],
    ['.era-tab[data-scene="1"] .tab-year', 'Enterprise', 'Enterprise'],
    ['.era-tab[data-scene="2"] .tab-year', 'GovTech', 'GovTech'],
    ['.era-tab[data-scene="3"] .tab-year', 'Cloud', 'Cloud'],
    ['.era-tab[data-scene="4"] .tab-year', 'AI & Data', 'AI & Data'],
    ['.era-tab[data-scene="5"] .tab-year', 'Human Tech', 'Human Tech'],
    ['.era-tab[data-scene="6"] .tab-year', 'Senior Profile', 'Senior Profile'],
    // Galería
    ['#gallery .section-tag', 'Portfolio Showcase', 'Portfolio Showcase'],
    ['#gallery .section-head h2', 'Proyectos & Capturas Reales', 'Projects & Real Screenshots'],
    ['#gallery .section-head p', 'Evidencia visual de productos y plataformas construidas, desplegadas en producción y probadas en el mundo real.', 'Visual evidence of products and platforms built, deployed to production and tested in the real world.'],
    ['.filter-btn[data-filter="all"]', 'Todos los Proyectos', 'All Projects'],
    ['.filter-btn[data-filter="ia"]', '🤖 IA & Data Science', '🤖 AI & Data Science'],
    ['.filter-btn[data-filter="civic"]', '🏛️ GovTech & Enterprise', '🏛️ GovTech & Enterprise'],
    ['.filter-btn[data-filter="human"]', '🎨 Human Tech & Salud', '🎨 Human Tech & Health'],
    // Botones ver captura
    ['.btn-view-capture', '🔍 Ver Captura Completa', '🔍 View Full Screenshot'],
    // Stack
    ['#stack .section-tag', 'Core Competencies', 'Core Competencies'],
    ['#stack .section-head h2', 'Pilares Técnicos & Ciencia de Datos', 'Technical Pillars & Data Science'],
    ['#stack .section-head p', 'Integración de ingeniería de software robusta, arquitecturas distribuidas y modelos de datos avanzados.', 'Integration of robust software engineering, distributed architectures and advanced data models.'],
    // Contacto
    ['#contact .section-tag', 'Conectemos', "Let's Connect"],
    ['#contact h2', '¿Listo para Potenciar su Equipo de Ingeniería o Datos?', 'Ready to Power Your Engineering or Data Team?'],
    ['#contact .contact-card > p', 'Disponible para roles como Senior Full-Stack & Backend Engineer o Data Scientist en proyectos de alto impacto.', 'Available for Senior Full-Stack & Backend Engineer or Data Scientist roles in high-impact projects.'],
    ['#contact .btn-primary', '✉️ Enviar Correo Directo', '✉️ Send Direct Email'],
    ['#contact .btn-outline', '🌐 Conectar en LinkedIn', '🌐 Connect on LinkedIn'],
    // Footer
    ['.site-footer p', '© 2026 Orlando Cossio Murillo · Barcelona, España · Senior Full-Stack & Backend Engineer | Data Scientist', '© 2026 Orlando Cossio Murillo · Barcelona, Spain · Senior Full-Stack & Backend Engineer | Data Scientist']
  ];

  // Aplicar idioma
  function aplicarIdioma(lang) {
    window.LANG = lang;
    localStorage.setItem('oc_lang', lang);
    document.documentElement.lang = lang;
    for (const [sel, es, en] of I18N) {
      document.querySelectorAll(sel).forEach(el => {
        const val = lang === 'en' ? en : es;
        if (el.tagName === 'BUTTON' && el.classList.contains('btn-ctrl')) return; // iconos
        el.textContent = val;
      });
    }
    const btn = document.getElementById('langToggle');
    if (btn) btn.textContent = lang === 'es' ? 'EN' : 'ES';
    window.dispatchEvent(new CustomEvent('langchange', { detail: lang }));
  }

  document.addEventListener('DOMContentLoaded', () => {
    const guardado = localStorage.getItem('oc_lang') || 'es';
    aplicarIdioma(guardado);
    const btn = document.getElementById('langToggle');
    if (btn) btn.addEventListener('click', () => {
      aplicarIdioma(window.LANG === 'es' ? 'en' : 'es');
    });
  });
})();
