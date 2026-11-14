const fs = require("fs");
const gardenPath = "c:\\Users\\rahul\\Desktop\\LOVE\\the-art-of-her\\js\\garden-3d.js";
let code = fs.readFileSync(gardenPath, "utf8");

// 1. Upgrade spawnAnimatedButterflies with the 5 distinct species
const newSpawnButterflies = `  spawnAnimatedButterflies() {
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
  }`;

code = code.replace(/spawnAnimatedButterflies\(\)\s*\{[\s\S]*?this\.butterflies\.push\(bGroup\);\s*\}\s*\}/, newSpawnButterflies);
console.log("Updated spawnAnimatedButterflies");

// 2. Upgrade spawnLivingWildlife to include Rabbits, Deer, Flying/Perched Birds, and Squirrels
const newSpawnWildlife = `  spawnLivingWildlife() {
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
  }`;

code = code.replace(/spawnLivingWildlife\(\)\s*\{[\s\S]*?this\.wildlife\.push\(\{\s*mesh:\s*deer[\s\S]*?\}\);\s*\}/, newSpawnWildlife);
console.log("Updated spawnLivingWildlife");

// 3. Update the animation loop for wildlife in animate()
const oldWildlifeAnim = `    // 3. Animate Wildlife Idle Moments
    this.wildlife.forEach(w => {
      if (w.type === "rabbit") {
        w.mesh.position.y = 0.4 + Math.max(0, Math.sin(time * 2.2 + w.phase)) * 0.3;
      } else if (w.type === "deer") {
        w.mesh.rotation.y = -Math.PI / 4 + Math.sin(time * 0.8) * 0.06;
      }
    });`;

const newWildlifeAnim = `    // 3. Animate Living Garden Wildlife Ecosystem (Section 4.4)
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
    });`;

if (code.includes(oldWildlifeAnim)) {
  code = code.replace(oldWildlifeAnim, newWildlifeAnim);
  console.log("Updated wildlife animation loop in garden-3d.js");
}

// 4. Add setupThemeListener to EnchantedGarden3D
if (!code.includes("setupThemeListener()")) {
  const themeListenerCode = `
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
`;
  code = code.replace("  setupScene() {", themeListenerCode + "\n  setupScene() {");
  code = code.replace("this.buildTerrainAndPathway();", "this.setupThemeListener();\n    this.buildTerrainAndPathway();");
  console.log("Added setupThemeListener to garden-3d.js");
}

fs.writeFileSync(gardenPath, code, "utf8");
console.log("garden-3d.js updated successfully!");
