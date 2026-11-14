/**
 * ==============================================================================
 * THE ART OF HER — SECTION 6: MASTERPIECE 3D LIVING ENCHANTED ARBORETUM
 * Inspired by Reference Images 1 & 3:
 * - Ref 1: Sunlit Ancient Grand Tree of Light, Volumetric God Rays & Swirling Spores
 * - Ref 3: Enchanted Woodland Path, Cobblestones, Arched Bridge, Stream, Hanging Lanterns,
 *          Tall Purple Foxglove Spires & Living Wildlife
 *
 * Visual Features:
 * - High-Fidelity Procedural Textures (Soft Radial Firefly Glows, Gaussian God Rays,
 *   Organic Leaf Tufts, Water Ripple Normal Falloffs)
 * - The Majestic Grand Tree of Little Things (Gnarled Root Buttresses, Winding Trunk,
 *   Multi-Tiered Canopy & Luminous Amber Heart)
 * - Cinematic Volumetric God Rays Streaming Diagonally through Canopy with Shimmer
 * - Winding Cobblestone Pathway & Rustic Wooden Fence with Arched Footbridge
 * - Translucent Turquoise Lotus Pond with Water Lilies & Swimming Golden Koi
 * - Hanging Warm Fairytale Lanterns Suspended from Lower Branches & Fence Posts
 * - Tall Purple/Magenta Foxglove (Digitalis) Spires & 200+ Meadow Wildflowers
 * - 12 Interactive Glowing Hero Blossoms with Generous Hit-Spheres for Mobile
 * - Fluttering Animated Butterflies with Flapping Wings & 160+ Dancing Fireflies
 * - 4 Cinematic Camera Viewpoints with Smooth Inertia Interpolation
 * ==============================================================================
 */

class EnchantedGarden3D {
  constructor() {
    this.container = document.getElementById("garden-3d-viewport");
    this.config = window.EXHIBITION_CONFIG?.garden;
    this.modal = document.getElementById("garden-flower-modal");

    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.animationId = null;

    // Procedural Textures
    this.textures = {
      firefly: null,
      godRay: null,
      leaf: null
    };

    // Meshes & Collections
    this.butterflies = [];
    this.interactiveFlowers = [];
    this.flowerHitMeshes = [];
    this.wildlife = [];
    this.fishList = [];
    this.lanterns = [];
    this.fireflies = null;
    this.fireflyPositions = null;
    this.fireflyBasePos = null;
    this.godRays = [];
    this.centralTreeGroup = null;
    this.treeHeartLight = null;

    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2(-999, -999);

    // Viewpoint Camera Positions
    this.currentViewpoint = "vista";
    this.cameraTargetPos = new THREE.Vector3(0, 18, 52);
    this.cameraLookAt = new THREE.Vector3(0, 6, 0);
    this.currentLookAt = new THREE.Vector3(0, 6, 0);

    this.exploredFlowers = new Set();
    this.isTreeIlluminated = false;
    this.clock = new THREE.Clock();
    this.isVisible = true;
    this.observer = null;
    window.enchantedGarden3DInstance = this;

    this.init();
  }

  /* ----------------------------------------------------------------------------
   * 1. PROCEDURAL TEXTURE GENERATION (Soft Fireflies & Gaussian God Rays)
   * ---------------------------------------------------------------------------- */
  generateProceduralTextures() {
    // A. Soft Golden Firefly Glow Texture
    const canvasF = document.createElement("canvas");
    canvasF.width = 128;
    canvasF.height = 128;
    const ctxF = canvasF.getContext("2d");
    const gradF = ctxF.createRadialGradient(64, 64, 0, 64, 64, 64);
    gradF.addColorStop(0.0, "rgba(255, 255, 255, 1.0)");
    gradF.addColorStop(0.2, "rgba(255, 235, 170, 0.95)");
    gradF.addColorStop(0.5, "rgba(244, 226, 187, 0.45)");
    gradF.addColorStop(0.8, "rgba(197, 164, 109, 0.12)");
    gradF.addColorStop(1.0, "rgba(0, 0, 0, 0.0)");
    ctxF.fillStyle = gradF;
    ctxF.fillRect(0, 0, 128, 128);
    this.textures.firefly = new THREE.CanvasTexture(canvasF);

    // B. Volumetric God Ray Texture (Soft vertical beam with gaussian horizontal fade)
    const canvasR = document.createElement("canvas");
    canvasR.width = 256;
    canvasR.height = 512;
    const ctxR = canvasR.getContext("2d");

    const imgData = ctxR.createImageData(256, 512);
    const data = imgData.data;

    for (let y = 0; y < 512; y++) {
      const vFactor = Math.sin((y / 512) * Math.PI * 0.95); // Fade at top and bottom
      for (let x = 0; x < 256; x++) {
        const uDist = Math.abs(x - 128) / 128;
        const hFactor = Math.exp(-uDist * uDist * 4.5); // Gaussian bell curve
        const alpha = Math.min(255, Math.floor(255 * vFactor * hFactor * 0.95));

        const idx = (y * 256 + x) * 4;
        data[idx] = 255;     // R
        data[idx + 1] = 244; // G (Warm Golden Sunlight)
        data[idx + 2] = 195; // B
        data[idx + 3] = alpha;
      }
    }
    ctxR.putImageData(imgData, 0, 0);
    this.textures.godRay = new THREE.CanvasTexture(canvasR);
  }

  /* ----------------------------------------------------------------------------
   * 2. INITIALIZATION & SCENE SETUP
   * ---------------------------------------------------------------------------- */
  init() {
    if (!this.container || typeof THREE === "undefined" || !this.config) {
      console.warn("Three.js not loaded or garden viewport missing.");
      return;
    }

    this.generateProceduralTextures();
    this.setupScene();
    this.setupThemeListener();
    this.buildTerrainAndPathway();
    this.buildLotusPondAndBridge();
    this.buildGrandTreeOfLight();
    this.buildVolumetricGodRays();
    this.buildHangingFairytaleLanterns();
    this.buildEnchantedForestFoliage();
    this.buildTallFoxgloveSpires();
    this.buildWildflowerMeadow();
    this.build12HeroBlossoms();
    this.spawnAnimatedButterflies();
    this.spawnLivingWildlife();
    this.createGoldenSporeParticles();
    this.bindEvents();
    this.setupIntersectionObserver();
    this.animate();
  }

  setupScene() {
    const w = this.container.clientWidth || 800;
    const h = this.container.clientHeight || 580;

    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x021613);
    this.scene.fog = new THREE.FogExp2(0x032721, 0.010);

    this.camera = new THREE.PerspectiveCamera(46, w / h, 0.1, 950);
    this.camera.position.set(0, 18, 52);

    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: false,
      powerPreference: "high-performance"
    });
    this.renderer.setSize(w, h);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    // pan-y prevents trapping vertical mobile scrolling
    this.renderer.domElement.style.cssText = "position:absolute;top:0;left:0;width:100%;height:100%;z-index:2;outline:none;touch-action:pan-y;";
    this.container.appendChild(this.renderer.domElement);

    // Warm Fairytale Ambient Lighting
    const ambientLight = new THREE.AmbientLight(0x064E46, 1.4);
    ambientLight.name = "ambientLight";
    this.scene.add(ambientLight);

    // Warm Sunbeam Directional Light (Matching Reference Image 1)
    const sunLight = new THREE.DirectionalLight(0xFFF0D0, 2.6);
    sunLight.position.set(16, 38, 12);
    sunLight.castShadow = true;
    sunLight.shadow.mapSize.width = 1024;
    sunLight.shadow.mapSize.height = 1024;
    sunLight.shadow.bias = -0.001;
    this.scene.add(sunLight);

    // Soft Fill Light from Below/Left
    const fillLight = new THREE.DirectionalLight(0x0cb3a7, 0.8);
    fillLight.position.set(-20, 15, -10);
    this.scene.add(fillLight);
  }

  /* ----------------------------------------------------------------------------
   * 3. TERRAIN, COBBLESTONE PATHWAY & RUSTIC WOODEN FENCE (Ref Image 3)
   * ---------------------------------------------------------------------------- */
  buildTerrainAndPathway() {
    // 1. Lush Undulating Forest Floor
    const terrainGeo = new THREE.PlaneGeometry(160, 160, 56, 56);
    terrainGeo.rotateX(-Math.PI / 2);

    const pos = terrainGeo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const z = pos.getZ(i);

      // Rolling knolls with depression on the left for the stream and pond
      let y = Math.sin(x * 0.055) * 1.6 + Math.cos(z * 0.045) * 1.8;
      const pondDist = Math.hypot(x - -15, z - 4);
      if (pondDist < 18) {
        y -= Math.cos((pondDist / 18) * (Math.PI / 2)) * 3.4;
      }
      pos.setY(i, y);
    }
    terrainGeo.computeVertexNormals();

    const terrainMat = new THREE.MeshStandardMaterial({
      color: 0x074238, // Deep velvet emerald moss
      roughness: 0.88,
      metalness: 0.08
    });

    const terrain = new THREE.Mesh(terrainGeo, terrainMat);
    terrain.receiveShadow = true;
    this.scene.add(terrain);

    // 2. Winding Cobblestone Pathway (Matches Reference Image 3)
    const pathGroup = new THREE.Group();
    const stoneGeo = new THREE.BoxGeometry(0.85, 0.22, 0.72);
    const stoneColors = [0x787268, 0x8a8479, 0x6e695f, 0x969085, 0x5a554c];

    // Winding curve points from camera (z = 40) towards the Grand Tree (z = -10)
    const curvePoints = [
      new THREE.Vector3(2, 0.2, 42),
      new THREE.Vector3(4, 0.3, 30),
      new THREE.Vector3(1, 0.3, 18),
      new THREE.Vector3(-2, 0.3, 6),
      new THREE.Vector3(0, 0.3, -6)
    ];
    const pathSpline = new THREE.CatmullRomCurve3(curvePoints);
    const pathSegments = 55;

    for (let s = 0; s < pathSegments; s++) {
      const t = s / pathSegments;
      const pt = pathSpline.getPoint(t);
      const tangent = pathSpline.getTangent(t);
      const normal = new THREE.Vector3(-tangent.z, 0, tangent.x).normalize();

      // Place 3-4 stones abreast across path width
      for (let w = -1.2; w <= 1.2; w += 0.8) {
        const stonePos = pt.clone().addScaledVector(normal, w + (Math.random() - 0.5) * 0.3);
        const col = stoneColors[Math.floor(Math.random() * stoneColors.length)];
        const stoneMat = new THREE.MeshStandardMaterial({ color: col, roughness: 0.82 });
        const stone = new THREE.Mesh(stoneGeo, stoneMat);
        stone.position.set(stonePos.x, stonePos.y + 0.08, stonePos.z);
        stone.rotation.y = Math.random() * Math.PI;
        stone.rotation.x = (Math.random() - 0.5) * 0.08;
        stone.scale.set(0.9 + Math.random() * 0.3, 1.0, 0.9 + Math.random() * 0.3);
        stone.castShadow = true;
        stone.receiveShadow = true;
        pathGroup.add(stone);
      }
    }
    this.scene.add(pathGroup);

    // 3. Rustic Wooden Fence Posts & Rails along Pathway (Matches Ref Image 3)
    const fenceGroup = new THREE.Group();
    const woodMat = new THREE.MeshStandardMaterial({ color: 0x422d18, roughness: 0.88 });
    const postGeo = new THREE.CylinderGeometry(0.12, 0.15, 1.8, 8);
    const railGeo = new THREE.CylinderGeometry(0.06, 0.06, 3.2, 6);
    railGeo.rotateZ(Math.PI / 2);

    for (let s = 2; s < pathSegments - 4; s += 4) {
      const t = s / pathSegments;
      const pt = pathSpline.getPoint(t);
      const tangent = pathSpline.getTangent(t);
      const normal = new THREE.Vector3(-tangent.z, 0, tangent.x).normalize();

      // Right-side fence posts
      const postPos = pt.clone().addScaledVector(normal, 2.0);
      const post = new THREE.Mesh(postGeo, woodMat);
      post.position.set(postPos.x, postPos.y + 0.8, postPos.z);
      post.castShadow = true;
      fenceGroup.add(post);

      // Horizontal rails
      const rail1 = new THREE.Mesh(railGeo, woodMat);
      rail1.position.set(postPos.x, postPos.y + 0.6, postPos.z);
      rail1.rotation.y = Math.atan2(tangent.x, tangent.z);
      fenceGroup.add(rail1);

      const rail2 = new THREE.Mesh(railGeo, woodMat);
      rail2.position.set(postPos.x, postPos.y + 1.2, postPos.z);
      rail2.rotation.y = Math.atan2(tangent.x, tangent.z);
      fenceGroup.add(rail2);
    }
    this.scene.add(fenceGroup);
  }

  /* ----------------------------------------------------------------------------
   * 4. TRANSLUCENT LOTUS POND, ARCHED BRIDGE & SWIMMING KOI (Ref Images 1 & 3)
   * ---------------------------------------------------------------------------- */
  buildLotusPondAndBridge() {
    // 1. Translucent Turquoise Pond Water
    const waterGeo = new THREE.CircleGeometry(16, 48);
    waterGeo.rotateX(-Math.PI / 2);

    const waterMat = new THREE.MeshStandardMaterial({
      color: 0x087F78,
      roughness: 0.08,
      metalness: 0.45,
      transparent: true,
      opacity: 0.88
    });

    const water = new THREE.Mesh(waterGeo, waterMat);
    water.position.set(-15, -0.2, 4);
    water.receiveShadow = true;
    this.scene.add(water);

    // 2. Swimming Golden Koi Fish
    this.fishList = [];
    const fishMat = new THREE.MeshStandardMaterial({
      color: 0xF4E2BB,
      emissive: 0xC5A46D,
      emissiveIntensity: 0.85
    });

    for (let i = 0; i < 4; i++) {
      const fishGroup = new THREE.Group();
      const body = new THREE.Mesh(new THREE.ConeGeometry(0.24, 1.2, 8), fishMat);
      body.rotation.x = Math.PI / 2;
      fishGroup.add(body);

      const tail = new THREE.Mesh(new THREE.PlaneGeometry(0.35, 0.45), fishMat);
      tail.position.z = -0.7;
      fishGroup.add(tail);

      fishGroup.position.set(-15, -0.4, 4);
      this.scene.add(fishGroup);

      this.fishList.push({
        group: fishGroup,
        angle: (i / 4) * Math.PI * 2,
        radius: 4.5 + i * 2.2,
        speed: 0.008 + i * 0.003
      });
    }

    // 3. Floating Water Lily Pads & Blossoms
    const lilyPadGeo = new THREE.CircleGeometry(0.85, 16);
    lilyPadGeo.rotateX(-Math.PI / 2);
    const lilyPadMat = new THREE.MeshStandardMaterial({ color: 0x0a5c4d, roughness: 0.6 });

    const lilyBloomGeo = new THREE.SphereGeometry(0.25, 8, 8);
    const lilyBloomMat = new THREE.MeshStandardMaterial({ color: 0xFFF9EF, emissive: 0xF4E2BB, emissiveIntensity: 0.6 });

    for (let l = 0; l < 8; l++) {
      const lAngle = (l / 8) * Math.PI * 2 + Math.random() * 0.5;
      const lDist = 3.5 + Math.random() * 8.0;
      const lx = -15 + Math.cos(lAngle) * lDist;
      const lz = 4 + Math.sin(lAngle) * lDist;

      const pad = new THREE.Mesh(lilyPadGeo, lilyPadMat);
      pad.position.set(lx, -0.15, lz);
      this.scene.add(pad);

      if (l % 2 === 0) {
        const bloom = new THREE.Mesh(lilyBloomGeo, lilyBloomMat);
        bloom.position.set(lx, 0.05, lz);
        this.scene.add(bloom);
      }
    }

    // 4. Arched Rustic Wooden Footbridge (Matches Ref Image 3)
    const bridgeGroup = new THREE.Group();
    const bridgeWoodMat = new THREE.MeshStandardMaterial({ color: 0x5a3d20, roughness: 0.85 });

    const plankCount = 18;
    const bridgeRadius = 9.0;

    for (let p = 0; p < plankCount; p++) {
      const angle = (p / (plankCount - 1)) * (Math.PI * 0.45) + (Math.PI * 0.275);
      const px = -6.5 + Math.cos(angle) * bridgeRadius;
      const py = -0.4 + Math.sin(angle) * (bridgeRadius * 0.45);

      const plank = new THREE.Mesh(new THREE.BoxGeometry(2.2, 0.15, 0.55), bridgeWoodMat);
      plank.position.set(px, py, 4);
      plank.rotation.z = -(angle - Math.PI / 2);
      plank.castShadow = true;
      bridgeGroup.add(plank);
    }
    this.scene.add(bridgeGroup);
  }

  /* ----------------------------------------------------------------------------
   * 5. THE MAJESTIC GRAND TREE OF LIGHT (Matches Reference Image 1)
   * ---------------------------------------------------------------------------- */
  buildGrandTreeOfLight() {
    this.centralTreeGroup = new THREE.Group();
    this.centralTreeGroup.position.set(0, 0, -10);

    const barkMat = new THREE.MeshStandardMaterial({
      color: 0x4e351d, // Gnarled warm bark
      roughness: 0.92,
      metalness: 0.08
    });

    // 1. Sprawling Root Buttresses (Reaching into the ground)
    const rootGeo = new THREE.CylinderGeometry(0.8, 2.2, 4.5, 8);
    for (let r = 0; r < 5; r++) {
      const rAngle = (r / 5) * Math.PI * 2;
      const root = new THREE.Mesh(rootGeo, barkMat);
      root.position.set(Math.cos(rAngle) * 3.2, 1.2, Math.sin(rAngle) * 3.2);
      root.rotation.z = Math.sin(rAngle) * 0.45;
      root.rotation.x = Math.cos(rAngle) * 0.45;
      root.castShadow = true;
      this.centralTreeGroup.add(root);
    }

    // 2. Colossal Twisted Trunk
    const baseTrunk = new THREE.Mesh(new THREE.CylinderGeometry(3.2, 4.8, 8, 14), barkMat);
    baseTrunk.position.y = 4.0;
    baseTrunk.castShadow = true;
    this.centralTreeGroup.add(baseTrunk);

    const midTrunk = new THREE.Mesh(new THREE.CylinderGeometry(2.4, 3.2, 7, 12), barkMat);
    midTrunk.position.y = 10.5;
    midTrunk.rotation.z = 0.09;
    midTrunk.rotation.y = 0.4;
    midTrunk.castShadow = true;
    this.centralTreeGroup.add(midTrunk);

    // 3. Sprawling Main Branches
    const branchConfigs = [
      { pos: [-3.2, 15, 1.5], rotZ: -0.65, rotX: 0.25, len: 10, rT: 1.0, rB: 1.8 },
      { pos: [3.5, 16, -1.8], rotZ: 0.70, rotX: -0.20, len: 11, rT: 1.1, rB: 1.9 },
      { pos: [0.5, 16.5, 3.8], rotZ: 0.15, rotX: 0.65, len: 9, rT: 0.9, rB: 1.6 },
      { pos: [-1.8, 17, -3.2], rotZ: -0.35, rotX: -0.55, len: 10, rT: 1.0, rB: 1.7 }
    ];

    branchConfigs.forEach(bc => {
      const bMesh = new THREE.Mesh(new THREE.CylinderGeometry(bc.rT, bc.rB, bc.len, 10), barkMat);
      bMesh.position.set(bc.pos[0], bc.pos[1], bc.pos[2]);
      bMesh.rotation.z = bc.rotZ;
      bMesh.rotation.x = bc.rotX;
      bMesh.castShadow = true;
      this.centralTreeGroup.add(bMesh);
    });

    // 4. Volumetric Lush Foliage Canopy (Multi-tiered organic clusters)
    const foliageColors = [0x0a5c4d, 0x087F78, 0x117a65, 0x1e824c, 0x064E46];
    const canopyClusters = [
      // Central dome
      { pos: [0, 24, 0], scale: [14, 8, 14] },
      { pos: [0, 27, 0], scale: [10, 6, 10] },
      // Spreading outer foliage boughs
      { pos: [-7, 20, 3], scale: [9, 6, 8] },
      { pos: [8, 21, -3], scale: [10, 7, 9] },
      { pos: [1, 21, 8], scale: [8, 6, 8] },
      { pos: [-3, 22, -7], scale: [9, 6, 9] },
      { pos: [5, 23, 5], scale: [7, 5, 7] }
    ];

    canopyClusters.forEach((cc, idx) => {
      const col = foliageColors[idx % foliageColors.length];
      const folMat = new THREE.MeshStandardMaterial({
        color: col,
        roughness: 0.85,
        metalness: 0.05,
        flatShading: true
      });
      const folMesh = new THREE.Mesh(new THREE.DodecahedronGeometry(1.0, 2), folMat);
      folMesh.position.set(cc.pos[0], cc.pos[1], cc.pos[2]);
      folMesh.scale.set(cc.scale[0], cc.scale[1], cc.scale[2]);
      folMesh.castShadow = true;
      folMesh.receiveShadow = true;
      this.centralTreeGroup.add(folMesh);
    });

    // 5. Radiant Amber Heart of the Tree (Matches warm inner glow in Ref Image 1)
    this.treeHeartLight = new THREE.PointLight(0xFFE082, 3.8, 48);
    this.treeHeartLight.position.set(0, 13.5, 0);
    this.centralTreeGroup.add(this.treeHeartLight);

    // Glowing Heart Crystal Sphere
    const heartSphere = new THREE.Mesh(
      new THREE.SphereGeometry(1.2, 16, 16),
      new THREE.MeshBasicMaterial({ color: 0xFFF9EF })
    );
    heartSphere.position.set(0, 13.5, 0);
    this.centralTreeGroup.add(heartSphere);

    this.scene.add(this.centralTreeGroup);
  }

  /* ----------------------------------------------------------------------------
   * 6. VOLUMETRIC GOD RAYS / SUNLIGHT SHAFTS (Matches Reference Image 1)
   * ---------------------------------------------------------------------------- */
  buildVolumetricGodRays() {
    this.godRays = [];

    const rayMat = new THREE.MeshBasicMaterial({
      map: this.textures.godRay,
      color: 0xFFF0D0,
      transparent: true,
      opacity: 0.28,
      side: THREE.DoubleSide,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });

    // 6 angled sunlight beam planes pouring down diagonally through canopy
    const rayConfigs = [
      { pos: [6, 20, 2], rotZ: -0.52, rotX: 0.22, w: 14, h: 46 },
      { pos: [12, 22, 6], rotZ: -0.55, rotX: 0.16, w: 18, h: 50 },
      { pos: [0, 24, -4], rotZ: -0.48, rotX: 0.28, w: 16, h: 52 },
      { pos: [18, 20, 10], rotZ: -0.58, rotX: 0.12, w: 12, h: 42 },
      { pos: [-4, 22, 4], rotZ: -0.46, rotX: 0.30, w: 15, h: 48 },
      { pos: [8, 18, 14], rotZ: -0.54, rotX: 0.18, w: 16, h: 44 }
    ];

    rayConfigs.forEach((rc, idx) => {
      const plane = new THREE.Mesh(new THREE.PlaneGeometry(rc.w, rc.h), rayMat);
      plane.position.set(rc.pos[0], rc.pos[1], rc.pos[2]);
      plane.rotation.z = rc.rotZ;
      plane.rotation.x = rc.rotX;
      plane.userData = {
        baseOpacity: 0.24,
        pulseSpeed: 1.2 + idx * 0.35,
        phase: idx * 1.1
      };
      this.scene.add(plane);
      this.godRays.push(plane);
    });
  }

  /* ----------------------------------------------------------------------------
   * 7. HANGING FAIRYTALE LANTERNS (Matches Reference Image 3)
   * ---------------------------------------------------------------------------- */
  buildHangingFairytaleLanterns() {
    this.lanterns = [];
    const metalMat = new THREE.MeshStandardMaterial({ color: 0x222222, roughness: 0.4 });
    const glassMat = new THREE.MeshBasicMaterial({ color: 0xFFE082 });

    const lanternPositions = [
      [-3.2, 11, -7.5],  // Tree branch left
      [3.8, 11.5, -8.2], // Tree branch right
      [0.8, 12, -5.5],   // Tree branch center
      [2.2, 2.2, 22],    // Pathway fence post
      [-0.8, 2.2, 10]    // Bridge fence post
    ];

    lanternPositions.forEach((pos, idx) => {
      const lanternGroup = new THREE.Group();
      lanternGroup.position.set(pos[0], pos[1], pos[2]);

      // Hanging fine chain
      const chainGeo = new THREE.CylinderGeometry(0.02, 0.02, 1.2, 6);
      const chain = new THREE.Mesh(chainGeo, metalMat);
      chain.position.y = 0.6;
      lanternGroup.add(chain);

      // Lantern Cap & Base
      const cap = new THREE.Mesh(new THREE.ConeGeometry(0.35, 0.35, 6), metalMat);
      cap.position.y = 0;
      lanternGroup.add(cap);

      // Glowing Glass Core
      const glass = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.22, 0.45, 6), glassMat);
      glass.position.y = -0.3;
      lanternGroup.add(glass);

      // Warm Point Light
      const lanternLight = new THREE.PointLight(0xFFE082, 1.4, 12);
      lanternLight.position.y = -0.3;
      lanternGroup.add(lanternLight);

      // Soft Glow Halo Sprite
      const glowMat = new THREE.SpriteMaterial({
        map: this.textures.firefly,
        color: 0xF4E2BB,
        transparent: true,
        opacity: 0.65,
        blending: THREE.AdditiveBlending,
        depthWrite: false
      });
      const glowSprite = new THREE.Sprite(glowMat);
      glowSprite.scale.set(2.4, 2.4, 1);
      glowSprite.position.y = -0.3;
      lanternGroup.add(glowSprite);

      lanternGroup.userData = { phase: idx * 1.3 };
      this.scene.add(lanternGroup);
      this.lanterns.push(lanternGroup);
    });
  }

  /* ----------------------------------------------------------------------------
   * 8. BACKGROUND FOREST TREES & NATURAL FOLIAGE
   * ---------------------------------------------------------------------------- */
  buildEnchantedForestFoliage() {
    const pineMat = new THREE.MeshStandardMaterial({ color: 0x043d34, roughness: 0.9 });
    const trunkMat = new THREE.MeshStandardMaterial({ color: 0x3d2714, roughness: 0.95 });

    // Ring of 28 deep background trees enclosing the fairytale sanctuary
    for (let i = 0; i < 28; i++) {
      const tree = new THREE.Group();
      const angle = (i / 28) * Math.PI * 2;
      const dist = 52 + (Math.random() - 0.5) * 14;

      // Keep open in front of the camera viewpoint
      if (Math.abs(angle - Math.PI / 2) < 0.35) continue;

      const tx = Math.cos(angle) * dist;
      const tz = Math.sin(angle) * dist;

      // Trunk
      const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.6, 1.0, 10, 8), trunkMat);
      trunk.position.y = 5;
      tree.add(trunk);

      // 3 Tiers of Pine foliage cones
      for (let t = 0; t < 3; t++) {
        const cone = new THREE.Mesh(new THREE.ConeGeometry(4.2 - t * 0.9, 6.5, 8), pineMat);
        cone.position.y = 8 + t * 4.2;
        tree.add(cone);
      }

      tree.position.set(tx, 0, tz);
      const sc = 0.8 + Math.random() * 0.5;
      tree.scale.set(sc, sc, sc);
      this.scene.add(tree);
    }
  }

  /* ----------------------------------------------------------------------------
   * 9. TALL PURPLE FOXGLOVE SPIRES (Matches Reference Image 3)
   * ---------------------------------------------------------------------------- */
  buildTallFoxgloveSpires() {
    const foxgloveColors = [0x9B5DE5, 0xBA68C8, 0xAB47BC, 0xD4A5FF, 0xE0AAFF];
    const stemMat = new THREE.MeshStandardMaterial({ color: 0x11664e, roughness: 0.8 });

    // 24 Foxglove Flower Spires clustered along pathway and pond banks
    for (let i = 0; i < 24; i++) {
      const spire = new THREE.Group();
      const col = foxgloveColors[i % foxgloveColors.length];
      const bellMat = new THREE.MeshStandardMaterial({
        color: col,
        emissive: col,
        emissiveIntensity: 0.55,
        roughness: 0.4
      });

      // Tall curving stem
      const height = 2.4 + Math.random() * 0.8;
      const stem = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.08, height, 6), stemMat);
      stem.position.y = height / 2;
      spire.add(stem);

      // Tiers of nodding bell flowers
      const bellCount = 10;
      for (let b = 0; b < bellCount; b++) {
        const by = height * 0.35 + (b / bellCount) * (height * 0.6);
        const bAngle = b * 2.4;
        const bell = new THREE.Mesh(new THREE.ConeGeometry(0.14, 0.32, 6), bellMat);
        bell.rotation.x = Math.PI / 1.6;
        bell.rotation.y = bAngle;
        bell.position.set(Math.cos(bAngle) * 0.16, by, Math.sin(bAngle) * 0.16);
        spire.add(bell);
      }

      // Positions flanking the path and water
      const side = (i % 2 === 0 ? 1 : -1);
      const zPos = 8 + (i * 1.3);
      const xPos = side * (3.2 + Math.random() * 2.4);

      spire.position.set(xPos, 0, zPos);
      spire.rotation.y = Math.random() * Math.PI * 2;
      this.scene.add(spire);
    }
  }

  /* ----------------------------------------------------------------------------
   * 10. WILDFLOWER MEADOW & 12 HERO BLOSSOMS (Ref Images 1 & 3)
   * ---------------------------------------------------------------------------- */
  buildWildflowerMeadow() {
    // 220 Ground Wildflowers (Yellow, Cream, Pink, Ivory - Matches Ref 1)
    const flowerColors = [0xF4E2BB, 0xFFF9EF, 0xE8D7B5, 0xC5A46D, 0xFFE082, 0xF8BBD0];
    const flowerCount = 220;

    const petalGeo = new THREE.CircleGeometry(0.32, 6);
    petalGeo.rotateX(-Math.PI / 2);

    for (let i = 0; i < flowerCount; i++) {
      const col = flowerColors[Math.floor(Math.random() * flowerColors.length)];
      const fMat = new THREE.MeshStandardMaterial({
        color: col,
        emissive: col,
        emissiveIntensity: 0.45,
        roughness: 0.6
      });

      const fl = new THREE.Mesh(petalGeo, fMat);
      const angle = Math.random() * Math.PI * 2;
      const dist = 6 + Math.random() * 38;
      const x = Math.cos(angle) * dist;
      const z = Math.sin(angle) * dist;

      // Keep out of pond basin
      if (Math.hypot(x - -15, z - 4) < 17) continue;

      fl.position.set(x, 0.12, z);
      fl.rotation.y = Math.random() * Math.PI;
      this.scene.add(fl);
    }
  }

  build12HeroBlossoms() {
    const flowersData = this.config.flowers || [];
    this.interactiveFlowers = [];
    this.flowerHitMeshes = [];

    flowersData.forEach((flData, idx) => {
      const flowerGroup = new THREE.Group();
      const pos = flData.pos || [0, 0, 0];

      // Slender Botanical Stem
      const stemGeo = new THREE.CylinderGeometry(0.06, 0.09, 1.6, 6);
      const stemMat = new THREE.MeshStandardMaterial({ color: 0x0a5c4d, roughness: 0.8 });
      const stem = new THREE.Mesh(stemGeo, stemMat);
      stem.position.y = 0.8;
      flowerGroup.add(stem);

      // Multi-Petal Blossom Head
      const blossomGroup = new THREE.Group();
      blossomGroup.position.y = 1.6;

      const petalColor = flData.color || 0xF4E2BB;
      const petalMat = new THREE.MeshStandardMaterial({
        color: petalColor,
        emissive: petalColor,
        emissiveIntensity: 0.95,
        roughness: 0.3
      });

      // 6 Layered Petals
      for (let p = 0; p < 6; p++) {
        const pMesh = new THREE.Mesh(new THREE.ConeGeometry(0.35, 0.8, 5), petalMat);
        const pAngle = (p / 6) * Math.PI * 2;
        pMesh.position.set(Math.cos(pAngle) * 0.28, 0, Math.sin(pAngle) * 0.28);
        pMesh.rotation.z = Math.cos(pAngle) * 0.55;
        pMesh.rotation.x = -Math.sin(pAngle) * 0.55;
        blossomGroup.add(pMesh);
      }

      // Glowing Center Stamen
      const stamen = new THREE.Mesh(
        new THREE.SphereGeometry(0.24, 8, 8),
        new THREE.MeshBasicMaterial({ color: 0xFFFDF5 })
      );
      blossomGroup.add(stamen);

      // Soft Glow Halo Sprite
      const haloMat = new THREE.SpriteMaterial({
        map: this.textures.firefly,
        color: petalColor,
        transparent: true,
        opacity: 0.75,
        blending: THREE.AdditiveBlending,
        depthWrite: false
      });
      const halo = new THREE.Sprite(haloMat);
      halo.scale.set(3.2, 3.2, 1);
      blossomGroup.add(halo);

      flowerGroup.add(blossomGroup);

      // Generous Invisible Hit-Test Sphere for Touch & Click
      const hitSphere = new THREE.Mesh(
        new THREE.SphereGeometry(2.4, 8, 8),
        new THREE.MeshBasicMaterial({ visible: false })
      );
      hitSphere.position.y = 1.4;
      hitSphere.userData = { isFlower: true, index: idx, data: flData, group: flowerGroup };
      flowerGroup.add(hitSphere);
      this.flowerHitMeshes.push(hitSphere);

      flowerGroup.position.set(pos[0], pos[1], pos[2]);
      flowerGroup.userData = { isFlower: true, index: idx, data: flData, halo: halo };

      this.scene.add(flowerGroup);
      this.interactiveFlowers.push(flowerGroup);
    });
  }

  /* ----------------------------------------------------------------------------
   * 11. FLUTTERING ANIMATED BUTTERFLIES (Matches Ref Images 1 & 3)
   * ---------------------------------------------------------------------------- */
  spawnAnimatedButterflies() {
    this.butterflies = [];
    const butterflyCount = 16;

    const species = [
      { color: 0x087F78, emissive: 0x0cb3a7, name: "Emerald" },
      { color: 0xF4E2BB, emissive: 0xFFE082, name: "Golden" },
      { color: 0xFFF9EF, emissive: 0xFFF9EF, name: "Ivory" },
      { color: 0x83C5BE, emissive: 0x14D5C8, name: "Aquamarine" },
      { color: 0xE0AAFF, emissive: 0xC77DFF, name: "Lavender" }
    ];

    const wingGeo = new THREE.PlaneGeometry(0.55, 0.45);

    for (let i = 0; i < butterflyCount; i++) {
      const bGroup = new THREE.Group();
      const spec = species[i % species.length];

      const wingMat = new THREE.MeshStandardMaterial({
        color: spec.color,
        emissive: spec.emissive,
        emissiveIntensity: 0.85,
        side: THREE.DoubleSide
      });

      // Left Wing
      const leftWing = new THREE.Mesh(wingGeo, wingMat);
      leftWing.position.x = -0.28;
      bGroup.add(leftWing);

      // Right Wing
      const rightWing = new THREE.Mesh(wingGeo, wingMat);
      rightWing.position.x = 0.28;
      bGroup.add(rightWing);

      const angle = (i / butterflyCount) * Math.PI * 2;
      const radius = 8 + (i % 4) * 6;
      const height = 2.5 + (i % 5) * 1.4;

      bGroup.position.set(Math.cos(angle) * radius, height, Math.sin(angle) * radius);
      this.scene.add(bGroup);

      this.butterflies.push({
        group: bGroup,
        leftWing: leftWing,
        rightWing: rightWing,
        angle: angle,
        radius: radius,
        baseY: height,
        speed: 0.012 + (i % 3) * 0.005,
        flapSpeed: 14 + (i % 4) * 2
      });
    }
  }

  /* ----------------------------------------------------------------------------
   * 12. LIVING WILDLIFE (Gentle Rabbits & Woodland Deer)
   * ---------------------------------------------------------------------------- */
  spawnLivingWildlife() {
    this.wildlife = [];

    // 1. Hopping Rabbits near pathway
    const furMat = new THREE.MeshStandardMaterial({ color: 0xE8D7B5 });
    for (let r = 0; r < 2; r++) {
      const bunny = new THREE.Group();
      bunny.add(new THREE.Mesh(new THREE.SphereGeometry(0.4, 8, 8), furMat)); // Body
      const head = new THREE.Mesh(new THREE.SphereGeometry(0.25, 8, 8), furMat);
      head.position.set(0.25, 0.3, 0);
      bunny.add(head);

      bunny.position.set(4.5 + r * 3, 0.4, 18 - r * 6);
      this.scene.add(bunny);
      this.wildlife.push({ mesh: bunny, type: "rabbit", phase: r * 1.5, basePos: bunny.position.clone() });
    }

    // 2. Graceful Deer walking through woodland clearing
    const deerMat = new THREE.MeshStandardMaterial({ color: 0x8D5B4C });
    const deer = new THREE.Group();
    const deerBody = new THREE.Mesh(new THREE.CylinderGeometry(0.65, 0.85, 2.8, 8), deerMat);
    deerBody.rotation.z = Math.PI / 2;
    deer.add(deerBody);

    const neck = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.45, 1.8, 6), deerMat);
    neck.position.set(1.1, 1.0, 0);
    neck.rotation.z = -0.55;
    deer.add(neck);

    deer.position.set(18, 1.8, -4);
    deer.scale.set(0.9, 0.9, 0.9);
    this.scene.add(deer);
    this.wildlife.push({ mesh: deer, type: "deer", phase: 0, basePos: deer.position.clone() });
  }

  /* ----------------------------------------------------------------------------
   * 13. DANCING GOLDEN SPORES & FIREFLIES (Ref Images 1 & 3)
   * ---------------------------------------------------------------------------- */
  createGoldenSporeParticles() {
    const sporeCount = 160;
    const geo = new THREE.BufferGeometry();
    this.fireflyPositions = new Float32Array(sporeCount * 3);
    this.fireflyBasePos = new Float32Array(sporeCount * 3);

    for (let i = 0; i < sporeCount; i++) {
      const i3 = i * 3;
      const x = (Math.random() - 0.5) * 55;
      const y = 1.0 + Math.random() * 20.0;
      const z = (Math.random() - 0.5) * 55;

      this.fireflyPositions[i3] = x;
      this.fireflyPositions[i3 + 1] = y;
      this.fireflyPositions[i3 + 2] = z;

      this.fireflyBasePos[i3] = x;
      this.fireflyBasePos[i3 + 1] = y;
      this.fireflyBasePos[i3 + 2] = z;
    }

    geo.setAttribute("position", new THREE.BufferAttribute(this.fireflyPositions, 3));

    const mat = new THREE.PointsMaterial({
      size: 2.8,
      map: this.textures.firefly,
      color: 0xF4E2BB,
      transparent: true,
      opacity: 0.92,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });

    this.fireflies = new THREE.Points(geo, mat);
    this.scene.add(this.fireflies);
  }

  /* ----------------------------------------------------------------------------
   * 14. VIEWPOINTS, INTERACTION & FLOWER MODAL
   * ---------------------------------------------------------------------------- */
  setViewpoint(vpId) {
    this.currentViewpoint = vpId;

    const viewpoints = {
      vista: { pos: [0, 18, 52], target: [0, 6, 0] },
      pond: { pos: [-18, 7, 20], target: [-15, 1, 4] },
      meadow: { pos: [20, 6, 24], target: [14, 2, 4] },
      tree: { pos: [0, 10, 22], target: [0, 9, -10] }
    };

    const vp = viewpoints[vpId] || viewpoints.vista;
    this.cameraTargetPos.set(...vp.pos);
    this.cameraLookAt.set(...vp.target);

    // Update Viewpoint Pill Buttons
    document.querySelectorAll(".garden-viewpoint-pill").forEach(btn => {
      btn.classList.toggle("active", btn.dataset.viewpoint === vpId);
    });
  }

  selectFlower(flGroup) {
    if (!flGroup) return;
    const fData = flGroup.userData.data;
    const idx = flGroup.userData.index;

    this.exploredFlowers.add(idx);

    // Fly camera smoothly to inspect blossom
    const flowerWorldPos = new THREE.Vector3();
    flGroup.getWorldPosition(flowerWorldPos);

    this.cameraTargetPos.copy(flowerWorldPos).add(new THREE.Vector3(2.5, 2.0, 5.0));
    this.cameraLookAt.copy(flowerWorldPos);

    this.showFlowerModal(fData, idx);

    // Unlock Grand Tree illumination if 6+ flowers explored
    if (this.exploredFlowers.size >= 6 && !this.isTreeIlluminated) {
      this.illuminateTreeOfLittleThings();
    }
  }

  showFlowerModal(fData, idx) {
    if (!this.modal) return;
    const total = this.config.flowers?.length || 12;

    this.modal.innerHTML = `
      <div class="flower-modal-inner">
        <button class="flower-modal-close" id="garden-modal-close-btn" aria-label="Close dedication">✕</button>
        <span class="badge-gold">✦ LIVING BOTANICAL DEDICATION ✦</span>
        <h3 class="flower-modal-title gold-text">${fData.name}</h3>
        <div class="flower-modal-variety">${fData.variety}</div>
        <p class="flower-modal-compliment">&ldquo;${fData.compliment}&rdquo;</p>
        <div class="flower-modal-meta">
          <span>BLOSSOM ${idx + 1} OF ${total}</span>
          <button class="flower-modal-next-btn" id="garden-modal-next-btn">Return to Garden →</button>
        </div>
      </div>
    `;

    this.modal.classList.add("active");

    const closeBtn = document.getElementById("garden-modal-close-btn");
    const nextBtn = document.getElementById("garden-modal-next-btn");
    const dismiss = () => {
      this.modal.classList.remove("active");
      this.setViewpoint("vista");
    };

    if (closeBtn) closeBtn.addEventListener("click", dismiss);
    if (nextBtn) nextBtn.addEventListener("click", dismiss);
  }

  illuminateTreeOfLittleThings() {
    this.isTreeIlluminated = true;
    if (this.treeHeartLight) {
      this.treeHeartLight.intensity = 6.0;
    }
  }

  bindEvents() {
    // Window Resize
    window.addEventListener("resize", () => {
      if (!this.container || !this.renderer || !this.camera) return;
      const w = this.container.clientWidth;
      const h = this.container.clientHeight;
      if (w === 0 || h === 0) return;
      this.camera.aspect = w / h;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(w, h);
    }, { passive: true });

    // Viewpoint Toolbar Buttons
    const navBar = document.getElementById("garden-viewpoint-nav");
    if (navBar) {
      navBar.addEventListener("click", (e) => {
        const btn = e.target.closest(".garden-viewpoint-pill");
        if (btn) {
          const vpId = btn.dataset.viewpoint;
          this.setViewpoint(vpId);
        }
      });
    }

    // Modal Escape Key
    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && this.modal?.classList.contains("active")) {
        this.modal.classList.remove("active");
        this.setViewpoint("vista");
      }
    });

    // Raycast Interaction (Taps & Clicks)
    let pointerDownPos = { x: 0, y: 0 };
    let isDown = false;
    let didDrag = false;

    this.container.addEventListener("pointerdown", (e) => {
      isDown = true;
      didDrag = false;
      pointerDownPos = { x: e.clientX, y: e.clientY };
    });

    this.container.addEventListener("pointermove", (e) => {
      if (isDown) {
        const dist = Math.hypot(e.clientX - pointerDownPos.x, e.clientY - pointerDownPos.y);
        if (dist > 8) didDrag = true;
      }
    });

    this.container.addEventListener("pointerup", (e) => {
      if (!isDown) return;
      isDown = false;

      // Distinguish drag from click
      if (didDrag) return;

      const rect = this.container.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;

      this.mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      this.mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      this.raycaster.setFromCamera(this.mouse, this.camera);
      // Raycast against generous invisible hit-spheres
      const intersects = this.raycaster.intersectObjects(this.flowerHitMeshes);

      if (intersects.length > 0) {
        const hitSphere = intersects[0].object;
        if (hitSphere.userData?.group) {
          this.selectFlower(hitSphere.userData.group);
        }
      }
    });
  }

  /* ----------------------------------------------------------------------------
   * 15. THEME SYNCHRONIZATION & PERFORMANCE OBSERVER
   * ---------------------------------------------------------------------------- */
  setupThemeListener() {
    window.addEventListener("artOfHerThemeChange", (e) => {
      const themeData = e.detail?.theme;
      if (!themeData?.threeColors) return;

      const tc = themeData.threeColors;

      const ambient = this.scene?.getObjectByName("ambientLight");
      if (ambient) ambient.color.setHex(tc.ambient);

      this.godRays.forEach(ray => {
        if (ray.material) ray.material.color.setHex(tc.godRays);
      });

      if (this.fireflies?.material) {
        this.fireflies.material.color.setHex(tc.godRays);
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

  /* ----------------------------------------------------------------------------
   * 16. 60FPS ANIMATION LOOP
   * ---------------------------------------------------------------------------- */
  animate() {
    this.animationId = requestAnimationFrame(() => this.animate());

    if (!this.isVisible) return;

    const delta = this.clock.getDelta();
    const elapsedTime = this.clock.getElapsedTime();

    // 1. Butterfly Flapping & Sinusoidal Flight
    this.butterflies.forEach(b => {
      b.angle += b.speed;
      b.group.position.x = Math.cos(b.angle) * b.radius;
      b.group.position.z = Math.sin(b.angle) * b.radius;
      b.group.position.y = b.baseY + Math.sin(elapsedTime * 2.8 + b.angle) * 0.9;
      b.group.rotation.y = -b.angle + Math.PI / 2;

      // Realistic rapid wing flap
      const flap = Math.sin(elapsedTime * b.flapSpeed) * 0.72;
      b.leftWing.rotation.y = flap;
      b.rightWing.rotation.y = -flap;
    });

    // 2. Swimming Golden Koi Fish
    this.fishList.forEach(fish => {
      fish.angle += fish.speed;
      fish.group.position.x = -15 + Math.cos(fish.angle) * fish.radius;
      fish.group.position.z = 4 + Math.sin(fish.angle) * fish.radius;
      fish.group.rotation.y = -fish.angle + Math.PI;
    });

    // 3. Shimmering Volumetric God Rays
    this.godRays.forEach(ray => {
      const u = ray.userData;
      ray.material.opacity = u.baseOpacity + Math.sin(elapsedTime * u.pulseSpeed + u.phase) * 0.08;
    });

    // 4. Swaying Hanging Fairytale Lanterns
    this.lanterns.forEach(lantern => {
      const ph = lantern.userData.phase;
      lantern.rotation.z = Math.sin(elapsedTime * 1.5 + ph) * 0.06;
      lantern.rotation.x = Math.cos(elapsedTime * 1.2 + ph) * 0.04;
    });

    // 5. Floating Fireflies & Golden Spores (Harmonic 3D Drift)
    if (this.fireflies && this.fireflyPositions) {
      const posAttr = this.fireflies.geometry.attributes.position;
      const count = this.fireflyBasePos.length / 3;

      for (let i = 0; i < count; i++) {
        const i3 = i * 3;
        const bx = this.fireflyBasePos[i3];
        const by = this.fireflyBasePos[i3 + 1];
        const bz = this.fireflyBasePos[i3 + 2];

        posAttr.array[i3] = bx + Math.sin(elapsedTime * 0.8 + i) * 2.2;
        posAttr.array[i3 + 1] = by + Math.cos(elapsedTime * 0.6 + i * 1.5) * 1.4;
        posAttr.array[i3 + 2] = bz + Math.sin(elapsedTime * 0.7 + i * 2.0) * 2.2;
      }
      posAttr.needsUpdate = true;
    }

    // 6. Gentle Hopping Wildlife
    this.wildlife.forEach(w => {
      if (w.type === "rabbit") {
        const hop = Math.abs(Math.sin(elapsedTime * 3.2 + w.phase)) * 0.35;
        w.mesh.position.y = w.basePos.y + hop;
      }
    });

    // 7. Hero Blossom Glowing Halos Pulsing
    this.interactiveFlowers.forEach((fl, idx) => {
      if (fl.userData.halo) {
        const pulse = 1.0 + Math.sin(elapsedTime * 2.4 + idx) * 0.15;
        fl.userData.halo.scale.set(3.2 * pulse, 3.2 * pulse, 1);
      }
    });

    // 8. Smooth Camera Inertia Interpolation
    this.camera.position.lerp(this.cameraTargetPos, 0.042);
    this.currentLookAt.lerp(this.cameraLookAt, 0.042);
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

// Global Export
if (typeof window !== "undefined") {
  window.EnchantedGarden3D = EnchantedGarden3D;
}
