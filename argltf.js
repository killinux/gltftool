//import * as THREE from 'three';

//import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

window.addEventListener("DOMContentLoaded", init);
function init() {
    //渲染设定
    const renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true
    });
    renderer.setClearColor(new THREE.Color(), 0);
    renderer.setSize(640, 480);
    renderer.domElement.style.position = 'absolute';
    renderer.domElement.style.top = '0px';
    renderer.domElement.style.left = '0px';
    document.body.appendChild(renderer.domElement);
    //画面設定
    const scene = new THREE.Scene();
    scene.visible = false;
    const camera = new THREE.Camera();
    scene.add(camera);
    const light = new THREE.AmbientLight(0xFFFFFF, 1.0);
    scene.add(light);
    //画面設定
    window.addEventListener('resize', () => {
        onResize();
    });
    function onResize() {
        arToolkitSource.onResizeElement();
        arToolkitSource.copyElementSizeTo(renderer.domElement);
        if (arToolkitContext.arController !== null) {
            arToolkitSource.copyElementSizeTo(arToolkitContext.arController.canvas);
        }
    };
      
    //AR周りの設定
    const arToolkitSource = new THREEx.ArToolkitSource({
        sourceType: 'webcam'
    });
    arToolkitSource.init(() => {
        setTimeout(() => {
            onResize();
        }, 2000);
    });
    const arToolkitContext = new THREEx.ArToolkitContext({
        cameraParametersUrl: 'data/camera_para.dat',
        detectionMode: 'mono'
    });
    arToolkitContext.init(() => {
        camera.projectionMatrix.copy(arToolkitContext.getProjectionMatrix());
    });
    
    //const gltfloader = new THREE.GLTFLoader();
    const gltfloader = new GLTFLoader();
    //gltfloader.load('./model/tree.gltf',function(gltf){
    gltfloader.load('./model/tiny_house.glb',function(gltf){
          //设置模型大小
            gltf.scene.scale.set(0.2, 0.2, 0.2);
            //console.log(gltf.scene.scale);
            gltf.scene.traverse( function ( child ) {
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

          marker1.add(gltf.scene);
      });

    //マーカー設定  
    const marker1 = new THREE.Group();
    scene.add(marker1);
    const arMarkerControls = new THREEx.ArMarkerControls(arToolkitContext, marker1, {
        type: 'pattern',
        patternUrl: 'data/patt.hiro',
    });
    //レンダリング
    requestAnimationFrame(function animate(){
        requestAnimationFrame(animate);
        if (arToolkitSource.ready) {
            arToolkitContext.update(arToolkitSource.domElement);
            scene.visible = camera.visible;
        }
        renderer.render(scene, camera);
    });
}
