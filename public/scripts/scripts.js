// Initialize Three.js scene with particles
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('container').appendChild(renderer.domElement);

const geometry = new THREE.SphereGeometry(0.5, 32, 32);
const material = new THREE.MeshBasicMaterial({ color: 0xffffff });
const particles = [];

for (let i = 0; i < 100; i++) {
    const particle = new THREE.Mesh(geometry, material);
    particle.position.set(Math.random() * 100 - 50, Math.random() * 100 - 50, Math.random() * 100 - 50);
    particle.velocity = new THREE.Vector3(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5);
    scene.add(particle);
    particles.push(particle);
}

camera.position.z = 5;

function animate() {
    requestAnimationFrame(animate);
    particles.forEach(particle => {
        particle.position.add(particle.velocity);
        if (particle.position.x > 50 || particle.position.x < -50) particle.velocity.x *= -1;
        if (particle.position.y > 50 || particle.position.y < -50) particle.velocity.y *= -1;
        if (particle.position.z > 50 || particle.position.z < -50) particle.velocity.z *= -1;
    });
    renderer.render(scene, camera);
}

animate();
