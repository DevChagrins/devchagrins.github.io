import './style.css'

import * as THREE from 'three';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#bg"),
})

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

camera.position.setZ(30);

renderer.render(scene, camera);


const material = new THREE.MeshStandardMaterial( { color: 0xFFD700, wireframe: false } );
const goldMaterial = new THREE.MeshPhongMaterial( { color: 0xC0C00C, specular: 0x010101 } );
const prismGeometry = EquilateralPrismGeometry(10, 10, 1);

const power = new THREE.Mesh(prismGeometry, goldMaterial);
const wisdom = new THREE.Mesh(prismGeometry, goldMaterial);
const courage = new THREE.Mesh(prismGeometry, goldMaterial);

const sun = new THREE.PointLight(0xFFFFFF);
sun.position.set(20, 20, 20);

const backgroundRadiation = new THREE.AmbientLight();
backgroundRadiation.intensity = 0.5;

power.position.y += 5;
wisdom.position.x += 5;
wisdom.position.y -= 5;
courage.position.x -= 5;
courage.position.y -= 5;

scene.add(power);
scene.add(wisdom);
scene.add(courage);

scene.add(sun, backgroundRadiation);

function animate() {
  requestAnimationFrame(animate);

  power.rotation.y += 0.005;
  wisdom.rotation.y += 0.005;
  courage.rotation.y += 0.005;

  renderer.render(scene, camera);
}

animate();

function EquilateralPrismGeometry(height, width, depth)
{
  let halfHeight = height / 2;
  let halfWidth = width / 2;
  let halfDepth = depth / 2;

  const geometry = new THREE.BufferGeometry();

  const vertices = new Float32Array([
    // Front triangle
    0, halfHeight, halfDepth,
    halfWidth, -halfHeight, halfDepth,
    -halfWidth, -halfHeight, halfDepth,

    // Back triangle
    0, halfHeight, -halfDepth,
    halfWidth, -halfHeight, -halfDepth,
    -halfWidth, -halfHeight, -halfDepth,
  ]);

  const indices = [
    0, 2, 1, // Front face
    0, 3, 2, // Left side - TR
    2, 3, 5, // Left side - BL
    3, 4, 5, // Back face
    3, 0, 4, // Right side - TR
    0, 1, 4, // Right side - BL
    1, 5, 4, // Bottom side - TR
    5, 1, 2, // Bottom side - BL
  ];

  geometry.setIndex(indices);
  geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
  let unindexedGeometry = geometry.toNonIndexed();
  unindexedGeometry.computeVertexNormals();
  
  return unindexedGeometry;
}