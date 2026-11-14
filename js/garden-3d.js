/**
 * ==============================================================================
 * THE ART OF HER — SECTION 6: 3D LIVING ENCHANTED ARBORETUM
 * Three.js WebGL Complete Living Fairytale Sanctuary:
 * - Luminous Grand Tree of Little Things with Golden Spores & Internal Light
 * - Volumetric God Rays / Light Shafts streaming through foliage (Reference 1)
 * - Winding Cobblestone Pathway, Arched Wooden Bridge & Lotus Pond (Reference 3)
 * - Swimming Golden Koi Fish, 12 Animated Butterflies & Meadow Wildlife
 * - 12 Interactive Glowing Blossoms & 4 Smooth Cinematic Camera Viewpoints
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
    
    this.butterflies = [];
    this.interactiveFlowers = [];
    this.wildlife = [];
    this.fishList = [];
    this.fireflies = null;
    this.spores = null;
    this.godRays = [];
    this.centralTreeGroup = null;
    this.treeLeavesMeshes = [];
    
    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2(-999, -999);
    
    // Viewpoint Camera Positions
    this.currentViewpoint = "vista";
    this.cameraTargetPos = new THREE.Vector3(0, 16, 48);
    this.cameraLookAt = new THREE.Vector3(0, 5, 0);
    this.currentLookAt = new THREE.Vector3(0, 5, 0);
    
    this.exploredFlowers = new Set();
    this.isTreeIlluminated = false;
    this.clock = new THREE.Clock();
    this.isVisible = true;
    this.observer = null;
    window.enchantedGarden3DInstance = this;
    
    this.init();
  }

  init() {
    if (!this.container || typeof THREE === "undefined" || !this.config) {
      console.warn("Three.js not loaded or garden viewport missing.");
      return;
    }

    this.setupScene();
    this.setupThemeListener();
    this.buildTerrainAndPathway();
    this.buildLotusPondAndBridge();
    this.buildGrandTreeOfLight();
    this.buildVolumetricGodRays();
    this.buildEnchantedForestFoliage();
    this.buildWildflowerMeadow();
    this.build12HeroBlossoms();
    this.spawnAnimatedButterflies();
    this.spawnLivingWildlife();
    this.createGoldenSporeParticles();
    this.bindEvents();
    this.animate();
  }


  setupThemeListener() {
    window.addEventListener("artOfHerThemeChange", (e) => {
      const themeData = e.detail?.theme;
      if (!themeData?.threeColors) return;

      const tc = themeData.threeColors;

      // Update ambient light
      const ambient = this.scene.getObjectByName("ambientLight");
      if (ambient) ambient.color.setHex(tc.ambient);

      // Update God Rays light color
      this.godRays.forEach(ray => {
        if (ray.material) ray.material.color.setHex(tc.godRays);
      });

      // Update Spores / Fireflies color
      if (this.spores && this.spores.material) {
        this.spores.material.color.setHex(tc.godRays);
      }
    });
  }

  setupScene() {
    const w = this.container.clientWidth || 800;
    const h = this.container.clientHeight || 560;

    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x021613);
    this.scene.fog = new THREE.FogExp2(0x032721, 0.011);

    this.camera = new THREE.PerspectiveCamera(48, w / h, 0.1, 850);
    this.camera.position.set(0, 16, 48);

    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false, powerPreference: "high-performance" });
    this.renderer.setSize(w, h);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.domElement.id = "garden-three-canvas";
    this.renderer.domElement.style.cssText = "position:absolute;top:0;left:0;width:100%;height:100%;z-index:1;outline:none;touch-action:pan-y;";

    // Remove legacy 2D fireflies canvas if present
    const old2dCanvas = document.getElementById("garden-fireflies-canvas");
    if (old2dCanvas) old2dCanvas.remove();

    this.container.appendChild(this.renderer.domElement);

    // Warm Golden Sunlight (Matches Reference 1)
    const ambientLight = new THREE.AmbientLight(0x0c4a40, 1.8);
    this.scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight(0xF4E2BB, 2.6);
    sunLight.position.set(38, 55, 25);
    sunLight.castShadow = true;
    sunLight.shadow.mapSize.width = 1024;
    sunLight.shadow.mapSize.height = 1024;
    sunLight.shadow.camera.near = 10;
    sunLight.shadow.camera.far = 160;
    this.scene.add(sunLight);

    const tealSkyLight = new THREE.HemisphereLight(0x087F78, 0x02241e, 1.1);
    this.scene.add(tealSkyLight);
  }

  buildTerrainAndPathway() {
    // 1. Undulating Lush Forest Floor Terrain
    const terrainGeo = new THREE.PlaneGeometry(150, 150, 48, 48);
    terrainGeo.rotateX(-Math.PI / 2);

    const pos = terrainGeo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const z = pos.getZ(i);

      // Natural rolling hills with depression on the left for the pond
      let y = Math.sin(x * 0.06) * 1.5 + Math.cos(z * 0.05) * 1.8;
      const pondDist = Math.hypot(x - -14, z - 4);
      if (pondDist < 16) {
        y -= Math.cos((pondDist / 16) * (Math.PI / 2)) * 3.2;
      }
      pos.setY(i, y);
    }
    terrainGeo.computeVertexNormals();

    const terrainMat = new THREE.MeshStandardMaterial({
      color: 0x074238,
      roughness: 0.85,
      metalness: 0.1
    });

    const terrain = new THREE.Mesh(terrainGeo, terrainMat);
    terrain.receiveShadow = true;
    this.scene.add(terrain);

    // 2. Winding River Stone Path (Reference 3)
    const pathCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, 0.1, 38),
      new THREE.Vector3(4, 0.2, 26),
      new THREE.Vector3(-2, 0.2, 14),
      new THREE.Vector3(-10, 0.1, 6),   // Towards bridge
      new THREE.Vector3(-16, 0.6, 2),   // Over bridge
      new THREE.Vector3(-10, 0.1, -4),  // Past bridge
      new THREE.Vector3(0, 0.4, -6),    // Towards the Grand Tree
      new THREE.Vector3(0, 0.8, -12)
    ]);

    const stoneMat = new THREE.MeshStandardMaterial({
      color: 0xC5A46D,
      roughness: 0.75,
      metalness: 0.2
    });

    // Place stepping stones along the path
    const stonePoints = pathCurve.getPoints(36);
    stonePoints.forEach((pt, idx) => {
      if (idx % 2 === 0) {
        const radius = 0.85 + (idx % 3) * 0.15;
        const stoneGeo = new THREE.CylinderGeometry(radius, radius * 1.1, 0.15, 7);
        const stoneMesh = new THREE.Mesh(stoneGeo, stoneMat);
        stoneMesh.position.set(pt.x + (Math.random() - 0.5) * 0.4, pt.y + 0.08, pt.z);
        stoneMesh.rotation.y = Math.random() * Math.PI;
        stoneMesh.receiveShadow = true;
        this.scene.add(stoneMesh);
      }
    });
  }

  buildLotusPondAndBridge() {
    // Translucent Turquoise Lotus Pond Water
    const waterGeo = new THREE.CircleGeometry(14, 32);
    waterGeo.rotateX(-Math.PI / 2);

    const waterMat = new THREE.MeshStandardMaterial({
      color: 0x087F78,
      roughness: 0.12,
      metalness: 0.4,
      transparent: true,
      opacity: 0.85
    });

    const water = new THREE.Mesh(waterGeo, waterMat);
    water.position.set(-14, -0.2, 4);
    this.scene.add(water);

    // Swimming Golden Koi Fish
    this.fishList = [];
    const fishMat = new THREE.MeshStandardMaterial({
      color: 0xF4E2BB,
      emissive: 0xC5A46D,
      emissiveIntensity: 0.8
    });

    for (let i = 0; i < 4; i++) {
      const fish = new THREE.Mesh(new THREE.ConeGeometry(0.28, 1.1, 5), fishMat);
      fish.rotation.x = Math.PI / 2;
      fish.position.set(-14, -0.4, 4);
      fish.userData = {
        angle: (i / 4) * Math.PI * 2,
        speed: 0.015 + i * 0.005,
        radius: 3.5 + i * 1.8
      };
      this.scene.add(fish);
      this.fishList.push(fish);
    }

    // Floating Lotus Lily Pads
    const lilyMat = new THREE.MeshStandardMaterial({ color: 0x044d42 });
    for (let i = 0; i < 6; i++) {
      const pad = new THREE.Mesh(new THREE.CylinderGeometry(0.7, 0.7, 0.05, 8), lilyMat);
      const angle = (i / 6) * Math.PI * 2;
      pad.position.set(-14 + Math.cos(angle) * (4 + (i % 3) * 2), -0.15, 4 + Math.sin(angle) * (4 + (i % 3) * 2));
      this.scene.add(pad);
    }

    // Arched Wooden Bridge (Reference 3)
    const bridgeGroup = new THREE.Group();
    const woodMat = new THREE.MeshStandardMaterial({ color: 0x6e4726, roughness: 0.8 });

    // Arch Planks
    const plankGeo = new THREE.BoxGeometry(2.4, 0.18, 0.55);
    for (let i = -6; i <= 6; i++) {
      const plank = new THREE.Mesh(plankGeo, woodMat);
      const t = i / 6;
      const x = -13 + i * 0.7;
      const y = Math.cos(t * Math.PI * 0.5) * 1.4 - 0.2;
      const z = 2 + t * 0.8;
      plank.position.set(x, y, z);
      plank.rotation.z = -t * 0.35;
      bridgeGroup.add(plank);
    }

    // Bridge Side Railings & Posts
    const postGeo = new THREE.CylinderGeometry(0.08, 0.08, 1.2, 6);
    [-17, -14, -11, -8].forEach(px => {
      const p1 = new THREE.Mesh(postGeo, woodMat);
      p1.position.set(px, 1.2, 0.9);
      const p2 = new THREE.Mesh(postGeo, woodMat);
      p2.position.set(px, 1.2, 3.8);
      bridgeGroup.add(p1);
      bridgeGroup.add(p2);
    });

    // Glowing Bridge Lanterns
    const lanternGeo = new THREE.OctahedronGeometry(0.3, 0);
    const lanternMat = new THREE.MeshBasicMaterial({ color: 0xF4E2BB });
    const lanternLight = new THREE.PointLight(0xF4E2BB, 1.8, 15);

    const lantern = new THREE.Mesh(lanternGeo, lanternMat);
    lantern.position.set(-12.5, 2.2, 0.9);
    lanternLight.position.copy(lantern.position);
    bridgeGroup.add(lantern);
    bridgeGroup.add(lanternLight);

    this.scene.add(bridgeGroup);
  }

  buildGrandTreeOfLight() {
    // -------------------------------------------------------------------------
    // THE MAJESTIC GRAND TREE OF LITTLE THINGS (Matches Reference 1)
    // -------------------------------------------------------------------------
    this.centralTreeGroup = new THREE.Group();
    this.centralTreeGroup.position.set(0, 0, -10);

    const barkMat = new THREE.MeshStandardMaterial({
      color: 0x4a3219,
      roughness: 0.9,
      metalness: 0.1
    });

    // Sprawling Trunk Base & Spreading Roots
    const baseTrunk = new THREE.Mesh(new THREE.CylinderGeometry(2.4, 4.2, 7, 12), barkMat);
    baseTrunk.position.y = 3.5;
    baseTrunk.castShadow = true;
    this.centralTreeGroup.add(baseTrunk);

    const midTrunk = new THREE.Mesh(new THREE.CylinderGeometry(1.8, 2.4, 6, 10), barkMat);
    midTrunk.position.y = 8.5;
    midTrunk.rotation.z = 0.08;
    this.centralTreeGroup.add(midTrunk);

    // Spreading Branch Arms
    const branchGeo = new THREE.CylinderGeometry(0.8, 1.4, 6, 8);
    const branchAngles = [
      { rx: 0.35, rz: 0.65, y: 11, x: 2.2, z: 0 },
      { rx: -0.4, rz: -0.6, y: 11.5, x: -2.4, z: 1.2 },
      { rx: 0.5, rz: -0.3, y: 12, x: 0, z: -2.5 },
      { rx: -0.2, rz: 0.4, y: 12.5, x: 1.5, z: 2.0 }
    ];

    branchAngles.forEach(b => {
      const limb = new THREE.Mesh(branchGeo, barkMat);
      limb.position.set(b.x, b.y, b.z);
      limb.rotation.set(b.rx, 0, b.rz);
      this.centralTreeGroup.add(limb);
    });

    // Luminous Golden & Emerald Canopy Cloud Masses (Reference 1)
    const foliageMatGolden = new THREE.MeshStandardMaterial({
      color: 0xF4E2BB,
      emissive: 0xC5A46D,
      emissiveIntensity: 0.85,
      roughness: 0.65
    });

    const foliageMatEmerald = new THREE.MeshStandardMaterial({
      color: 0x087F78,
      emissive: 0x064E46,
      emissiveIntensity: 0.4,
      roughness: 0.7
    });

    const foliageClusters = [
      { x: 0, y: 17, z: 0, r: 6.5, golden: true },
      { x: 4.5, y: 15, z: 1.5, r: 4.8, golden: true },
      { x: -4.5, y: 15.5, z: 2, r: 5.0, golden: false },
      { x: 1.5, y: 16, z: -4.2, r: 5.2, golden: true },
      { x: -2.5, y: 17.5, z: -2.5, r: 4.5, golden: true },
      { x: 0, y: 20, z: 0, r: 4.2, golden: true },
      { x: 3.2, y: 13.5, z: -2.0, r: 3.8, golden: false },
      { x: -3.5, y: 13, z: 1.5, r: 3.8, golden: true }
    ];

    foliageClusters.forEach(f => {
      const mat = f.golden ? foliageMatGolden : foliageMatEmerald;
      const sphere = new THREE.Mesh(new THREE.DodecahedronGeometry(f.r, 2), mat);
      sphere.position.set(f.x, f.y, f.z);
      sphere.castShadow = true;
      this.centralTreeGroup.add(sphere);
    });

    // Internal Radiant Golden Canopy Lights
    const innerLight1 = new THREE.PointLight(0xF4E2BB, 3.8, 45);
    innerLight1.position.set(0, 16, 0);
    this.centralTreeGroup.add(innerLight1);

    const innerLight2 = new THREE.PointLight(0xFFF9EF, 2.5, 30);
    innerLight2.position.set(2, 14, 2);
    this.centralTreeGroup.add(innerLight2);

    // Interactive Leaves of Little Things around the base and lower branches
    const leavesData = this.config.treeOfLittleThings?.leaves || [];
    this.treeLeavesMeshes = [];

    leavesData.forEach((leaf, idx) => {
      const leafGeo = new THREE.OctahedronGeometry(0.7, 0);
      const leafMat = new THREE.MeshStandardMaterial({
        color: 0xF4E2BB,
        emissive: 0xC5A46D,
        emissiveIntensity: 1.2
      });

      const leafMesh = new THREE.Mesh(leafGeo, leafMat);
      const angle = (idx / leavesData.length) * Math.PI * 2;
      const rad = 3.5 + (idx % 3) * 1.2;
      leafMesh.position.set(Math.cos(angle) * rad, 4.2 + (idx % 4) * 1.5, Math.sin(angle) * rad);
      leafMesh.userData = { isLeaf: true, leafData: leaf, index: idx };
      this.centralTreeGroup.add(leafMesh);
      this.treeLeavesMeshes.push(leafMesh);
    });

    this.scene.add(this.centralTreeGroup);
  }

  buildVolumetricGodRays() {
    // -------------------------------------------------------------------------
    // VOLUMETRIC GOD RAYS / SUNBEAMS (Matches Reference 1)
    // -------------------------------------------------------------------------
    this.godRays = [];

    const rayMat = new THREE.MeshBasicMaterial({
      color: 0xF4E2BB,
      transparent: true,
      opacity: 0.16,
      side: THREE.DoubleSide,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });

    const rayConfigs = [
      { pos: [8, 14, -2], rotZ: -0.45, rotX: 0.25, h: 42, rTop: 1.5, rBot: 8.0 },
      { pos: [14, 16, 4], rotZ: -0.48, rotX: 0.18, h: 46, rTop: 2.0, rBot: 9.5 },
      { pos: [2, 18, -6], rotZ: -0.42, rotX: 0.32, h: 48, rTop: 2.5, rBot: 11.0 }
    ];

    rayConfigs.forEach(rc => {
      const rayGeo = new THREE.CylinderGeometry(rc.rTop, rc.rBot, rc.h, 16, 1, true);
      const ray = new THREE.Mesh(rayGeo, rayMat);
      ray.position.set(rc.pos[0], rc.pos[1], rc.pos[2]);
      ray.rotation.z = rc.rotZ;
      ray.rotation.x = rc.rotX;
      this.scene.add(ray);
      this.godRays.push(ray);
    });
  }

  buildEnchantedForestFoliage() {
    // Stylized Forest Background Trees framing the scene
    const trunkMat = new THREE.MeshStandardMaterial({ color: 0x3d2b1a, roughness: 0.9 });
    const foliageMat = new THREE.MeshStandardMaterial({ color: 0x044d42, roughness: 0.8 });

    const treePositions = [
      [-28, 0, -20], [-22, 0, -28], [-12, 0, -32], [14, 0, -30], [24, 0, -24],
      [32, 0, -12], [28, 0, 4], [22, 0, 18], [-28, 0, 12], [-24, 0, 24]
    ];

    treePositions.forEach(tp => {
      const group = new THREE.Group();
      const height = 9 + Math.random() * 5;

      const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.5, 0.8, height * 0.5, 7), trunkMat);
      trunk.position.y = height * 0.25;
      group.add(trunk);

      // Layered conical foliage
      for (let l = 0; l < 3; l++) {
        const cone = new THREE.Mesh(new THREE.ConeGeometry(3.2 - l * 0.6, 4.0, 7), foliageMat);
        cone.position.y = height * 0.4 + l * 2.2;
        group.add(cone);
      }

      group.position.set(tp[0], tp[1], tp[2]);
      this.scene.add(group);
    });
  }

  buildWildflowerMeadow() {
    // -------------------------------------------------------------------------
    // VIBRANT WILDFLOWER CARPET (Yellows, Pinks, Violets & Daisies - Ref 1 & 3)
    // -------------------------------------------------------------------------
    const flowerColors = [0xF4E2BB, 0xFFF9EF, 0xE8D7B5, 0xC5A46D, 0xDCEEE6];
    const flowerCount = 140;

    const petalGeo = new THREE.CircleGeometry(0.35, 6);
    petalGeo.rotateX(-Math.PI / 2);

    for (let i = 0; i < flowerCount; i++) {
      const col = flowerColors[Math.floor(Math.random() * flowerColors.length)];
      const fMat = new THREE.MeshStandardMaterial({
        color: col,
        emissive: col,
        emissiveIntensity: 0.35,
        roughness: 0.6
      });

      const fl = new THREE.Mesh(petalGeo, fMat);
      const angle = Math.random() * Math.PI * 2;
      const dist = 6 + Math.random() * 32;
      const x = Math.cos(angle) * dist;
      const z = Math.sin(angle) * dist;

      // Keep out of deep water
      if (Math.hypot(x - -14, z - 4) < 12) continue;

      fl.position.set(x, 0.18 + Math.random() * 0.15, z);
      fl.rotation.y = Math.random() * Math.PI;
      this.scene.add(fl);
    }
  }

  build12HeroBlossoms() {
    const flowersData = this.config.flowers || [];
    this.interactiveFlowers = [];

    flowersData.forEach((flData, idx) => {
      const flowerGroup = new THREE.Group();
      const pos = flData.pos || [0, 0, 0];

      // Slender Botanical Stem
      const stemGeo = new THREE.CylinderGeometry(0.06, 0.08, 1.4, 6);
      const stemMat = new THREE.MeshStandardMaterial({ color: 0x064E46, roughness: 0.8 });
      const stem = new THREE.Mesh(stemGeo, stemMat);
      stem.position.y = 0.7;
      flowerGroup.add(stem);

      // Multi-Petal Blossom Head
      const blossomGroup = new THREE.Group();
      blossomGroup.position.y = 1.4;

      const petalColor = flData.color || 0xF4E2BB;
      const petalMat = new THREE.MeshStandardMaterial({
        color: petalColor,
        emissive: petalColor,
        emissiveIntensity: 0.9,
        roughness: 0.3
      });

      // 8 Botanical Petals radiating outward
      const pGeo = new THREE.ConeGeometry(0.28, 0.9, 5);
      pGeo.rotateX(Math.PI / 2);

      for (let p = 0; p < 8; p++) {
        const petal = new THREE.Mesh(pGeo, petalMat);
        const pAngle = (p / 8) * Math.PI * 2;
        petal.position.set(Math.cos(pAngle) * 0.45, 0, Math.sin(pAngle) * 0.45);
        petal.rotation.y = -pAngle;
        petal.rotation.x = 0.25;
        blossomGroup.add(petal);
      }

      // Golden Blossom Stamen Center
      const centerGeo = new THREE.SphereGeometry(0.25, 12, 12);
      const centerMat = new THREE.MeshBasicMaterial({ color: 0xFFF9EF });
      const center = new THREE.Mesh(centerGeo, centerMat);
      blossomGroup.add(center);

      // Bioluminescent Halo Aura
      const auraGeo = new THREE.RingGeometry(0.6, 1.5, 16);
      const auraMat = new THREE.MeshBasicMaterial({
        color: petalColor,
        transparent: true,
        opacity: 0.45,
        side: THREE.DoubleSide,
        blending: THREE.AdditiveBlending
      });
      const aura = new THREE.Mesh(auraGeo, auraMat);
      aura.rotation.x = Math.PI / 2;
      blossomGroup.add(aura);

      flowerGroup.add(blossomGroup);
      flowerGroup.position.set(pos[0], pos[1], pos[2]);

      flowerGroup.userData = {
        isFlower: true,
        fData: flData,
        index: idx,
        blossomGroup: blossomGroup,
        auraMesh: aura
      };

      this.scene.add(flowerGroup);
      this.interactiveFlowers.push(flowerGroup);
    });
  }

    spawnAnimatedButterflies() {
    this.butterflies = [];
    const butterflyCount = 16;

    // 5 Distinct Color Species requested in Section 4.3:
    // Emerald, Golden, Ivory, Aquamarine, Soft Pastel
    const speciesColors = [
      { color: 0x087F78, emissive: 0x064E46, name: "Emerald" },
      { color: 0xF4E2BB, emissive: 0xC5A46D, name: "Golden" },
      { color: 0xFFF9EF, emissive: 0xE8D7B5, name: "Ivory" },
      { color: 0x83C5BE, emissive: 0x4D9E9B, name: "Aquamarine" },
      { color: 0x9ED8D0, emissive: 0x376B5B, name: "Soft Pastel" }
    ];

    const wingGeo = new THREE.PlaneGeometry(0.55, 0.45);

    for (let i = 0; i < butterflyCount; i++) {
      const bGroup = new THREE.Group();
      const spec = speciesColors[i % speciesColors.length];

      const wingMat = new THREE.MeshStandardMaterial({
        color: spec.color,
        emissive: spec.emissive,
        emissiveIntensity: 0.85,
        side: THREE.DoubleSide
      });

      const leftWing = new THREE.Mesh(wingGeo, wingMat);
      leftWing.position.x = -0.28;
      bGroup.add(leftWing);

      const rightWing = new THREE.Mesh(wingGeo, wingMat);
      rightWing.position.x = 0.28;
      bGroup.add(rightWing);

      // Trajectories: flight paths around flowers, tree, and near camera
      const trajectory = {
        centerX: (Math.random() - 0.5) * 28,
        centerZ: (Math.random() - 0.5) * 28,
        radiusX: 5 + Math.random() * 9,
        radiusZ: 4 + Math.random() * 8,
        speed: 0.6 + Math.random() * 0.8,
        phase: Math.random() * Math.PI * 2,
        heightBase: 2.2 + Math.random() * 5.5,
        yFrequency: 1.4 + Math.random() * 1.6,
        bankFactor: 0.35 + Math.random() * 0.25
      };

      bGroup.userData = { leftWing, rightWing, trajectory, wingMat };
      this.scene.add(bGroup);
      this.butterflies.push(bGroup);
    }
  }

    spawnLivingWildlife() {
    this.wildlife = [];

    // 1. Hopping Rabbits near the pathway
    const furMat = new THREE.MeshStandardMaterial({ color: 0xE8D7B5 });
    for (let r = 0; r < 2; r++) {
      const bunny = new THREE.Group();
      bunny.add(new THREE.Mesh(new THREE.SphereGeometry(0.4, 8, 8), furMat)); // Body
      const head = new THREE.Mesh(new THREE.SphereGeometry(0.25, 8, 8), furMat);
      head.position.set(0.25, 0.3, 0);
      bunny.add(head);
      // Ears
      const ear1 = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.08, 0.35, 6), furMat);
      ear1.position.set(0.25, 0.55, 0.08);
      bunny.add(ear1);
      const ear2 = ear1.clone();
      ear2.position.z = -0.08;
      bunny.add(ear2);

      bunny.position.set(3.5 + r * 3, 0.4, 16 - r * 6);
      this.scene.add(bunny);
      this.wildlife.push({ mesh: bunny, type: "rabbit", phase: r * 1.5, basePos: bunny.position.clone() });
    }

    // 2. Graceful Deer walking through woodland clearing
    const deer = new THREE.Group();
    const fawnMat = new THREE.MeshStandardMaterial({ color: 0x8c5b32 });
    const deerBody = new THREE.Mesh(new THREE.CylinderGeometry(0.5, 0.6, 2.2, 8), fawnMat);
    deerBody.rotation.z = Math.PI / 2;
    deer.add(deerBody);
    const deerNeck = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.35, 1.4, 8), fawnMat);
    deerNeck.position.set(1.0, 0.7, 0);
    deerNeck.rotation.z = -Math.PI / 5;
    deer.add(deerNeck);
    const deerHead = new THREE.Mesh(new THREE.SphereGeometry(0.3, 8, 8), fawnMat);
    deerHead.position.set(1.4, 1.4, 0);
    deer.add(deerHead);

    deer.position.set(-18, 1.4, -18);
    this.scene.add(deer);
    this.wildlife.push({ mesh: deer, type: "deer", phase: 1.5, basePos: deer.position.clone() });

    // 3. Squirrels moving around tree trunk
    const sqMat = new THREE.MeshStandardMaterial({ color: 0xA66838 });
    const squirrel = new THREE.Group();
    squirrel.add(new THREE.Mesh(new THREE.SphereGeometry(0.22, 6, 6), sqMat)); // Body
    const sqTail = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.12, 0.5, 6), sqMat);
    sqTail.position.set(-0.2, 0.2, 0);
    sqTail.rotation.z = -Math.PI / 4;
    squirrel.add(sqTail);
    squirrel.position.set(1.8, 1.2, -0.5);
    this.scene.add(squirrel);
    this.wildlife.push({ mesh: squirrel, type: "squirrel", phase: 0.8, basePos: squirrel.position.clone() });

    // 4. Flying Birds overhead & perched on branches
    const birdMat = new THREE.MeshStandardMaterial({ color: 0x0cb3a7, emissive: 0x064E46 });
    for (let b = 0; b < 3; b++) {
      const bird = new THREE.Group();
      bird.add(new THREE.Mesh(new THREE.ConeGeometry(0.18, 0.6, 5), birdMat)); // Body
      const wingL = new THREE.Mesh(new THREE.PlaneGeometry(0.4, 0.2), birdMat);
      wingL.position.set(0, 0, 0.25);
      bird.add(wingL);
      const wingR = new THREE.Mesh(new THREE.PlaneGeometry(0.4, 0.2), birdMat);
      wingR.position.set(0, 0, -0.25);
      bird.add(wingR);

      bird.position.set(0, 16 + b * 2, 0);
      this.scene.add(bird);
      this.wildlife.push({ mesh: bird, type: "bird", phase: b * 2.1, wingL, wingR, altitude: 16 + b * 2.5, radius: 18 + b * 6 });
    }
  }

  createGoldenSporeParticles() {
    // 80 Floating Golden Forest Spores / Fireflies (Reference 1)
    const sporeCount = 80;
    const geo = new THREE.BufferGeometry();
    const pos = new Float32Array(sporeCount * 3);
    const basePos = new Float32Array(sporeCount * 3);

    for (let i = 0; i < sporeCount; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 45;
      pos[i * 3 + 1] = 1.0 + Math.random() * 16.0;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 45;
      basePos[i * 3] = pos[i * 3];
      basePos[i * 3 + 1] = pos[i * 3 + 1];
      basePos[i * 3 + 2] = pos[i * 3 + 2];
    }

    geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));

    const mat = new THREE.PointsMaterial({
      size: 2.4,
      color: 0xF4E2BB,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending
    });

    this.spores = new THREE.Points(geo, mat);
    this.spores.userData = { basePositions: basePos };
    this.scene.add(this.spores);
  }

  setViewpoint(id) {
    this.currentViewpoint = id;

    // Viewpoint presets matching Reference 1 & 3
    if (id === "vista") {
      this.cameraTargetPos.set(0, 16, 48);
      this.cameraLookAt.set(0, 5, 0);
    } else if (id === "tree") {
      this.cameraTargetPos.set(0, 9, 8);
      this.cameraLookAt.set(0, 16, -10);
    } else if (id === "pond") {
      this.cameraTargetPos.set(-8, 5, 16);
      this.cameraLookAt.set(-14, 1.5, 4);
    } else if (id === "meadow") {
      this.cameraTargetPos.set(10, 4.5, 20);
      this.cameraLookAt.set(14, 1.2, 6);
    }

    // Update active button state
    document.querySelectorAll(".garden-viewpoint-pill").forEach(pill => {
      pill.classList.toggle("active", pill.dataset.viewpoint === id);
    });
  }

  selectFlower(flowerGroup) {
    const fData = flowerGroup.userData.fData;
    const idx = flowerGroup.userData.index;
    this.exploredFlowers.add(idx);

    // Synchronize with 2D botanical cards and global state
    if (window.notifyFlowerExplored) {
      window.notifyFlowerExplored(idx, fData.id);
    }

    // Focus Camera on Flower
    this.cameraTargetPos.set(fData.pos[0] + 1.2, fData.pos[1] + 2.2, fData.pos[2] + 4.2);
    this.cameraLookAt.set(fData.pos[0], fData.pos[1] + 1.2, fData.pos[2]);

    // Animate bloom flare
    flowerGroup.userData.blossomGroup.scale.set(1.35, 1.35, 1.35);
    flowerGroup.userData.auraMesh.material.opacity = 0.8;

    // Show Flower Compliment Modal
    this.showFlowerModal(fData, idx);

    // Check if whole garden explored (all configured flowers) to illuminate central tree
    const totalFlowers = this.config.flowers ? this.config.flowers.length : 12;
    if (this.exploredFlowers.size >= totalFlowers && !this.isTreeIlluminated) {
      this.illuminateTreeOfLittleThings();
    }
  }

  onFlowerExplored(idx) {
    this.exploredFlowers.add(idx);
    if (this.interactiveFlowers && this.interactiveFlowers[idx]) {
      const f = this.interactiveFlowers[idx];
      if (f.userData?.blossomGroup) {
        f.userData.blossomGroup.scale.set(1.3, 1.3, 1.3);
      }
      if (f.userData?.auraMesh) {
        f.userData.auraMesh.material.opacity = 0.75;
      }
    }
    const totalFlowers = this.config.flowers ? this.config.flowers.length : 12;
    if (this.exploredFlowers.size >= totalFlowers && !this.isTreeIlluminated) {
      this.illuminateTreeOfLittleThings();
    }
  }

  selectLeaf(leafMesh) {
    const lData = leafMesh.userData.leafData;
    const idx = leafMesh.userData.index;

    // Focus Camera on Leaf
    const worldPos = new THREE.Vector3();
    leafMesh.getWorldPosition(worldPos);
    this.cameraTargetPos.set(worldPos.x + 1.2, worldPos.y + 1.5, worldPos.z + 3.8);
    this.cameraLookAt.copy(worldPos);

    // Show Luxury Modal (NO ALERT BOX)
    if (!this.modal) return;
    this.modal.innerHTML = `
      <div class="flower-modal-inner">
        <button class="flower-modal-close" id="garden-modal-close-btn" aria-label="Close">✕</button>
        <span class="badge-gold">✦ THE TREE OF LITTLE THINGS ✦</span>
        <h3 class="flower-modal-title gold-text">${lData.title}</h3>
        <div class="flower-modal-compliment" style="margin-top: 14px;">“${lData.text}”</div>
        <div class="flower-modal-progress" style="margin-top: 18px;">Leaf ${idx + 1} of ${this.config.treeOfLittleThings.leaves.length} Cherished</div>
      </div>
    `;
    this.modal.classList.add("active");

    const closeBtn = document.getElementById("garden-modal-close-btn");
    if (closeBtn) {
      closeBtn.addEventListener("click", () => {
        this.modal.classList.remove("active");
        this.setViewpoint("tree");
      });
    }
  }

  showFlowerModal(fData, idx) {
    if (!this.modal) return;

    this.modal.innerHTML = `
      <div class="flower-modal-inner">
        <button class="flower-modal-close" id="garden-modal-close-btn" aria-label="Close dedication">✕</button>
        <span class="badge-gold">✦ LIVING BOTANICAL DEDICATION ✦</span>
        <h3 class="flower-modal-title gold-text">${fData.name}</h3>
        <div class="flower-modal-variety">${fData.variety}</div>
        <div class="flower-modal-compliment">“${fData.compliment}”</div>
        <div class="flower-modal-progress">Blossom ${idx + 1} of ${this.config.flowers.length} Discovered</div>
        <div style="margin-top: 16px;">
          <button class="btn-luxury" id="garden-modal-next-btn">
            <span>Continue Walking</span> <span>✦</span>
          </button>
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
    if (this.centralTreeGroup) {
      const treeGlowLight = new THREE.PointLight(0xF4E2BB, 4.0, 40);
      treeGlowLight.position.set(0, 16, 0);
      this.centralTreeGroup.add(treeGlowLight);
    }
  }

  bindEvents() {
    // Window Resize (Debounced)
    let resizeTimer = null;
    window.addEventListener("resize", () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        if (!this.container || !this.renderer || !this.camera) return;
        const w = this.container.clientWidth;
        const h = this.container.clientHeight;
        if (w === 0 || h === 0) return;
        this.camera.aspect = w / h;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(w, h);
      }, 100);
    });

    // Viewpoint Navigation Buttons (Click + Keyboard Accessibility)
    const navBar = document.getElementById("garden-viewpoint-nav");
    if (navBar) {
      navBar.addEventListener("click", (e) => {
        const btn = e.target.closest(".garden-viewpoint-pill");
        if (btn) {
          const vpId = btn.dataset.viewpoint;
          this.setViewpoint(vpId);
        }
      });

      navBar.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          const btn = e.target.closest(".garden-viewpoint-pill");
          if (btn) {
            e.preventDefault();
            const vpId = btn.dataset.viewpoint;
            this.setViewpoint(vpId);
          }
        }
      });
    }

    // Modal Escape Key and Backdrop Click
    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && this.modal && this.modal.classList.contains("active")) {
        this.modal.classList.remove("active");
        this.setViewpoint("vista");
      }
    });

    if (this.modal) {
      this.modal.addEventListener("click", (e) => {
        if (e.target === this.modal) {
          this.modal.classList.remove("active");
          this.setViewpoint("vista");
        }
      });
    }

    // Pointer Events for Cross-Device Interaction (Distinguishes Pan/Drag from Tap)
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
        if (dist > 8) {
          didDrag = true;
        }
      }
    });

    this.container.addEventListener("pointerup", (e) => {
      if (!isDown) return;
      isDown = false;

      // If dragged > 8px, it is navigation/orbit gesture, NOT flower selection
      if (didDrag) return;

      const rect = this.container.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;
      this.mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      this.mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      this.raycaster.setFromCamera(this.mouse, this.camera);
      const intersects = this.raycaster.intersectObjects(this.scene.children, true);

      for (let hit of intersects) {
        let parent = hit.object.parent;
        while (parent) {
          if (parent.userData?.isFlower) {
            this.selectFlower(parent);
            return;
          }
          parent = parent.parent;
        }
        if (hit.object.userData?.isLeaf) {
          this.selectLeaf(hit.object);
          return;
        }
      }
    });

    this.container.addEventListener("pointercancel", () => {
      isDown = false;
      didDrag = false;
    });

    // IntersectionObserver Lifecycle (Pause WebGL when offscreen)
    if ("IntersectionObserver" in window) {
      this.observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          this.isVisible = entry.isIntersecting;
          if (this.isVisible && !this.animationId && !document.hidden) {
            this.clock.getDelta(); // Reset delta to prevent jumps
            this.animate();
          }
        });
      }, { threshold: 0.05 });
      this.observer.observe(this.container);
    }

    // Tab visibility change
    document.addEventListener("visibilitychange", () => {
      if (!document.hidden && this.isVisible && !this.animationId) {
        this.clock.getDelta();
        this.animate();
      }
    });
  }

  animate() {
    if (!this.isVisible || document.hidden) {
      this.animationId = null;
      return;
    }

    this.animationId = requestAnimationFrame(() => this.animate());

    const delta = Math.min(this.clock.getDelta(), 0.1);
    const time = this.clock.getElapsedTime();

    // 1. Animate 3D Butterflies flapping and flight curves
    this.butterflies.forEach(b => {
      const d = b.userData.trajectory;
      const t = time * d.speed + d.phase;

      // Realistic flapping wing cycles
      const flap = Math.sin(time * 18 + d.phase) * 0.75;
      b.userData.leftWing.rotation.y = flap;
      b.userData.rightWing.rotation.y = -flap;

      // Smooth 3D Trajectory around the flowers & trees
      b.position.x = d.centerX + Math.sin(t) * d.radiusX;
      b.position.z = d.centerZ + Math.cos(t) * d.radiusZ;
      b.position.y = d.heightBase + Math.sin(t * d.yFrequency) * 1.2;

      b.rotation.y = -t + Math.PI / 2;
    });

    // 2. Animate Swimming Koi Fish in Pond (Frame-rate independent deterministic orbits)
    this.fishList.forEach((fish, idx) => {
      const d = fish.userData;
      const angle = time * (d.speed * 28) + (idx * 1.8);
      fish.position.x = -14 + Math.cos(angle) * d.radius;
      fish.position.z = 4 + Math.sin(angle) * (d.radius * 0.7);
      fish.rotation.y = -angle + Math.PI / 2;
      fish.rotation.z = Math.sin(time * 6 + idx) * 0.12; // Tail wiggle
    });

    // 3. Animate Living Garden Wildlife Ecosystem (Section 4.4)
    this.wildlife.forEach(w => {
      if (w.type === "rabbit") {
        const hop = Math.max(0, Math.sin(time * 2.5 + w.phase));
        w.mesh.position.y = 0.4 + hop * 0.45;
        w.mesh.position.x = w.basePos.x + Math.sin(time * 0.8 + w.phase) * 0.5;
      } else if (w.type === "deer") {
        // Slow peaceful walking & head turning
        w.mesh.rotation.y = -Math.PI / 4 + Math.sin(time * 0.6) * 0.12;
        w.mesh.position.x = w.basePos.x + Math.sin(time * 0.2) * 1.5;
      } else if (w.type === "squirrel") {
        // Scampering up and down tree trunk
        w.mesh.position.y = 1.2 + Math.abs(Math.sin(time * 1.8 + w.phase)) * 2.2;
        w.mesh.rotation.y = time * 0.8;
      } else if (w.type === "bird") {
        // Circling overhead in graceful sweeping arcs
        const bAngle = time * 0.7 + w.phase;
        w.mesh.position.x = Math.cos(bAngle) * w.radius;
        w.mesh.position.z = Math.sin(bAngle) * w.radius;
        w.mesh.position.y = w.altitude + Math.sin(time * 1.5 + w.phase) * 1.0;
        w.mesh.rotation.y = -bAngle + Math.PI / 2;
        const bFlap = Math.sin(time * 12 + w.phase) * 0.6;
        if (w.wingL) w.wingL.rotation.x = bFlap;
        if (w.wingR) w.wingR.rotation.x = -bFlap;
      }
    });

    // 4. Subtle Flower Breeze Sway
    this.interactiveFlowers.forEach((f, idx) => {
      f.userData.blossomGroup.rotation.z = Math.sin(time * 1.5 + idx) * 0.08;
      f.userData.blossomGroup.rotation.x = Math.cos(time * 1.2 + idx) * 0.06;
    });

    // 5. Pulsing Volumetric God Rays
    this.godRays.forEach((ray, idx) => {
      ray.material.opacity = 0.14 + Math.sin(time * 1.2 + idx) * 0.04;
    });

    // 6. Golden Forest Spores / Fireflies (Bounded oscillation: zero cumulative drift)
    if (this.spores && this.spores.userData?.basePositions) {
      const p = this.spores.geometry.attributes.position;
      const basePos = this.spores.userData.basePositions;
      for (let i = 0; i < p.count; i++) {
        const phase = (i * 0.37) % (Math.PI * 2);
        const y = basePos[i * 3 + 1] + Math.sin(time * 1.4 + phase) * 1.2;
        const x = basePos[i * 3] + Math.sin(time * 0.7 + phase) * 0.6;
        const z = basePos[i * 3 + 2] + Math.cos(time * 0.7 + phase) * 0.6;
        p.setXYZ(i, x, y, z);
      }
      p.needsUpdate = true;
    }

    // 7. Frame-Rate Independent Camera Lerping
    const lerpFactor = 1 - Math.exp(-4.2 * delta);
    this.camera.position.x += (this.cameraTargetPos.x - this.camera.position.x) * lerpFactor;
    this.camera.position.y += (this.cameraTargetPos.y - this.camera.position.y) * lerpFactor;
    this.camera.position.z += (this.cameraTargetPos.z - this.camera.position.z) * lerpFactor;

    this.currentLookAt.x += (this.cameraLookAt.x - this.currentLookAt.x) * lerpFactor;
    this.currentLookAt.y += (this.cameraLookAt.y - this.currentLookAt.y) * lerpFactor;
    this.currentLookAt.z += (this.cameraLookAt.z - this.currentLookAt.z) * lerpFactor;
    this.camera.lookAt(this.currentLookAt);

    this.renderer.render(this.scene, this.camera);
  }

  destroy() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }
    if (this.observer) {
      this.observer.disconnect();
    }
    if (this.renderer && this.renderer.domElement) {
      this.renderer.domElement.remove();
      this.renderer.dispose();
    }
  }
}

window.EnchantedGarden3D = EnchantedGarden3D;
