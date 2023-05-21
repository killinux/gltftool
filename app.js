import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

// 创建相机
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.x = 150;
camera.position.z = 50;
camera.position.y= 100;

// 创建渲染器
const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

// 创建场景
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xeaeaea);

// 添加灯光
const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
scene.add(ambientLight);


// 添加控制器
new OrbitControls(camera, document.body);

function animate() {
    requestAnimationFrame( animate );
    renderer.render( scene, camera );
}
animate();

const loader = new GLTFLoader();
//loader.load('./model/free_bmw_m3_e30.glb', (gltf) => {
//loader.load('./model/jill.glb', (gltf) => {
//loader.load('./model/jill/scene.gltf', (gltf) => {
loader.load('./model/tiny_house.glb', (gltf) => {
    scene.add(gltf.scene);
});
