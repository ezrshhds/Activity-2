import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import * as dat from 'lil-gui';
import { Water } from 'three/examples/jsm/objects/Water2.js';

/**
 * Base
 */
// Debug
const gui = new dat.GUI();

// Canvas
const canvas = document.querySelector('canvas.webgl');

// Scene
const scene = new THREE.Scene();

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader();
const mossColorTexture = textureLoader.load('/textures/moss/color.png');
const mossNormalTexture = textureLoader.load('/textures/moss/normal.png');
const mossRoughnessTexture = textureLoader.load('/textures/moss/roughness.png');

/**
 * Tree
 */
// Tree trunk
const trunkGeometry = new THREE.CylinderGeometry(0.5, 0.5, 7, 16);
const trunkMaterial = new THREE.MeshStandardMaterial({ color: '#8B4513' }); // Brown color for trunk
const trunk = new THREE.Mesh(trunkGeometry, trunkMaterial);
trunk.position.set(0, 1.5, 0); // Position the trunk above the ground
trunk.castShadow = true;
scene.add(trunk);

/**
 * Tree Foliage (Fuller and Larger Bush-style)
 */
const bushGeometry = new THREE.SphereGeometry(1, 16, 16);
const bushMaterial = new THREE.MeshStandardMaterial({ color: '#228B22' }); // Green color for foliage

const foliage = new THREE.Group(); // Group to hold all the bush pieces

// Add larger bush pieces
const largeBush1 = new THREE.Mesh(bushGeometry, bushMaterial);
largeBush1.scale.set(1.5, 1.5, 1.5);
largeBush1.position.set(0, 3, 0);
foliage.add(largeBush1);

const largeBush2 = new THREE.Mesh(bushGeometry, bushMaterial);
largeBush2.scale.set(1.2, 1.2, 1.2);
largeBush2.position.set(1, 1.5, 0.8);
foliage.add(largeBush2);

const largeBush3 = new THREE.Mesh(bushGeometry, bushMaterial);
largeBush3.scale.set(1.2, 1.2, 1.2);
largeBush3.position.set(-1, 1.5, 0.8);
foliage.add(largeBush3);

const largeBush4 = new THREE.Mesh(bushGeometry, bushMaterial);
largeBush4.scale.set(1.7, 1.7, 1.7);
largeBush4.position.set(1, 3, 0.5);
foliage.add(largeBush4);

const largeBush5 = new THREE.Mesh(bushGeometry, bushMaterial);
largeBush5.scale.set(1.7, 1.7, 1.7);
largeBush5.position.set(-1, 3, 0.5);
foliage.add(largeBush5);

const largeBush6 = new THREE.Mesh(bushGeometry, bushMaterial);
largeBush6.scale.set(1.7, 1.7, 1.7);
largeBush6.position.set(-1, 4, -1);
foliage.add(largeBush6);

// Add medium bush pieces
const mediumBush1 = new THREE.Mesh(bushGeometry, bushMaterial);
mediumBush1.scale.set(0.8, 0.8, 0.8);
mediumBush1.position.set(0.3, 2, -0.4);
foliage.add(mediumBush1);

const mediumBush2 = new THREE.Mesh(bushGeometry, bushMaterial);
mediumBush2.scale.set(0.8, 0.8, 0.8);
mediumBush2.position.set(-0.6, 2, -0.6);
foliage.add(mediumBush2);

const mediumBush3 = new THREE.Mesh(bushGeometry, bushMaterial);
mediumBush3.scale.set(0.7, 0.7, 0.7);
mediumBush3.position.set(0.4, 2, 0.4);
foliage.add(mediumBush3);

const mediumBush4 = new THREE.Mesh(bushGeometry, bushMaterial);
mediumBush4.scale.set(0.7, 0.7, 0.7);
mediumBush4.position.set(-0.4, 2, -0.4);
foliage.add(mediumBush4);

const mediumBush5 = new THREE.Mesh(bushGeometry, bushMaterial);
mediumBush5.scale.set(1.2, 1.2, 1.2);
mediumBush5.position.set(-0.4, 2, -1.6);
foliage.add(mediumBush5);

const mediumBush6 = new THREE.Mesh(bushGeometry, bushMaterial);
mediumBush6.scale.set(1.2, 1.2, 1.2);
mediumBush6.position.set(1, 2.3, -1.6);
foliage.add(mediumBush6);

// Add small bush pieces for finer details
for (let i = 0; i < 6; i++) {
    const smallBush = new THREE.Mesh(bushGeometry, bushMaterial);
    smallBush.scale.set(0.5, 0.5, 0.5);
    smallBush.position.set(
        (Math.random() - 0.5) * 2, // Random spread around the trunk
        3.6 + Math.random() * 0.5, // Random height slightly above the trunk
        (Math.random() - 0.5) * 2
    );
    foliage.add(smallBush);
}

/**
 * Tree Branches
 */
const branchGeometry = new THREE.CylinderGeometry(0.10, 0.2, 2, 4); // Narrow cylinder for branches
const branchMaterial = new THREE.MeshStandardMaterial({ color: '#8B4513' }); // Brown color for branches

const branches = new THREE.Group(); // Group to hold all branches

// Define branch positions and rotations
const branchPositions = [
    { x: 0.1, y: 4.04, z: 0.5, rotation: [0.7, 0.2, 0] },
    { x: -0.3, y: 4, z: -0.5, rotation: [-0.8, 1, 0.4] },
    { x: 0.5, y: 4.8, z: -0.5, rotation: [-0.3, 3.6, 0.5] },
    { x: -0.5, y: 4, z: 0.3, rotation: [-0.10, 4, -0.5] }
];

// Create and position branches
branchPositions.forEach(position => {
    const branch = new THREE.Mesh(branchGeometry, branchMaterial);
    branch.position.set(position.x, position.y, position.z);
    branch.rotation.set(position.rotation[0], position.rotation[1], position.rotation[2]);
    branch.castShadow = true; // Enable shadows for branches
    branches.add(branch);
});

// Enable shadows for branches
branches.children.forEach(branch => {
    branch.castShadow = true;
});

// Add the branches to the scene
scene.add(branches);

/**
 * Adjust Foliage to be above the branches
 */
foliage.position.set(0, 3.5, 0); // Raised foliage above the trunk and branches

// Reposition and scale foliage elements to align better with branches
foliage.children.forEach(bush => {
    bush.position.y += Math.random() * 0.5; // Slight raise for finer distribution
    bush.position.x += Math.random() * 0.5; // Spread foliage pieces outward
    bush.position.z += Math.random() * 0.5; // Randomly spread along X and Z
});

// Add the foliage to the scene
scene.add(foliage);

/**
 * Mystic Crystals
 */
const crystals = new THREE.Group();
scene.add(crystals);

const crystalGeometry = new THREE.ConeGeometry(0.2, 1, 8);
const crystalMaterial = new THREE.MeshStandardMaterial({ color: '#44c9e8', emissive: '#0be4ff', emissiveIntensity: 0.3 });

for (let i = 0; i < 50; i++) {
    const crystal = new THREE.Mesh(crystalGeometry, crystalMaterial);

    // Random position
    const angle = Math.random() * Math.PI * 2; // Random angle
    const radius = 3 + Math.random() * 7; // Random radius
    const x = Math.cos(angle) * radius;
    const z = Math.sin(angle) * radius;
    
    // Place on ground (y = 0) or ocean floor (adjust as needed)
    const y = -1.5 + Math.random() * 0.5; // Place slightly above the ocean floor level or ground

    crystal.position.set(x, y, z);

    // Random rotation
    crystal.rotation.y = Math.random() * Math.PI * 2;

    // Random scale with some large crystals
    const isBigCrystal = Math.random() < 0.1; // 10% chance for a big crystal
    const scale = isBigCrystal ? 2 + Math.random() * 2 : 0.5 + Math.random();
    crystal.scale.set(scale, scale * 2, scale);

    // Enable shadows
    crystal.castShadow = true;

    // Add to group
    crystals.add(crystal);
}

/**
 * Fireflies
 */
const fireflyGeometry = new THREE.SphereGeometry(0.05, 8, 8);
const fireflyMaterial = new THREE.MeshBasicMaterial({ color: '#ffff00' });
const fireflies = new THREE.Group();
scene.add(fireflies);

for (let i = 0; i < 50; i++) {
    const firefly = new THREE.Mesh(fireflyGeometry, fireflyMaterial);
    firefly.position.set(
        (Math.random() - 0.5) * 20,
        Math.random() * 5,
        (Math.random() - 0.5) * 20
    );
    fireflies.add(firefly);
}

// Create the sphere geometry and material
const sphereGeometry = new THREE.SphereGeometry(9, 15, 5); // radius, width segments, height segments
const sphereMaterial = new THREE.MeshStandardMaterial({
    map: mossColorTexture,
    normalMap: mossNormalTexture,
    roughnessMap: mossRoughnessTexture
});

// Create the sphere mesh
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
sphere.position.set(0, -8, 0); // Position the sphere
sphere.geometry.setAttribute('uv2', new
THREE.Float32BufferAttribute(sphere.geometry.attributes.uv.array, 2))

mossColorTexture.repeat.set(10, 10)
mossNormalTexture.repeat.set(10, 10)
mossRoughnessTexture.repeat.set(10, 10)
mossColorTexture.wrapS = THREE.RepeatWrapping
mossNormalTexture.wrapS = THREE.RepeatWrapping
mossRoughnessTexture.wrapS = THREE.RepeatWrapping
mossColorTexture.wrapT = THREE.RepeatWrapping
mossNormalTexture.wrapT = THREE.RepeatWrapping
mossRoughnessTexture.wrapT = THREE.RepeatWrapping

scene.add(sphere);

const waterGeometry = new THREE.PlaneGeometry(36, 36); // Adjust size to fit your scene
const water = new Water(waterGeometry, {
    color: 0x0f5e9c, // Adjust water color
    waterNormals: textureLoader.load('/textures/water/normal.jpg'), // Normal map for water
});

water.rotation.x = -Math.PI * 0.5;
water.position.y = -1.5; // Position of water surface
scene.add(water);

const causticsTexture = textureLoader.load('/textures/water/caustics.jpg');
waterGeometry.alphaMap = causticsTexture;

// Create the ocean floor plane
const floorGeometry = new THREE.PlaneGeometry(50, 50); // Larger size for the ocean floor
const floorMaterial = new THREE.MeshStandardMaterial({ color: 'black' });

const floor = new THREE.Mesh(floorGeometry, floorMaterial);
floor.rotation.x = -Math.PI * 0.5; // Rotate to make it horizontal
floor.position.y = -2; // Position below the water level
scene.add(floor);


/**
 * Lights
 */
const ambientLight = new THREE.AmbientLight('#ffffff', 0.5);
scene.add(ambientLight);

// Directional Light with shadow targeting the tree
const directionalLight = new THREE.DirectionalLight('#ffffff', 2); // Increased intensity
directionalLight.position.set(10, 15, 10); // Light position
directionalLight.castShadow = true; // Enable shadow casting
directionalLight.target = trunk; // Set the target of the light to the tree trunk

// Adjust shadow properties
directionalLight.shadow.mapSize.set(2048, 2048); // Increase shadow resolution
directionalLight.shadow.camera.near = 1; // Near plane of shadow camera
directionalLight.shadow.camera.far = 20; // Far plane of shadow camera
directionalLight.shadow.camera.top = 10;
directionalLight.shadow.camera.right = 10;
directionalLight.shadow.camera.bottom = - 10;
directionalLight.shadow.camera.left = - 10;

scene.add(directionalLight); // Add the light to the scene
scene.add(directionalLight.target); // Add the target to the scene

// Enable shadows for tree parts (trunk, branches, foliage)
trunk.castShadow = true;
trunk.receiveShadow = true;

branches.children.forEach(branch => {
    branch.castShadow = true;
    branch.receiveShadow = true;
});

foliage.children.forEach(bush => {
    bush.castShadow = true;
    bush.receiveShadow = true;
});

// Enable shadows for the ocean floor and water
floor.receiveShadow = true;
water.receiveShadow = true;


/**
 * Fog
 */
const fog = new THREE.Fog('#223344', 5, 20);
scene.fog = fog;

/**
 * Camera
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
};

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100);
camera.position.set(10, 5, 10);
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

/**
 * Resize Event
 */
window.addEventListener('resize', () => {
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;

    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();

    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Animation
 */
const clock = new THREE.Clock();

const tick = () => {
    const elapsedTime = clock.getElapsedTime();

    // Animate fireflies
    fireflies.children.forEach((firefly, index) => {
        firefly.position.x += Math.sin(elapsedTime * 0.3 + index) * 0.01;
        firefly.position.z += Math.cos(elapsedTime * 0.3 + index) * 0.01;
        firefly.position.y = Math.abs(Math.sin(elapsedTime * 2 + index));
    });

    // Update controls
    controls.update();

    // Render
    renderer.render(scene, camera);

    // Call tick again on the next frame
    window.requestAnimationFrame(tick);
};

tick();
