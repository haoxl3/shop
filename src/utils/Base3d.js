import * as THREE from 'three';
import {RGBELoader} from 'three/examples/jsm/loaders/RGBELoader';
// 轨道控制器
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
class Base3d {
    constructor(selector) {
        this.container = document.querySelector(selector);
        this.camera;
        this.scene;
        this.renderer;
        this.init();
        this.animate();
    }
    init() {
        // 初始化场景
        this.initScene();
        // 初始化相机
        this.initCamera();
        // 初始化渲染器
        this.initRenderer();
        // 控制器
        this.initControls();
    }
    initScene() {
        this.scene = new THREE.Scene();
        this.setEvnMap('000');
    }
    initCamera() {
        // 透视相机，角度，相机宽高比，
        this.camera = new THREE.PerspectiveCamera(
            45,
            window.innerWidth / window.innerHeight,
            0.25,
            200
        );
        this.camera.position.set(-1.8, 0.6, 2.7);
    }
    initRenderer() {
        this.renderer = new THREE.WebGLRenderer({
            antialias: true // 抗锯齿
        });
        // 设置屏幕像素比
        this.renderer.setPixelRatio(window.devicePixelRatio);
        // 渲染的尺寸大小
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        // 色调映射-电影级别
        this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
        // 明暗，数字越大越亮
        this.renderer.toneMappingExposure = 2;
        this.container.appendChild(this.renderer.domElement);
    }
    setEvnMap(hdr) {
        new RGBELoader().setPath('./files/hdr/').load(hdr + '.hdr', texture => {
            // 球形映射
            texture.mapping = THREE.EquirectangularReflectionMapping;
            this.scene.background = texture;
            this.scene.environment = texture;
        });
    }
    render() {
        this.renderer.render(this.scene, this.camera);
    }
    animate() {
        this.renderer.setAnimationLoop(this.render.bind(this));
    }
    initControls() {
        // 摄像机，要渲染的dom
        this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    }
};
export default Base3d;