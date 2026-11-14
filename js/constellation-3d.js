/**
 * ==============================================================================
 * THE ART OF HER — SECTION 5: NEXT-LEVEL 3D CONSTELLATION UNIVERSE
 * Three.js WebGL Masterpiece:
 * - Multi-layered 3D Space (5,000+ deep stars, volumetric drifting nebula clouds, 
 *   swirling logarithmic spiral galaxy vortex with bright core & corona)
 * - 12 Tribute Stars (Compound 3D stellar cores, pulsing atmospheric halos, 
 *   orbiting stardust rings, hit-test spheres for mobile tap-to-focus)
 * - Deliberate Branching Constellation with Moving Light Photons travelling continuously
 * - Smooth Cinematic Camera Fly-To & Floating Glassmorphic Message Panels
 * - Real-Time Exploration Counter & Progress Tracker
 * - Grand Final Constellation Unlock Sequence ("I could keep finding new things to love...")
 * - Mobile Touch Handling (Pinch-to-zoom, touch orbit, touch-action: pan-y)
 * - Dynamic Theme Synchronization (Adapts instantly to the 5 colour themes)
 * ==============================================================================
 */

class Constellation3DUniverse {
  constructor() {
    this.container = document.querySelector(".constellation-viewport");
    this.config = window.EXHIBITION_CONFIG?.constellation;
    this.cardModal = document.getElementById("constellation-card-modal");
    this.quickNav = document.getElementById("constellation-quick-nav");
    this.resetBtn = document.getElementById("constellation-reset-cam-btn");

    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.animationId = null;

    this.starMeshes = [];
    this.starGroups = [];
    this.orbitRingGroups = [];
    this.nebulaMeshes = [];
    this.constellationLines = [];
    this.photonPulses = [];
    this.galaxyPoints = null;
    this.galaxyCoreMesh = null;
    this.coreAuraMesh = null;
    this.backgroundStarPoints = null;

    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2(-999, -999);

    // Camera Navigation Positions
    this.defaultCameraPos = new THREE.Vector3(0, 32, 75);
    this.targetCameraPos = this.defaultCameraPos.clone();
    this.targetLookAt = new THREE.Vector3(0, 0, 0);
    this.currentLookAt = new THREE.Vector3(0, 0, 0);

    this.selectedStarIndex = -1;
    this.exploredStars = new Set();
    this.isUserInteracting = false;
    this.mouseParallax = { x: 0, y: 0 };

    // Mobile / Pointer Gesture Controls (Non-blocking vertical scroll)
    this.isPointerDown = false;
    this.pointerStart = { x: 0, y: 0 };
    this.pointerLast = { x: 0, y: 0 };
    this.orbitAngles = { theta: 0, phi: 0.38 };
    this.touchPinchDistance = null;

    this.clock = new THREE.Clock();
    this.isVisible = true;
    this.observer = null;

    this.init();
  }

  init() {
    if (!this.container || typeof THREE === "undefined" || !this.config) {
      console.warn("Three.js not loaded or constellation container missing.");
      return;
    }

    this.setupScene();
    this.createDeepCosmicBackground();
    this.createVolumetricNebulaClouds();
    this.createSpiralGalaxyVortex();
    this.create3DStars();
    this.createFlowingConstellationLinesWithPhotons();
    this.setupInteractionListeners();
    this.renderQuickNav();
    this.setupIntersectionObserver();
    this.setupThemeListener();
    this.renderExplorationCounter();

    // Start 60fps Animation Loop
    this.animate();
  }

  setupScene() {
    const width = this.container.clientWidth || window.innerWidth;
    const height = this.container.clientHeight || (window.innerHeight * 0.85);

    this.scene = new THREE.Scene();
    this.scene.fog = new THREE.FogExp2(0x01110e, 0.0035);

    this.camera = new THREE.PerspectiveCamera(52, width / height, 0.1, 1500);
    this.camera.position.copy(this.defaultCameraPos);
    this.camera.lookAt(this.targetLookAt);

    this.renderer = new THREE.WebGLRenderer({
      antialias: window.devicePixelRatio < 2,
      alpha: true,
      powerPreference: "high-performance"
    });

    const dpr = Math.min(window.devicePixelRatio || 1, 1.75);
    this.renderer.setPixelRatio(dpr);
    this.renderer.setSize(width, height);
    this.renderer.setClearColor(0x000000, 0);

    // pan-y ensures normal page scrolling on touch devices
    this.renderer.domElement.style.cssText = "position:absolute;top:0;left:0;width:100%;height:100%;z-index:2;outline:none;touch-action:pan-y;";
    this.container.appendChild(this.renderer.domElement);

    // Atmospheric Celestial Lighting
    const ambientLight = new THREE.AmbientLight(0x064E46, 1.2);
    ambientLight.name = "ambientLight";
    this.scene.add(ambientLight);

    const centralLight = new THREE.PointLight(0xF4E2BB, 2.4, 250);
    centralLight.position.set(0, 15, 0);
    centralLight.name = "centralLight";
    this.scene.add(centralLight);

    window.addEventListener("resize", () => this.onWindowResize(), { passive: true });
  }

  createDeepCosmicBackground() {
    // 5,000+ Multi-Layered Stars with 3D Depth
    const count = 5200;
    const geo = new THREE.BufferGeometry();
    const pos = new Float32Array(count * 3);
    const cols = new Float32Array(count * 3);
    const sizes = new Float32Array(count);

    const c1 = new THREE.Color(0xFFF9EF);
    const c2 = new THREE.Color(0xF4E2BB);
    const c3 = new THREE.Color(0x0cb3a7);
    const c4 = new THREE.Color(0x9ED8D0);

    for (let i = 0; i < count; i++) {
      const idx = i * 3;
      // Spherical distribution around deep space
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = 250 + Math.random() * 550;

      pos[idx] = r * Math.sin(phi) * Math.cos(theta);
      pos[idx + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[idx + 2] = r * Math.cos(phi);

      const dice = Math.random();
      const col = dice < 0.4 ? c1 : dice < 0.7 ? c2 : dice < 0.88 ? c3 : c4;
      cols[idx] = col.r;
      cols[idx + 1] = col.g;
      cols[idx + 2] = col.b;

      sizes[i] = Math.random() * 2.0 + 0.8;
    }

    geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    geo.setAttribute("color", new THREE.BufferAttribute(cols, 3));

    const mat = new THREE.PointsMaterial({
      size: 1.8,
      vertexColors: true,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });

    this.backgroundStarPoints = new THREE.Points(geo, mat);
    this.scene.add(this.backgroundStarPoints);
  }

  createVolumetricNebulaClouds() {
    // Drifting Volumetric Nebula Cloud Discs (Emerald, Midnight Teal, Antique Gold)
    const cloudColors = [0x064E46, 0x087F78, 0x0cb3a7, 0x8C7348, 0x032F2A];
    this.nebulaMeshes = [];

    const cloudTexture = this.generateRadialGradientTexture();

    for (let i = 0; i < 10; i++) {
      const size = 65 + Math.random() * 55;
      const geo = new THREE.PlaneGeometry(size, size);
      const col = cloudColors[i % cloudColors.length];

      const mat = new THREE.MeshBasicMaterial({
        map: cloudTexture,
        color: col,
        transparent: true,
        opacity: 0.16 + Math.random() * 0.12,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        side: THREE.DoubleSide
      });

      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.set(
        (Math.random() - 0.5) * 160,
        (Math.random() - 0.5) * 60,
        -40 - Math.random() * 140
      );
      mesh.rotation.z = Math.random() * Math.PI * 2;
      mesh.userData = { rotSpeed: (Math.random() - 0.5) * 0.0008 };

      this.scene.add(mesh);
      this.nebulaMeshes.push(mesh);
    }
  }

  generateRadialGradientTexture() {
    const canvas = document.createElement("canvas");
    canvas.width = 128;
    canvas.height = 128;
    const ctx = canvas.getContext("2d");

    const grad = ctx.createRadialGradient(64, 64, 4, 64, 64, 60);
    grad.addColorStop(0, "rgba(255, 255, 255, 1)");
    grad.addColorStop(0.3, "rgba(255, 255, 255, 0.65)");
    grad.addColorStop(0.7, "rgba(255, 255, 255, 0.18)");
    grad.addColorStop(1, "rgba(255, 255, 255, 0)");

    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 128, 128);

    const texture = new THREE.CanvasTexture(canvas);
    return texture;
  }

  createSpiralGalaxyVortex() {
    // SWIRLING EMERALD & GOLD LOGARITHMIC SPIRAL GALAXY VORTEX (Reference 2)
    const particleCount = 4500;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const arms = 3;
    const maxRadius = 82;
    const spinFactor = 2.4;

    const goldCore = new THREE.Color(0xFFF9EF);
    const goldMid = new THREE.Color(0xF4E2BB);
    const emeraldTeal = new THREE.Color(0x087F78);
    const vibrantTeal = new THREE.Color(0x0cb3a7);
    const deepForest = new THREE.Color(0x064E46);

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      const rRatio = Math.pow(Math.random(), 1.7);
      const r = rRatio * maxRadius;

      const armIndex = i % arms;
      const armAngle = (armIndex / arms) * Math.PI * 2;
      const angle = armAngle + (r / maxRadius) * spinFactor * Math.PI * 2;

      const scatterX = (Math.random() - 0.5) * (3.5 + r * 0.18);
      const scatterZ = (Math.random() - 0.5) * (3.5 + r * 0.18);
      const scatterY = (Math.random() - 0.5) * (2.0 + (1 - r / maxRadius) * 6.5);

      positions[i3] = Math.cos(angle) * r + scatterX;
      positions[i3 + 1] = scatterY;
      positions[i3 + 2] = Math.sin(angle) * r + scatterZ;

      let col;
      if (r < 14) {
        col = goldCore.clone().lerp(goldMid, r / 14);
      } else if (r < 45) {
        col = goldMid.clone().lerp(vibrantTeal, (r - 14) / 31);
      } else {
        col = emeraldTeal.clone().lerp(deepForest, (r - 45) / (maxRadius - 45));
      }

      colors[i3] = col.r;
      colors[i3 + 1] = col.g;
      colors[i3 + 2] = col.b;
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 2.4,
      vertexColors: true,
      transparent: true,
      opacity: 0.88,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });

    this.galaxyPoints = new THREE.Points(geometry, material);
    this.galaxyPoints.rotation.x = 0.38;
    this.scene.add(this.galaxyPoints);

    // Radiant Galactic Singularity Core
    const coreGeo = new THREE.SphereGeometry(3.5, 24, 24);
    const coreMat = new THREE.MeshBasicMaterial({ color: 0xFFF9EF, transparent: true, opacity: 0.95 });
    this.galaxyCoreMesh = new THREE.Mesh(coreGeo, coreMat);
    this.scene.add(this.galaxyCoreMesh);

    const auraGeo = new THREE.SphereGeometry(7.5, 24, 24);
    const auraMat = new THREE.MeshBasicMaterial({
      color: 0xF4E2BB,
      transparent: true,
      opacity: 0.38,
      blending: THREE.AdditiveBlending
    });
    this.coreAuraMesh = new THREE.Mesh(auraGeo, auraMat);
    this.scene.add(this.coreAuraMesh);
  }

  create3DStars() {
    const starData = this.config.stars || [];
    this.starMeshes = [];
    this.starGroups = [];
    this.orbitRingGroups = [];

    starData.forEach((st, idx) => {
      const group = new THREE.Group();

      const isZenith = st.isZenith || st.category?.includes("Nose") || idx === 0 || idx === 10;
      const radius = isZenith ? 1.7 : 1.3;

      // Inner Glowing Stellar Core Geometry
      const sphereGeo = new THREE.IcosahedronGeometry(radius, 3);
      const sphereMat = new THREE.MeshStandardMaterial({
        color: st.color || 0xF4E2BB,
        emissive: st.color || 0xC5A46D,
        emissiveIntensity: 1.5,
        roughness: 0.15,
        metalness: 0.85
      });

      const sphereMesh = new THREE.Mesh(sphereGeo, sphereMat);
      sphereMesh.userData = { starData: st, index: idx };
      group.add(sphereMesh);

      // Pulsing Atmospheric Corona Halo
      const haloGeo = new THREE.RingGeometry(radius * 1.3, radius * 2.8, 28);
      const haloMat = new THREE.MeshBasicMaterial({
        color: st.color || 0xF4E2BB,
        transparent: true,
        opacity: 0.6,
        side: THREE.DoubleSide,
        blending: THREE.AdditiveBlending
      });
      const haloMesh = new THREE.Mesh(haloGeo, haloMat);
      haloMesh.rotation.x = Math.PI / 2;
      group.add(haloMesh);

      // Orbiting Stardust Rings
      const orbitGeo = new THREE.TorusGeometry(radius * 3.0, 0.07, 8, 40);
      const orbitMat = new THREE.MeshBasicMaterial({
        color: 0xF4E2BB,
        transparent: true,
        opacity: 0.7,
        blending: THREE.AdditiveBlending
      });
      const orbitMesh = new THREE.Mesh(orbitGeo, orbitMat);
      orbitMesh.rotation.x = Math.random() * Math.PI;
      orbitMesh.rotation.y = Math.random() * Math.PI;
      group.add(orbitMesh);
      this.orbitRingGroups.push(orbitMesh);

      // Generous Invisible Hit-Test Sphere for Mobile Tap
      const hitGeo = new THREE.SphereGeometry(radius * 3.2, 12, 12);
      const hitMat = new THREE.MeshBasicMaterial({ visible: false });
      const hitMesh = new THREE.Mesh(hitGeo, hitMat);
      hitMesh.userData = { starData: st, index: idx, parentMesh: sphereMesh };
      group.add(hitMesh);

      // Position along the galaxy spiral
      const pos = st.position || [0, 0, 0];
      group.position.set(pos[0], pos[1] * 0.45, pos[2]);

      this.scene.add(group);
      this.starMeshes.push(hitMesh);
      this.starGroups.push({ group, sphereMesh, haloMesh, orbitMesh, starData: st });
    });
  }

  createFlowingConstellationLinesWithPhotons() {
    const starData = this.config.stars || [];
    if (starData.length < 2) return;

    this.constellationLines = [];
    this.photonPulses = [];

    // Deliberate flowing constellation connections
    const connections = [
      [0, 1], [1, 2], [2, 3], [3, 4], [4, 5],
      [5, 6], [6, 7], [7, 8], [8, 9], [9, 10], [10, 11], [11, 0],
      [1, 6], [3, 8], [0, 5] // Inner harmonic branches
    ];

    connections.forEach(([fromIdx, toIdx]) => {
      if (fromIdx >= starData.length || toIdx >= starData.length) return;

      const p1 = starData[fromIdx].position;
      const p2 = starData[toIdx].position;
      const v1 = new THREE.Vector3(p1[0], p1[1] * 0.45, p1[2]);
      const v2 = new THREE.Vector3(p2[0], p2[1] * 0.45, p2[2]);

      const lineGeo = new THREE.BufferGeometry().setFromPoints([v1, v2]);
      const lineMat = new THREE.LineBasicMaterial({
        color: 0xC5A46D,
        transparent: true,
        opacity: 0.45,
        blending: THREE.AdditiveBlending
      });

      const line = new THREE.Line(lineGeo, lineMat);
      this.scene.add(line);
      this.constellationLines.push(line);

      // Animated Moving Light Photon Pulses along the connection
      const photonGeo = new THREE.SphereGeometry(0.35, 8, 8);
      const photonMat = new THREE.MeshBasicMaterial({
        color: 0xFFF9EF,
        transparent: true,
        opacity: 0.9,
        blending: THREE.AdditiveBlending
      });
      const photon = new THREE.Mesh(photonGeo, photonMat);
      photon.userData = {
        start: v1,
        end: v2,
        progress: Math.random(),
        speed: 0.18 + Math.random() * 0.15
      };
      this.scene.add(photon);
      this.photonPulses.push(photon);
    });
  }

  setupInteractionListeners() {
    let pointerDownPos = { x: 0, y: 0 };
    let isDown = false;
    let didDrag = false;

    // Pointer Events for Cross-Device Interaction & Touch Gestures
    this.container.addEventListener("pointerdown", (e) => {
      isDown = true;
      didDrag = false;
      pointerDownPos = { x: e.clientX, y: e.clientY };
      this.updatePointerCoords(e);
    });

    this.container.addEventListener("pointermove", (e) => {
      this.updatePointerCoords(e);
      if (isDown) {
        const dist = Math.hypot(e.clientX - pointerDownPos.x, e.clientY - pointerDownPos.y);
        if (dist > 8) {
          didDrag = true;
          // Smooth Orbit Drag
          const dx = e.clientX - pointerDownPos.x;
          const dy = e.clientY - pointerDownPos.y;
          this.orbitAngles.theta += dx * 0.0003;
          this.orbitAngles.phi = Math.max(0.1, Math.min(1.2, this.orbitAngles.phi - dy * 0.0003));
          pointerDownPos = { x: e.clientX, y: e.clientY };
        }
      }
    });

    this.container.addEventListener("pointerup", (e) => {
      if (!isDown) return;
      isDown = false;

      // If dragged > 8px, it was an orbit swipe, not a star tap
      if (didDrag) return;

      this.updatePointerCoords(e);
      this.raycaster.setFromCamera(this.mouse, this.camera);
      const intersects = this.raycaster.intersectObjects(this.starMeshes);

      if (intersects.length > 0) {
        const clickedMesh = intersects[0].object;
        const index = clickedMesh.userData.index;
        this.selectStar(index);
      }
    });

    // Touch Pinch to Zoom on mobile
    this.container.addEventListener("touchstart", (e) => {
      if (e.touches.length === 2) {
        this.touchPinchDistance = Math.hypot(
          e.touches[0].clientX - e.touches[1].clientX,
          e.touches[0].clientY - e.touches[1].clientY
        );
      }
    }, { passive: true });

    this.container.addEventListener("touchmove", (e) => {
      if (e.touches.length === 2 && this.touchPinchDistance) {
        const currentDist = Math.hypot(
          e.touches[0].clientX - e.touches[1].clientX,
          e.touches[0].clientY - e.touches[1].clientY
        );
        const factor = (this.touchPinchDistance - currentDist) * 0.15;
        this.camera.position.z = Math.max(25, Math.min(130, this.camera.position.z + factor));
        this.touchPinchDistance = currentDist;
      }
    }, { passive: true });

    this.container.addEventListener("touchend", () => {
      this.touchPinchDistance = null;
    }, { passive: true });

    // Reset Camera Button
    if (this.resetBtn) {
      this.resetBtn.addEventListener("click", () => this.resetCamera());
    }

    // Modal Close Button & Backdrop
    if (this.cardModal) {
      const closeBtn = this.cardModal.querySelector(".constellation-modal-close");
      if (closeBtn) {
        closeBtn.addEventListener("click", () => {
          this.closeCardModal();
          this.resetCamera();
        });
      }
      this.cardModal.addEventListener("click", (e) => {
        if (e.target === this.cardModal) {
          this.closeCardModal();
          this.resetCamera();
        }
      });
    }

    // ESC key closes modal
    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && this.cardModal?.classList.contains("active")) {
        this.closeCardModal();
        this.resetCamera();
      }
    });
  }

  updatePointerCoords(e) {
    const rect = this.container.getBoundingClientRect();
    this.mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    this.mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
    this.mouseParallax.x = (e.clientX / window.innerWidth - 0.5) * 8;
    this.mouseParallax.y = (e.clientY / window.innerHeight - 0.5) * 8;
  }

  selectStar(index) {
    if (index < 0 || index >= this.starGroups.length) return;
    this.selectedStarIndex = index;
    this.exploredStars.add(index);

    const targetGroup = this.starGroups[index];
    const st = targetGroup.starData;

    // Cinematic Camera Fly-To: move smoothly to frame the star
    const p = targetGroup.group.position;
    this.targetCameraPos.set(p.x, p.y + 4.5, p.z + 16);
    this.targetLookAt.set(p.x, p.y, p.z);

    // Radiate selected star
    targetGroup.sphereMesh.scale.set(1.4, 1.4, 1.4);
    targetGroup.haloMesh.material.opacity = 0.95;

    // Show Personal Compliment in Floating Glass Panel
    this.showCardModal(st, index);
    this.updateExplorationProgress();

    // Check for Grand Final Constellation Unlock
    if (this.exploredStars.size >= this.starGroups.length) {
      this.triggerFinalConstellationUnlock();
    }
  }

  showCardModal(st, index) {
    if (!this.cardModal) return;

    const roman = this.cardModal.querySelector(".modal-star-roman");
    const title = this.cardModal.querySelector(".modal-star-title");
    const phrase = this.cardModal.querySelector(".modal-star-phrase");
    const note = this.cardModal.querySelector(".modal-star-note");
    const category = this.cardModal.querySelector(".modal-star-category");

    if (roman) roman.textContent = `STAR ${String(index + 1).padStart(2, "0")} OF 12`;
    if (title) title.textContent = st.category || "Little Things I Notice";
    if (phrase) phrase.textContent = `“${st.personalPhrase || st.subtitle || ''}”`;
    if (note) note.textContent = st.personalNote || st.description || '';
    if (category) category.textContent = st.attribute || "A PRIVATE TRIBUTE TO BHAVYA";

    this.cardModal.classList.add("active");
  }

  closeCardModal() {
    if (this.cardModal) {
      this.cardModal.classList.remove("active");
    }
  }

  resetCamera() {
    this.targetCameraPos.copy(this.defaultCameraPos);
    this.targetLookAt.set(0, 0, 0);
    this.selectedStarIndex = -1;

    // Reset star scales
    this.starGroups.forEach(sg => {
      sg.sphereMesh.scale.set(1, 1, 1);
      sg.haloMesh.material.opacity = 0.6;
    });
  }

  renderExplorationCounter() {
    let counter = document.getElementById("constellation-progress-counter");
    if (!counter && this.container) {
      counter = document.createElement("div");
      counter.id = "constellation-progress-counter";
      counter.className = "constellation-counter-pill";
      counter.innerHTML = `
        <span class="counter-star-icon">✦</span>
        <span class="counter-text" id="constellation-counter-text">EXPLORED: 0 / 12 STARS</span>
        <div class="counter-progress-bar"><div class="counter-progress-fill" id="constellation-progress-fill"></div></div>
      `;
      this.container.appendChild(counter);
    }
  }

  updateExplorationProgress() {
    const textEl = document.getElementById("constellation-counter-text");
    const fillEl = document.getElementById("constellation-progress-fill");
    const total = this.starGroups.length || 12;
    const count = this.exploredStars.size;

    if (textEl) textEl.textContent = `EXPLORED: ${count} / ${total} STARS`;
    if (fillEl) fillEl.style.width = `${(count / total) * 100}%`;

    // Highlight active quick nav pill
    document.querySelectorAll(".star-quick-nav-pill").forEach(pill => {
      const idx = parseInt(pill.dataset.index, 10);
      if (this.exploredStars.has(idx)) {
        pill.classList.add("explored");
      }
      pill.classList.toggle("active", idx === this.selectedStarIndex);
    });
  }

  renderQuickNav() {
    if (!this.quickNav) return;
    const stars = this.config.stars || [];
    this.quickNav.innerHTML = stars.map((st, idx) => `
      <button class="star-quick-nav-pill" data-index="${idx}" aria-label="Focus star ${idx + 1}: ${st.category}">
        <span class="pill-dot"></span>
        <span class="pill-name">${st.category || `Star ${idx + 1}`}</span>
      </button>
    `).join("");

    this.quickNav.addEventListener("click", (e) => {
      const pill = e.target.closest(".star-quick-nav-pill");
      if (pill) {
        const idx = parseInt(pill.dataset.index, 10);
        this.selectStar(idx);
      }
    });
  }

  triggerFinalConstellationUnlock() {
    // Grand Final Revelation (Part 2.4)
    let finaleBanner = document.getElementById("constellation-finale-banner");
    if (!finaleBanner && this.container) {
      finaleBanner = document.createElement("div");
      finaleBanner.id = "constellation-finale-banner";
      finaleBanner.className = "constellation-celebration-toast";
      finaleBanner.innerHTML = `
        <div class="celebration-badge">✦ THE COMPLETED UNIVERSE ✦</div>
        <div class="celebration-title">AN ETERNAL CONSTELLATION FOR BHAVYA</div>
        <div class="celebration-text">&ldquo;I could keep finding new things to love about you, and still never finish describing you.&rdquo;</div>
      `;
      this.container.appendChild(finaleBanner);
    }

    if (finaleBanner) {
      finaleBanner.classList.add("active");
    }

    // Illuminate all constellation lines to gold brightness
    this.constellationLines.forEach(line => {
      line.material.color.setHex(0xF4E2BB);
      line.material.opacity = 0.85;
    });
  }

  setupThemeListener() {
    window.addEventListener("artOfHerThemeChange", (e) => {
      const themeData = e.detail?.theme;
      if (!themeData?.threeColors) return;

      const tc = themeData.threeColors;

      // Update ambient light
      const ambient = this.scene.getObjectByName("ambientLight");
      if (ambient) ambient.color.setHex(tc.ambient);

      // Update Galaxy Core & Corona
      if (this.galaxyCoreMesh) this.galaxyCoreMesh.material.color.setHex(tc.starCore);
      if (this.coreAuraMesh) this.coreAuraMesh.material.color.setHex(tc.starHalo);

      // Update Galaxy Points
      if (this.galaxyPoints) {
        const cols = this.galaxyPoints.geometry.attributes.color;
        const c1 = new THREE.Color(tc.galaxyVortex[0]);
        const c2 = new THREE.Color(tc.galaxyVortex[1]);
        const c3 = new THREE.Color(tc.galaxyVortex[2]);

        for (let i = 0; i < cols.count; i++) {
          const t = i / cols.count;
          const col = t < 0.3 ? c1 : t < 0.7 ? c2 : c3;
          cols.setXYZ(i, col.r, col.g, col.b);
        }
        cols.needsUpdate = true;
      }
    });
  }

  setupIntersectionObserver() {
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        this.isVisible = entry.isIntersecting;
      });
    }, { threshold: 0.05 });

    this.observer.observe(this.container);
  }

  onWindowResize() {
    if (!this.container || !this.camera || !this.renderer) return;
    const width = this.container.clientWidth;
    const height = this.container.clientHeight || (window.innerHeight * 0.85);

    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
  }

  animate() {
    this.animationId = requestAnimationFrame(() => this.animate());

    if (!this.isVisible) return;

    const delta = this.clock.getDelta();
    const time = this.clock.getElapsedTime();

    // 1. Gently Rotate Spiral Galaxy Vortex (Frame-rate independent)
    if (this.galaxyPoints) {
      this.galaxyPoints.rotation.z += 0.04 * delta;
    }

    // 2. Rotate Volumetric Nebula Clouds
    this.nebulaMeshes.forEach(mesh => {
      mesh.rotation.z += mesh.userData.rotSpeed;
    });

    // 3. Orbiting Stardust Rings
    this.orbitRingGroups.forEach((ring, idx) => {
      ring.rotation.z += (0.2 + (idx % 3) * 0.1) * delta;
      ring.rotation.x += (0.15 + (idx % 2) * 0.08) * delta;
    });

    // 4. Animate Moving Light Photon Pulses along Constellation Lines
    this.photonPulses.forEach(photon => {
      const d = photon.userData;
      d.progress = (d.progress + d.speed * delta) % 1.0;
      photon.position.lerpVectors(d.start, d.end, d.progress);
      photon.scale.setScalar(0.8 + Math.sin(time * 5 + d.progress * 10) * 0.3);
    });

    // 5. Star Corona Pulsation
    this.starGroups.forEach((sg, idx) => {
      const pulse = 1.0 + Math.sin(time * 2.2 + idx * 0.6) * 0.12;
      sg.haloMesh.scale.set(pulse, pulse, pulse);
    });

    // 6. Smooth Cinematic Camera Lerp (Frame-rate independent)
    const lerpFactor = 1 - Math.exp(-3.8 * delta);
    this.camera.position.x += (this.targetCameraPos.x + this.mouseParallax.x - this.camera.position.x) * lerpFactor;
    this.camera.position.y += (this.targetCameraPos.y - this.mouseParallax.y - this.camera.position.y) * lerpFactor;
    this.camera.position.z += (this.targetCameraPos.z - this.camera.position.z) * lerpFactor;

    this.currentLookAt.lerp(this.targetLookAt, lerpFactor);
    this.camera.lookAt(this.currentLookAt);

    this.renderer.render(this.scene, this.camera);
  }
}

window.Constellation3DUniverse = Constellation3DUniverse;
