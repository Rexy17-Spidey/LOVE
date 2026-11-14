/**
 * ==============================================================================
 * THE ART OF HER — SECTION 5: MASTERPIECE 3D CONSTELLATION UNIVERSE
 * Inspired by Reference Image 2: Swirling Emerald & Gold Spiral Galaxy Vortex
 *
 * Visual Features:
 * - High-Fidelity Procedural Textures (Soft Gaussian Glows, Anamorphic Star Flares,
 *   Ethereal Cosmic Nebula Clouds)
 * - 8,500+ Multi-Layered Stardust Particles along Logarithmic Spiral Arms
 * - Authentic Differential Keplerian Rotation (Vortex core spins faster than arms)
 * - Concentric Swirling Dust Rings & Radiant Central Golden Core Vortex Eye
 * - Volumetric Nebula Filament Discs with Additive Blending & Depth Variation
 * - 12 Dedicated Tribute Stars for Bhavya with Compound Cores, Pulsing Halos,
 *   Orbiting Stardust Rings & Invisible Generous Hit-Spheres for Flawless Touch
 * - Glowing Constellation Pathways with Animated Traveling Photons
 * - Mobile Touch Handling (Non-trapping pan-y vertical scrolling + smooth orbit gestures)
 * - Instant Dynamic Synchronization with the 7 Exhibition Themes
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

    // Procedural Textures
    this.textures = {
      glow: null,
      flare: null,
      nebula: null
    };

    // Mesh & Object References
    this.starMeshes = [];
    this.starHitMeshes = [];
    this.starGroups = [];
    this.haloSprites = [];
    this.orbitRingGroups = [];
    this.nebulaMeshes = [];
    this.constellationLines = [];
    this.photonPulses = [];
    this.galaxyPoints = null;
    this.galaxyGeometry = null;
    this.galaxyPositions = null;
    this.galaxyAngles = null;
    this.galaxyRadii = null;
    this.galaxySpeeds = null;
    this.galaxyCoreMesh = null;
    this.coreAuraSprites = [];
    this.vortexRings = [];
    this.backgroundStarPoints = null;

    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2(-999, -999);

    // Camera Navigation Positions
    this.defaultCameraPos = new THREE.Vector3(0, 36, 78);
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
    this.orbitAngles = { theta: 0, phi: 0.42 };
    this.touchPinchDistance = null;

    this.clock = new THREE.Clock();
    this.isVisible = true;
    this.observer = null;

    this.init();
  }

  /* ----------------------------------------------------------------------------
   * 1. PROCEDURAL TEXTURE GENERATORS (Eliminates Square Particles Completely)
   * ---------------------------------------------------------------------------- */
  generateProceduralTextures() {
    // A. Soft Radial Glow Mote Texture (Pure white core, warm gold/teal falloff)
    const canvasGlow = document.createElement("canvas");
    canvasGlow.width = 128;
    canvasGlow.height = 128;
    const ctxG = canvasGlow.getContext("2d");
    const gradG = ctxG.createRadialGradient(64, 64, 0, 64, 64, 64);
    gradG.addColorStop(0.0, "rgba(255, 255, 255, 1.0)");
    gradG.addColorStop(0.18, "rgba(255, 248, 225, 0.95)");
    gradG.addColorStop(0.42, "rgba(20, 213, 200, 0.55)");
    gradG.addColorStop(0.70, "rgba(8, 127, 120, 0.15)");
    gradG.addColorStop(1.0, "rgba(0, 0, 0, 0.0)");
    ctxG.fillStyle = gradG;
    ctxG.fillRect(0, 0, 128, 128);
    this.textures.glow = new THREE.CanvasTexture(canvasGlow);

    // B. Anamorphic Starlight Flare Texture (Radial center + 4 delicate cross spikes)
    const canvasFlare = document.createElement("canvas");
    canvasFlare.width = 256;
    canvasFlare.height = 256;
    const ctxF = canvasFlare.getContext("2d");
    const cx = 128;
    const cy = 128;

    // Cross spikes
    const gradH = ctxF.createLinearGradient(0, cy, 256, cy);
    gradH.addColorStop(0.0, "rgba(255, 255, 255, 0)");
    gradH.addColorStop(0.45, "rgba(255, 245, 210, 0.35)");
    gradH.addColorStop(0.5, "rgba(255, 255, 255, 1.0)");
    gradH.addColorStop(0.55, "rgba(255, 245, 210, 0.35)");
    gradH.addColorStop(1.0, "rgba(255, 255, 255, 0)");
    ctxF.fillStyle = gradH;
    ctxF.fillRect(0, cy - 2, 256, 4);

    const gradV = ctxF.createLinearGradient(cx, 0, cx, 256);
    gradV.addColorStop(0.0, "rgba(255, 255, 255, 0)");
    gradV.addColorStop(0.45, "rgba(255, 245, 210, 0.35)");
    gradV.addColorStop(0.5, "rgba(255, 255, 255, 1.0)");
    gradV.addColorStop(0.55, "rgba(255, 245, 210, 0.35)");
    gradV.addColorStop(1.0, "rgba(255, 255, 255, 0)");
    ctxF.fillStyle = gradV;
    ctxF.fillRect(cx - 2, 0, 4, 256);

    // Soft central glow
    const gradFC = ctxF.createRadialGradient(cx, cy, 0, cx, cy, 80);
    gradFC.addColorStop(0.0, "rgba(255, 255, 255, 1.0)");
    gradFC.addColorStop(0.2, "rgba(244, 226, 187, 0.8)");
    gradFC.addColorStop(0.5, "rgba(12, 179, 167, 0.3)");
    gradFC.addColorStop(1.0, "rgba(0, 0, 0, 0)");
    ctxF.fillStyle = gradFC;
    ctxF.beginPath();
    ctxF.arc(cx, cy, 80, 0, Math.PI * 2);
    ctxF.fill();
    this.textures.flare = new THREE.CanvasTexture(canvasFlare);

    // C. Ethereal Nebula Cloud Texture (Multi-octave radial soft puff)
    const canvasNeb = document.createElement("canvas");
    canvasNeb.width = 256;
    canvasNeb.height = 256;
    const ctxN = canvasNeb.getContext("2d");
    const gradN = ctxN.createRadialGradient(128, 128, 4, 128, 128, 120);
    gradN.addColorStop(0.0, "rgba(255, 255, 255, 0.9)");
    gradN.addColorStop(0.25, "rgba(244, 226, 187, 0.65)");
    gradN.addColorStop(0.55, "rgba(12, 179, 167, 0.35)");
    gradN.addColorStop(0.85, "rgba(6, 78, 70, 0.12)");
    gradN.addColorStop(1.0, "rgba(0, 0, 0, 0.0)");
    ctxN.fillStyle = gradN;
    ctxN.beginPath();
    ctxN.arc(128, 128, 120, 0, Math.PI * 2);
    ctxN.fill();
    this.textures.nebula = new THREE.CanvasTexture(canvasNeb);
  }

  /* ----------------------------------------------------------------------------
   * 2. INITIALIZATION & SCENE SETUP
   * ---------------------------------------------------------------------------- */
  init() {
    if (!this.container || typeof THREE === "undefined" || !this.config) {
      console.warn("Three.js not loaded or constellation container missing.");
      return;
    }

    this.generateProceduralTextures();
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
    this.scene.fog = new THREE.FogExp2(0x01110e, 0.0032);

    this.camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1600);
    this.camera.position.copy(this.defaultCameraPos);
    this.camera.lookAt(this.targetLookAt);

    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
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

    const centralLight = new THREE.PointLight(0xF4E2BB, 3.2, 260);
    centralLight.position.set(0, 10, 0);
    centralLight.name = "centralLight";
    this.scene.add(centralLight);

    window.addEventListener("resize", () => this.onWindowResize(), { passive: true });
  }

  /* ----------------------------------------------------------------------------
   * 3. DEEP COSMIC BACKGROUND (6,000+ Multi-Layer Twinkling Stars with Glow)
   * ---------------------------------------------------------------------------- */
  createDeepCosmicBackground() {
    const count = 5500;
    const geo = new THREE.BufferGeometry();
    const pos = new Float32Array(count * 3);
    const cols = new Float32Array(count * 3);
    const sizes = new Float32Array(count);

    const c1 = new THREE.Color(0xFFF9EF); // Starlight white
    const c2 = new THREE.Color(0xF4E2BB); // Warm gold
    const c3 = new THREE.Color(0x14D5C8); // Brilliant teal
    const c4 = new THREE.Color(0x9ED8D0); // Pale mint

    for (let i = 0; i < count; i++) {
      const idx = i * 3;
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = 240 + Math.random() * 560;

      pos[idx] = r * Math.sin(phi) * Math.cos(theta);
      pos[idx + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[idx + 2] = r * Math.cos(phi);

      const dice = Math.random();
      const col = dice < 0.4 ? c1 : dice < 0.7 ? c2 : dice < 0.88 ? c3 : c4;
      cols[idx] = col.r;
      cols[idx + 1] = col.g;
      cols[idx + 2] = col.b;

      sizes[i] = Math.random() * 2.2 + 0.8;
    }

    geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    geo.setAttribute("color", new THREE.BufferAttribute(cols, 3));

    const mat = new THREE.PointsMaterial({
      size: 2.2,
      map: this.textures.glow,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });

    this.backgroundStarPoints = new THREE.Points(geo, mat);
    this.scene.add(this.backgroundStarPoints);
  }

  /* ----------------------------------------------------------------------------
   * 4. VOLUMETRIC NEBULA CLOUDS (Deep Space Filaments Matching Ref Image 2)
   * ---------------------------------------------------------------------------- */
  createVolumetricNebulaClouds() {
    this.nebulaMeshes = [];
    const cloudCount = 18;
    const colors = [0x087F78, 0x064E46, 0xC5A46D, 0x0cb3a7, 0x022520];

    for (let i = 0; i < cloudCount; i++) {
      const col = colors[i % colors.length];
      const mat = new THREE.SpriteMaterial({
        map: this.textures.nebula,
        color: col,
        transparent: true,
        opacity: 0.16 + Math.random() * 0.18,
        blending: THREE.AdditiveBlending,
        depthWrite: false
      });

      const sprite = new THREE.Sprite(mat);
      const angle = (i / cloudCount) * Math.PI * 2 + (Math.random() - 0.5) * 0.6;
      const dist = 18 + Math.random() * 46;

      sprite.position.set(
        Math.cos(angle) * dist,
        (Math.random() - 0.5) * 16,
        Math.sin(angle) * dist
      );

      const scale = 26 + Math.random() * 32;
      sprite.scale.set(scale, scale, 1);
      sprite.userData = {
        baseOpacity: mat.opacity,
        rotSpeed: (Math.random() - 0.5) * 0.0004,
        angle: angle,
        dist: dist
      };

      this.scene.add(sprite);
      this.nebulaMeshes.push(sprite);
    }
  }

  /* ----------------------------------------------------------------------------
   * 5. LOGARITHMIC SPIRAL GALAXY VORTEX (Matches Reference Image 2)
   * ---------------------------------------------------------------------------- */
  createSpiralGalaxyVortex() {
    const particleCount = 8500;
    this.galaxyGeometry = new THREE.BufferGeometry();
    this.galaxyPositions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    this.galaxyAngles = new Float32Array(particleCount);
    this.galaxyRadii = new Float32Array(particleCount);
    this.galaxySpeeds = new Float32Array(particleCount);

    const arms = 3;
    const maxRadius = 78;
    const spinFactor = 2.8;

    // Palette matching Reference Image 2:
    // Brilliant Gold Core -> Golden Amber -> Radiant Teal -> Deep Emerald
    const goldCore = new THREE.Color(0xFFFDF5);
    const goldMid = new THREE.Color(0xF6E27A);
    const goldAmber = new THREE.Color(0xECC875);
    const vibrantTeal = new THREE.Color(0x14D5C8);
    const emeraldTeal = new THREE.Color(0x087F78);
    const deepForest = new THREE.Color(0x064E46);

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      // Exponential distribution towards center
      const rRatio = Math.pow(Math.random(), 1.85);
      const r = 2.5 + rRatio * maxRadius;

      const armIndex = i % arms;
      const armAngle = (armIndex / arms) * Math.PI * 2;
      const angle = armAngle + Math.log(r + 1.0) * spinFactor;

      const scatterX = (Math.random() - 0.5) * (2.0 + r * 0.16);
      const scatterZ = (Math.random() - 0.5) * (2.0 + r * 0.16);
      const scatterY = (Math.random() - 0.5) * (1.2 + (1 - r / maxRadius) * 5.0);

      this.galaxyPositions[i3] = Math.cos(angle) * r + scatterX;
      this.galaxyPositions[i3 + 1] = scatterY;
      this.galaxyPositions[i3 + 2] = Math.sin(angle) * r + scatterZ;

      this.galaxyAngles[i] = angle;
      this.galaxyRadii[i] = r;
      // Differential galactic rotation: inner particles rotate faster
      this.galaxySpeeds[i] = 0.18 / (Math.sqrt(r) + 1.2);

      // Color mapping
      let col;
      if (r < 10) {
        col = goldCore.clone().lerp(goldMid, r / 10);
      } else if (r < 22) {
        col = goldMid.clone().lerp(goldAmber, (r - 10) / 12);
      } else if (r < 44) {
        col = goldAmber.clone().lerp(vibrantTeal, (r - 22) / 22);
      } else {
        col = emeraldTeal.clone().lerp(deepForest, (r - 44) / (maxRadius - 44));
      }

      // Add delicate golden starlight sparks
      if (Math.random() < 0.12) {
        col = goldCore;
      }

      colors[i3] = col.r;
      colors[i3 + 1] = col.g;
      colors[i3 + 2] = col.b;
    }

    this.galaxyGeometry.setAttribute("position", new THREE.BufferAttribute(this.galaxyPositions, 3));
    this.galaxyGeometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const galaxyMat = new THREE.PointsMaterial({
      size: 2.6,
      map: this.textures.glow,
      vertexColors: true,
      transparent: true,
      opacity: 0.92,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });

    this.galaxyPoints = new THREE.Points(this.galaxyGeometry, galaxyMat);
    this.scene.add(this.galaxyPoints);

    // B. Radiant Central Core Vortex Eye (Matches central golden swirl in Image 2)
    const coreMat = new THREE.MeshBasicMaterial({
      color: 0xFFF9EF,
      transparent: true,
      opacity: 0.95
    });
    this.galaxyCoreMesh = new THREE.Mesh(new THREE.SphereGeometry(2.4, 24, 24), coreMat);
    this.scene.add(this.galaxyCoreMesh);

    // Multi-layer Core Aura Sprites
    const auraColors = [0xFFFDF5, 0xF6E27A, 0x14D5C8];
    const auraScales = [16, 28, 42];
    auraColors.forEach((ac, idx) => {
      const sMat = new THREE.SpriteMaterial({
        map: this.textures.flare,
        color: ac,
        transparent: true,
        opacity: 0.65 / (idx + 1),
        blending: THREE.AdditiveBlending,
        depthWrite: false
      });
      const sprite = new THREE.Sprite(sMat);
      sprite.scale.set(auraScales[idx], auraScales[idx], 1);
      this.scene.add(sprite);
      this.coreAuraSprites.push(sprite);
    });

    // C. Concentric Swirling Golden Dust Rings in the Eye of the Vortex
    this.vortexRings = [];
    for (let rIdx = 0; rIdx < 4; rIdx++) {
      const ringRadius = 4.5 + rIdx * 3.8;
      const ringGeo = new THREE.RingGeometry(ringRadius - 0.25, ringRadius + 0.25, 48);
      ringGeo.rotateX(-Math.PI / 2);
      const ringMat = new THREE.MeshBasicMaterial({
        color: rIdx < 2 ? 0xF4E2BB : 0x0cb3a7,
        transparent: true,
        opacity: 0.22 - rIdx * 0.04,
        side: THREE.DoubleSide,
        blending: THREE.AdditiveBlending,
        depthWrite: false
      });
      const ringMesh = new THREE.Mesh(ringGeo, ringMat);
      ringMesh.userData = { rotSpeed: (0.003 - rIdx * 0.0006) * (rIdx % 2 === 0 ? 1 : -1) };
      this.scene.add(ringMesh);
      this.vortexRings.push(ringMesh);
    }
  }

  /* ----------------------------------------------------------------------------
   * 6. 12 TRIBUTE STARS (Compound Stellar Nodes for Bhavya)
   * ---------------------------------------------------------------------------- */
  create3DStars() {
    const starData = this.config.stars || [];
    this.starMeshes = [];
    this.starHitMeshes = [];
    this.starGroups = [];
    this.haloSprites = [];
    this.orbitRingGroups = [];

    starData.forEach((st, idx) => {
      const group = new THREE.Group();
      const pos = st.position || [0, 0, 0];
      group.position.set(pos[0], pos[1], pos[2]);

      const baseColor = st.color || 0xF4E2BB;
      const isZenith = Boolean(st.isZenith);

      // 1. Core Luminous Sphere
      const coreSize = isZenith ? 1.05 : 0.72;
      const coreMat = new THREE.MeshStandardMaterial({
        color: 0xFFFFFF,
        emissive: baseColor,
        emissiveIntensity: isZenith ? 1.4 : 1.0,
        roughness: 0.15
      });
      const coreMesh = new THREE.Mesh(new THREE.SphereGeometry(coreSize, 20, 20), coreMat);
      coreMesh.userData = { index: idx, data: st };
      group.add(coreMesh);
      this.starMeshes.push(coreMesh);

      // 2. Anamorphic Starlight Flare Halo (Pulsing Sprite)
      const haloMat = new THREE.SpriteMaterial({
        map: this.textures.flare,
        color: baseColor,
        transparent: true,
        opacity: isZenith ? 0.95 : 0.80,
        blending: THREE.AdditiveBlending,
        depthWrite: false
      });
      const haloSprite = new THREE.Sprite(haloMat);
      const haloScale = isZenith ? 9.5 : 6.8;
      haloSprite.scale.set(haloScale, haloScale, 1);
      group.add(haloSprite);
      this.haloSprites.push(haloSprite);

      // 3. Orbiting Stardust Rings with Satellite Motes
      const ringGroup = new THREE.Group();
      const ringRadius = coreSize * 2.8;
      const ringGeo = new THREE.RingGeometry(ringRadius - 0.08, ringRadius + 0.08, 36);
      ringGeo.rotateX(Math.PI / 2.4);

      const ringMat = new THREE.MeshBasicMaterial({
        color: baseColor,
        transparent: true,
        opacity: 0.35,
        side: THREE.DoubleSide,
        blending: THREE.AdditiveBlending,
        depthWrite: false
      });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ringGroup.add(ring);

      // Tiny satellite jewel
      const satGeo = new THREE.SphereGeometry(0.18, 8, 8);
      const satMat = new THREE.MeshBasicMaterial({ color: 0xFFF9EF });
      const sat = new THREE.Mesh(satGeo, satMat);
      sat.position.set(ringRadius, 0, 0);
      ringGroup.add(sat);

      group.add(ringGroup);
      this.orbitRingGroups.push(ringGroup);

      // 4. Generous Invisible Hit-Test Sphere (Crucial for mobile tap-to-focus)
      const hitGeo = new THREE.SphereGeometry(3.6, 8, 8);
      const hitMat = new THREE.MeshBasicMaterial({ visible: false });
      const hitMesh = new THREE.Mesh(hitGeo, hitMat);
      hitMesh.userData = { index: idx, data: st, parentGroup: group };
      group.add(hitMesh);
      this.starHitMeshes.push(hitMesh);

      this.scene.add(group);
      this.starGroups.push(group);
    });
  }

  /* ----------------------------------------------------------------------------
   * 7. FLOWING CONSTELLATION PATHWAYS & TRAVELING LIGHT PHOTONS
   * ---------------------------------------------------------------------------- */
  createFlowingConstellationLinesWithPhotons() {
    const starData = this.config.stars || [];
    if (starData.length < 2) return;

    this.constellationLines = [];
    this.photonPulses = [];

    // Dedicated Celestial Connections
    const connections = [
      [0, 1], [1, 2], [2, 3], [3, 4],
      [4, 5], [5, 6], [6, 7], [7, 8],
      [8, 9], [9, 10], [10, 11], [11, 0],
      [1, 5], [2, 7], [3, 9] // Internal bridges
    ];

    connections.forEach(([iA, iB]) => {
      if (!starData[iA] || !starData[iB]) return;

      const pA = new THREE.Vector3(...starData[iA].position);
      const pB = new THREE.Vector3(...starData[iB].position);

      // Line Segment with subtle gold/teal glow
      const lineGeo = new THREE.BufferGeometry().setFromPoints([pA, pB]);
      const lineMat = new THREE.LineBasicMaterial({
        color: 0xC5A46D,
        transparent: true,
        opacity: 0.32,
        blending: THREE.AdditiveBlending
      });

      const line = new THREE.Line(lineGeo, lineMat);
      this.scene.add(line);
      this.constellationLines.push(line);

      // Animated Traveling Light Photon Sprite
      const photonMat = new THREE.SpriteMaterial({
        map: this.textures.glow,
        color: 0xFFF9EF,
        transparent: true,
        opacity: 0.85,
        blending: THREE.AdditiveBlending,
        depthWrite: false
      });
      const photon = new THREE.Sprite(photonMat);
      photon.scale.set(1.4, 1.4, 1);
      photon.position.copy(pA);

      this.scene.add(photon);
      this.photonPulses.push({
        mesh: photon,
        start: pA,
        end: pB,
        progress: Math.random(),
        speed: 0.003 + Math.random() * 0.003
      });
    });
  }

  /* ----------------------------------------------------------------------------
   * 8. INTERACTION, TOUCH & RAYCASTING (Non-Trapping Native Scroll)
   * ---------------------------------------------------------------------------- */
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
          this.orbitAngles.theta += dx * 0.00035;
          this.orbitAngles.phi = Math.max(0.12, Math.min(1.25, this.orbitAngles.phi - dy * 0.00035));
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
      // Test against generous invisible hit-spheres
      const intersects = this.raycaster.intersectObjects(this.starHitMeshes);

      if (intersects.length > 0) {
        const hitObj = intersects[0].object;
        const index = hitObj.userData.index;
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
        const delta = currentDist - this.touchPinchDistance;
        this.touchPinchDistance = currentDist;

        // Smoothly adjust camera distance
        const dir = this.camera.position.clone().normalize();
        this.targetCameraPos.addScaledVector(dir, -delta * 0.15);
        this.targetCameraPos.clampLength(40, 140);
      }
    }, { passive: true });

    this.container.addEventListener("touchend", () => {
      this.touchPinchDistance = null;
    }, { passive: true });

    // Reset Camera Button
    if (this.resetBtn) {
      this.resetBtn.addEventListener("click", () => this.resetCamera());
    }

    // Modal Escape Key
    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && this.cardModal?.classList.contains("active")) {
        this.closeCardModal();
      }
    });
  }

  updatePointerCoords(e) {
    const rect = this.container.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;
    this.mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    this.mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

    // Mouse Parallax (desktop subtle tilt)
    this.mouseParallax.x = this.mouse.x * 3.5;
    this.mouseParallax.y = this.mouse.y * 2.5;
  }

  /* ----------------------------------------------------------------------------
   * 9. STAR SELECTION & CINEMATIC FLY-TO
   * ---------------------------------------------------------------------------- */
  selectStar(index) {
    const starData = this.config.stars || [];
    const st = starData[index];
    if (!st) return;

    this.selectedStarIndex = index;
    this.exploredStars.add(index);
    this.updateExplorationCounter();

    const starPos = new THREE.Vector3(...st.position);

    // Position camera slightly offset from star
    const offset = new THREE.Vector3(8, 6, 18);
    this.targetCameraPos.copy(starPos).add(offset);
    this.targetLookAt.copy(starPos);

    // Open Glassmorphic Modal Card
    this.openCardModal(st, index);

    // Update Quick Nav Active State
    this.updateQuickNavState();

    // Check for 100% Universe Unlock
    if (this.exploredStars.size === starData.length) {
      this.triggerUniverseCelebration();
    }
  }

  openCardModal(st, index) {
    if (!this.cardModal) return;

    const starCount = this.config.stars?.length || 12;
    this.cardModal.innerHTML = `
      <div class="card-modal-content">
        <button class="card-modal-close" id="constellation-modal-close-btn" aria-label="Close star details">✕</button>
        <div class="card-modal-header">
          <span class="card-modal-badge">✦ STAR ${index + 1} OF ${starCount} ✦</span>
          <span class="card-modal-category">${st.category || "Tribute"}</span>
        </div>
        <h3 class="card-modal-title gold-text">${st.title}</h3>
        <p class="card-modal-tribute">${st.tribute}</p>
        <div class="card-modal-footer">
          <button class="card-modal-nav-btn prev" data-dir="-1" aria-label="Previous star">← Previous</button>
          <button class="card-modal-nav-btn next" data-dir="1" aria-label="Next star">Next Star →</button>
        </div>
      </div>
    `;

    this.cardModal.classList.add("active");

    const closeBtn = document.getElementById("constellation-modal-close-btn");
    if (closeBtn) closeBtn.addEventListener("click", () => this.closeCardModal());

    this.cardModal.querySelectorAll(".card-modal-nav-btn").forEach(btn => {
      btn.addEventListener("click", (e) => {
        const dir = parseInt(e.currentTarget.dataset.dir, 10);
        let nextIdx = (this.selectedStarIndex + dir + starCount) % starCount;
        this.selectStar(nextIdx);
      });
    });
  }

  closeCardModal() {
    if (!this.cardModal) return;
    this.cardModal.classList.remove("active");
    this.selectedStarIndex = -1;
    this.updateQuickNavState();
    this.resetCamera();
  }

  resetCamera() {
    this.targetCameraPos.copy(this.defaultCameraPos);
    this.targetLookAt.set(0, 0, 0);
    this.selectedStarIndex = -1;
    this.updateQuickNavState();
    if (this.cardModal) this.cardModal.classList.remove("active");
  }

  /* ----------------------------------------------------------------------------
   * 10. EXPLORATION COUNTER & QUICK NAVIGATION PILLS
   * ---------------------------------------------------------------------------- */
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

  updateExplorationCounter() {
    const total = this.config.stars?.length || 12;
    const explored = this.exploredStars.size;
    const textEl = document.getElementById("constellation-counter-text");
    const fillEl = document.getElementById("constellation-progress-fill");

    if (textEl) textEl.textContent = `EXPLORED: ${explored} / ${total} STARS`;
    if (fillEl) fillEl.style.width = `${(explored / total) * 100}%`;
  }

  renderQuickNav() {
    if (!this.quickNav) return;
    const starData = this.config.stars || [];

    this.quickNav.innerHTML = starData.map((st, idx) => `
      <button class="star-quick-nav-pill" data-index="${idx}" aria-label="Focus star ${idx + 1}: ${st.category}">
        <span class="pill-dot"></span>
        <span class="pill-name">${st.category || `Star ${idx + 1}`}</span>
      </button>
    `).join("");

    this.quickNav.addEventListener("click", (e) => {
      const btn = e.target.closest(".star-quick-nav-pill");
      if (btn) {
        const idx = parseInt(btn.dataset.index, 10);
        this.selectStar(idx);
      }
    });
  }

  updateQuickNavState() {
    if (!this.quickNav) return;
    const pills = this.quickNav.querySelectorAll(".star-quick-nav-pill");
    pills.forEach((pill, idx) => {
      if (this.exploredStars.has(idx)) {
        pill.classList.add("explored");
      }
      pill.classList.toggle("active", idx === this.selectedStarIndex);
    });
  }

  triggerUniverseCelebration() {
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
      setTimeout(() => finaleBanner.classList.add("active"), 100);
      setTimeout(() => finaleBanner.classList.remove("active"), 9000);
    }
  }

  /* ----------------------------------------------------------------------------
   * 11. THEME SYNCHRONIZATION & PERFORMANCE OBSERVER
   * ---------------------------------------------------------------------------- */
  setupThemeListener() {
    window.addEventListener("artOfHerThemeChange", (e) => {
      const themeData = e.detail?.theme;
      if (!themeData?.threeColors) return;

      const tc = themeData.threeColors;

      // Update ambient light
      const ambient = this.scene?.getObjectByName("ambientLight");
      if (ambient) ambient.color.setHex(tc.ambient);

      // Update galaxy core glow
      if (this.galaxyCoreMesh) {
        this.galaxyCoreMesh.material.color.setHex(tc.accent);
      }
    });
  }

  setupIntersectionObserver() {
    if (!("IntersectionObserver" in window)) return;
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        this.isVisible = entry.isIntersecting;
      });
    }, { threshold: 0.1 });
    this.observer.observe(this.container);
  }

  onWindowResize() {
    if (!this.container || !this.renderer || !this.camera) return;
    const width = this.container.clientWidth;
    const height = this.container.clientHeight;
    if (width === 0 || height === 0) return;

    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
  }

  /* ----------------------------------------------------------------------------
   * 12. 60FPS ANIMATION LOOP
   * ---------------------------------------------------------------------------- */
  animate() {
    this.animationId = requestAnimationFrame(() => this.animate());

    if (!this.isVisible) return;

    const delta = this.clock.getDelta();
    const elapsedTime = this.clock.getElapsedTime();

    // 1. Swirling Spiral Galaxy Vortex Rotation (Differential velocities)
    if (this.galaxyPoints && this.galaxyGeometry) {
      const posAttr = this.galaxyGeometry.attributes.position;
      const count = this.galaxyRadii.length;

      for (let i = 0; i < count; i++) {
        const i3 = i * 3;
        this.galaxyAngles[i] += this.galaxySpeeds[i] * delta * 0.45;
        const angle = this.galaxyAngles[i];
        const r = this.galaxyRadii[i];

        posAttr.array[i3] = Math.cos(angle) * r;
        posAttr.array[i3 + 2] = Math.sin(angle) * r;
      }
      posAttr.needsUpdate = true;
    }

    // 2. Swirling Central Core & Vortex Rings
    if (this.galaxyCoreMesh) {
      this.galaxyCoreMesh.rotation.y += 0.008;
    }
    this.vortexRings.forEach(ring => {
      ring.rotation.z += ring.userData.rotSpeed;
    });

    // 3. Volumetric Nebula Discs Floating & Rotating
    this.nebulaMeshes.forEach(neb => {
      neb.rotation.z += neb.userData.rotSpeed;
    });

    // 4. Pulsing Halos & Orbiting Star Jewels
    this.haloSprites.forEach((halo, idx) => {
      const pulse = 1.0 + Math.sin(elapsedTime * 2.5 + idx) * 0.12;
      const baseScale = idx === 2 ? 9.5 : 6.8; // Star 3 (Zenith) is larger
      halo.scale.set(baseScale * pulse, baseScale * pulse, 1);
    });

    this.orbitRingGroups.forEach((ringGroup, idx) => {
      ringGroup.rotation.z += 0.012 + (idx % 3) * 0.004;
    });

    // 5. Constellation Traveling Light Photons
    this.photonPulses.forEach(photon => {
      photon.progress += photon.speed;
      if (photon.progress > 1.0) photon.progress = 0;
      photon.mesh.position.lerpVectors(photon.start, photon.end, photon.progress);
    });

    // 6. Deep Cosmic Background Slow Drift
    if (this.backgroundStarPoints) {
      this.backgroundStarPoints.rotation.y += 0.00015;
    }

    // 7. Smooth Camera Glide & Parallax
    if (this.selectedStarIndex === -1) {
      // Natural orbital resting motion
      const currentOrbitR = 82;
      const ox = Math.sin(this.orbitAngles.theta) * currentOrbitR * Math.sin(this.orbitAngles.phi);
      const oy = Math.cos(this.orbitAngles.phi) * currentOrbitR;
      const oz = Math.cos(this.orbitAngles.theta) * currentOrbitR * Math.sin(this.orbitAngles.phi);

      this.targetCameraPos.set(
        ox + this.mouseParallax.x,
        Math.max(14, oy + this.mouseParallax.y),
        oz
      );
    }

    this.camera.position.lerp(this.targetCameraPos, 0.045);
    this.currentLookAt.lerp(this.targetLookAt, 0.045);
    this.camera.lookAt(this.currentLookAt);

    this.renderer.render(this.scene, this.camera);
  }

  destroy() {
    if (this.animationId) cancelAnimationFrame(this.animationId);
    if (this.observer) this.observer.disconnect();
    if (this.renderer) {
      this.renderer.dispose();
      this.renderer.domElement?.remove();
    }
  }
}

// Global Export for Exhibition Main Runner
if (typeof window !== "undefined") {
  window.Constellation3DUniverse = Constellation3DUniverse;
}
