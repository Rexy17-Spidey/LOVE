/**
 * ==============================================================================
 * THE MUSEUM OF HER — 3D SPATIAL ATMOSPHERE & LIGHTING ENGINE
 * Three.js Volumetric Spotlight, Drifting Dust Particles & Camera Parallax
 * ==============================================================================
 */

class Museum3DAtmosphere {
  constructor() {
    this.canvas = document.getElementById("museum-3d-canvas");
    this.renderer = null;
    this.scene = null;
    this.camera = null;
    this.dustParticles = null;
    this.spotlightCone = null;
    this.floorPlane = null;
    this.targetMouse = { x: 0, y: 0 };
    this.currentMouse = { x: 0, y: 0 };
    this.cameraTarget = { x: 0, y: 0, z: 8 };
    this.isRendering = false;
    this.rafId = null;
    this.themeColors = {
      spotlight: 0x087f78,
      dust: 0xc5a46d,
      ambient: 0x011412
    };

    // Check prefers-reduced-motion
    this.reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    this.init();
  }

  init() {
    if (!this.canvas || typeof THREE === "undefined" || this.reducedMotion) {
      if (this.canvas) this.canvas.style.display = "none";
      return;
    }

    try {
      this.initScene();
      this.initCamera();
      this.initRenderer();
      this.initVolumetricLighting();
      this.initDustMotes();
      this.initFloorReflector();
      this.bindEvents();
      this.start();
    } catch (e) {
      console.warn("Museum3DAtmosphere: WebGL initialization failed, falling back to CSS lighting.", e);
      if (this.canvas) this.canvas.style.display = "none";
    }
  }

  initScene() {
    this.scene = new THREE.Scene();
    this.scene.fog = new THREE.FogExp2(0x011412, 0.045);
  }

  initCamera() {
    const aspect = window.innerWidth / window.innerHeight;
    this.camera = new THREE.PerspectiveCamera(52, aspect, 0.1, 100);
    this.camera.position.set(0, 0, 8);
  }

  initRenderer() {
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      alpha: true,
      antialias: true,
      powerPreference: "high-performance"
    });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.1;
  }

  initVolumetricLighting() {
    // Ambient Soft Fill
    const ambientLight = new THREE.AmbientLight(this.themeColors.ambient, 0.85);
    this.ambientLight = ambientLight;
    this.scene.add(ambientLight);

    // Warm Directional Art Spotlight
    const spotlight = new THREE.DirectionalLight(0xf4e2bb, 1.4);
    spotlight.position.set(0, 8, 4);
    this.directionalSpot = spotlight;
    this.scene.add(spotlight);

    // Subtle Volumetric Cone (Additive Light Shaft)
    const coneGeo = new THREE.ConeGeometry(4.5, 14, 32, 1, true);
    coneGeo.translate(0, -7, 0);

    const coneMat = new THREE.MeshBasicMaterial({
      color: 0xc5a46d,
      transparent: true,
      opacity: 0.045,
      side: THREE.DoubleSide,
      depthWrite: false,
      blending: THREE.AdditiveBlending
    });

    this.spotlightCone = new THREE.Mesh(coneGeo, coneMat);
    this.spotlightCone.position.set(0, 7, 0);
    this.scene.add(this.spotlightCone);
  }

  initDustMotes() {
    // Drifting gallery stardust particles
    const particleCount = window.innerWidth < 768 ? 90 : 180;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const scales = new Float32Array(particleCount);
    const speeds = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3 + 0] = (Math.random() - 0.5) * 16;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 12;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10;

      scales[i] = Math.random() * 0.8 + 0.2;
      speeds[i] = Math.random() * 0.4 + 0.2;
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    // Particle sprite
    const canvas = document.createElement("canvas");
    canvas.width = 32;
    canvas.height = 32;
    const ctx = canvas.getContext("2d");
    const gradient = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
    gradient.addColorStop(0, "rgba(255, 249, 239, 1)");
    gradient.addColorStop(0.3, "rgba(212, 175, 55, 0.7)");
    gradient.addColorStop(0.7, "rgba(8, 127, 120, 0.2)");
    gradient.addColorStop(1, "rgba(0, 0, 0, 0)");
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(16, 16, 16, 0, Math.PI * 2);
    ctx.fill();

    const texture = new THREE.CanvasTexture(canvas);

    const material = new THREE.PointsMaterial({
      size: 0.16,
      map: texture,
      transparent: true,
      opacity: 0.55,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });

    this.dustParticles = new THREE.Points(geometry, material);
    this.dustParticles.userData = { speeds };
    this.scene.add(this.dustParticles);
  }

  initFloorReflector() {
    // Subtle dark museum ground plane reflecting the warm spotlights
    const floorGeo = new THREE.PlaneGeometry(30, 30);
    const floorMat = new THREE.MeshBasicMaterial({
      color: 0x021b18,
      transparent: true,
      opacity: 0.35,
      side: THREE.DoubleSide,
      depthWrite: false
    });
    this.floorPlane = new THREE.Mesh(floorGeo, floorMat);
    this.floorPlane.rotation.x = -Math.PI / 2;
    this.floorPlane.position.y = -5.5;
    this.scene.add(this.floorPlane);
  }

  bindEvents() {
    // Mouse / Touch Parallax
    window.addEventListener("mousemove", (e) => {
      this.targetMouse.x = (e.clientX / window.innerWidth - 0.5) * 1.6;
      this.targetMouse.y = (e.clientY / window.innerHeight - 0.5) * 1.0;
    }, { passive: true });

    // Touch tilt for mobile
    window.addEventListener("touchmove", (e) => {
      if (e.touches && e.touches[0]) {
        this.targetMouse.x = (e.touches[0].clientX / window.innerWidth - 0.5) * 1.2;
        this.targetMouse.y = (e.touches[0].clientY / window.innerHeight - 0.5) * 0.8;
      }
    }, { passive: true });

    // Resize Handler
    window.addEventListener("resize", () => this.onResize(), { passive: true });

    // Page Visibility (Save GPU when tab is inactive)
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) {
        this.stop();
      } else {
        this.start();
      }
    });
  }

  onResize() {
    if (!this.renderer || !this.camera) return;
    const width = window.innerWidth;
    const height = window.innerHeight;
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
  }

  updateThemeColors(themeVars) {
    if (!this.scene) return;

    if (themeVars["--museum-gold"]) {
      const goldHex = parseInt(themeVars["--museum-gold"].replace("#", "0x"), 16);
      if (this.directionalSpot) this.directionalSpot.color.setHex(goldHex);
      if (this.spotlightCone) this.spotlightCone.material.color.setHex(goldHex);
    }

    if (themeVars["--museum-bg"]) {
      const bgHex = parseInt(themeVars["--museum-bg"].replace("#", "0x"), 16);
      if (this.ambientLight) this.ambientLight.color.setHex(bgHex);
      if (this.scene.fog) this.scene.fog.color.setHex(bgHex);
    }
  }

  transitionToRoom(roomIndex, totalRooms) {
    // Gently glide camera Z and Y based on room index to evoke moving through gallery halls
    const normalized = roomIndex / Math.max(1, totalRooms - 1);
    this.cameraTarget.z = 7.5 + Math.sin(normalized * Math.PI) * 1.2;
    this.cameraTarget.y = (0.5 - normalized) * 1.5;

    // Monochrome Room (Room 04) has high-contrast silver styling
    if (roomIndex === 4) {
      if (this.spotlightCone) this.spotlightCone.material.opacity = 0.02;
      if (this.directionalSpot) this.directionalSpot.color.setHex(0xe0e5ec);
    } else {
      if (this.spotlightCone) this.spotlightCone.material.opacity = 0.045;
    }
  }

  start() {
    if (this.isRendering) return;
    this.isRendering = true;
    this.tick();
  }

  stop() {
    this.isRendering = false;
    if (this.rafId) {
      cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }
  }

  tick() {
    if (!this.isRendering) return;
    this.rafId = requestAnimationFrame(() => this.tick());

    // Dampen mouse parallax
    this.currentMouse.x += (this.targetMouse.x - this.currentMouse.x) * 0.045;
    this.currentMouse.y += (this.targetMouse.y - this.currentMouse.y) * 0.045;

    // Move camera smoothly
    this.camera.position.x += (this.currentMouse.x * 1.5 - this.camera.position.x) * 0.05;
    this.camera.position.y += ((this.cameraTarget.y - this.currentMouse.y * 0.8) - this.camera.position.y) * 0.05;
    this.camera.position.z += (this.cameraTarget.z - this.camera.position.z) * 0.035;

    this.camera.lookAt(0, 0, 0);

    // Animate dust particles
    if (this.dustParticles) {
      const positions = this.dustParticles.geometry.attributes.position.array;
      const speeds = this.dustParticles.userData.speeds;
      const count = positions.length / 3;

      for (let i = 0; i < count; i++) {
        // Gently bob upward and drift with wind
        positions[i * 3 + 1] += speeds[i] * 0.004;
        positions[i * 3 + 0] += Math.sin(Date.now() * 0.0006 + i) * 0.0015;

        // Wrap around bounds
        if (positions[i * 3 + 1] > 6) {
          positions[i * 3 + 1] = -6;
        }
      }
      this.dustParticles.geometry.attributes.position.needsUpdate = true;
      this.dustParticles.rotation.y = Date.now() * 0.00005;
    }

    // Subtle pulse of volumetric cone
    if (this.spotlightCone) {
      this.spotlightCone.rotation.y = Date.now() * 0.0002;
    }

    this.renderer.render(this.scene, this.camera);
  }
}

window.Museum3DAtmosphere = Museum3DAtmosphere;
