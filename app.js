import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

// 创建相机
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.x = -50;
camera.position.z = 50;
camera.position.y= 50;

// 创建渲染器
const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

// 创建场景
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xeaeaea);

// 添加灯光
const ambientLight = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambientLight);


// 添加控制器
new OrbitControls(camera, document.body);

function animate() {
    requestAnimationFrame( animate );
    renderer.render( scene, camera );
}
animate();

const loader = new GLTFLoader();
var obj_count=0;
//loader.load('./model/free_bmw_m3_e30.glb', (gltf) => {
//loader.load('./model/jill.glb', (gltf) => {
//loader.load('./model/tree.gltf', (gltf) => {
//loader.load('./model/witch_naked/scene.gltf', (gltf) => {
//loader.load('./model/jill/scene.gltf', (gltf) => {
loader.load('./model/tiny_house.glb', (gltf) => {
    //设置模型大小
    gltf.scene.scale.set(0.2, 0.2, 0.2);
    //console.log(gltf.scene.scale);
    gltf.scene.traverse( function ( child ) {
        obj_count++;
        //console.log("遍历场景--->");
        //console.log(child);
        if(child.name=="Sketchfab_model"){ //显示位置
            child.position.x=0;
            child.position.y=0
            child.position.z=0
            console.log("Sketchfab_model.position.x:"+child.position.x);
            console.log("Sketchfab_model.position.y:"+child.position.y);
            console.log("Sketchfab_model.position.z:"+child.position.z);
            child.scale.x=0.2;
            child.scale.y=0.2;
            child.scale.z=0.2;
            console.log("Sketchfab_model.x:"+child.scale.x);//显示大小
            console.log("Sketchfab_model.y:"+child.scale.y);
            console.log("Sketchfab_model.z:"+child.scale.z);
        }
        //child.name="main_mode";
        if ( child.isMesh ) {
             // TOFIX RoughnessMipmapper seems to be broken with WebGL 2.0
             // roughnessMipmapper.generateMipmaps( child.material );
        }
    });
    scene.add(gltf.scene);
    //var object1 = scene.getObjectByName("main_mode");
    //var object1 = scene.getObjectByName("Sketchfab_model");
    // console.log("object1.position.x:"+object1.position.x);
    // console.log("object1.position.y:"+object1.position.y);
    // console.log("object1.position.z:"+object1.position.z);
    
});


