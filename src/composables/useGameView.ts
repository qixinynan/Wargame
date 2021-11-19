import { ref, onMounted } from 'vue';
import * as BABYLON from 'babylonjs';
import { float } from 'babylonjs/types';

/**
 * 在当前页面加载3D游戏视图
 * @param canvasRef Canvas的Ref对象
 */
export default function useGameView(canvasRef) {

  //阴影接收器
  let shadowGenerator: BABYLON.ShadowGenerator;

  onMounted(() => {
    if (!canvasRef) {
      console.error("无法找到Canvas");
    }
    Init(canvasRef.value);
  })

  /**
   * 创建BABYLON场景并进行初始化
   * @parma canvas 被渲染的Canvas的DOM对象
   */
  function Init(canvas: HTMLCanvasElement) {
    var engine: BABYLON.Engine = new BABYLON.Engine(canvas, true, { preserveDrawingBuffer: true, stencil: true });
    var scene: BABYLON.Scene = createScene(engine, canvas);

    engine.runRenderLoop(function () {
      scene.render();
    });

    window.addEventListener('resize', function () {
      engine.resize();
    });
  }

  /**
   * 创建场景
   * @param engine BABYLON引擎对象
   * @param canvas 被渲染的Canvas的DOM对象
   * @returns 创建好的场景
   */
  function createScene(engine: BABYLON.Engine, canvas: HTMLCanvasElement) {
    var scene: BABYLON.Scene = new BABYLON.Scene(engine);

    const camera = new BABYLON.ArcRotateCamera("camera", -Math.PI / 2, Math.PI / 2.5, 10, new BABYLON.Vector3(0, 0, 0), scene);
    camera.setTarget(BABYLON.Vector3.Zero());
    camera.attachControl(canvas, false);

    var ground = BABYLON.MeshBuilder.CreateGround("ground", { width: 10, height: 10 }, scene);
    const groundMat = new BABYLON.StandardMaterial("groundMat", scene);
    groundMat.diffuseColor = new BABYLON.Color3(0, 1, 0);
    ground.material = groundMat;
    ground.receiveShadows = true;

    const light = new BABYLON.DirectionalLight("dir01", new BABYLON.Vector3(0, -1, 1), scene);
    light.position = new BABYLON.Vector3(10, 10, 0);
    shadowGenerator = new BABYLON.ShadowGenerator(1024, light);

    createGround({ x: 20, z: 20 }, 0, 0, scene);

    return scene;
  }

  function createGround(size: { x: number, z: number }, XPos: float, ZPos: float, scene: BABYLON.Scene) {
    for (let i = 0; i < size.x; i++) {
      // createColumnLine(size.x,size.z,ZPos,scene);
      if (i % 2 == 0) {
        createColumnLine(size.z, XPos + (i * 0.75), ZPos + 0.5, scene);
      }
      else {
        createColumnLine(size.z, XPos + (i * 0.75), ZPos, scene);
      }

    }
  }

  function createColumnLine(length: number, XPos: float, ZPos: float, scene: BABYLON.Scene) {
    for (let i = 0; i < length; i++) {
      createColumn(XPos, ZPos, Math.random() / 2 + 0.5, scene);
      ZPos += Math.sqrt(3) / 2;
    }
  }
  /**
   * 创建六边形地形柱子对象
   * @param scene 加载的场景对象
   * @param x X坐标
   * @param z Z坐标
   * @param height 柱子高度
   */
  function createColumn(x: number, z: number, height: number, scene: BABYLON.Scene) {
    const obj = BABYLON.MeshBuilder.CreateCylinder("roof", { diameter: 1, tessellation: 6, height: height }, scene);
    obj.position.x = x;
    obj.position.z = z;
    obj.position.y = height / 2;

    obj.receiveShadows = true;
    shadowGenerator.addShadowCaster(obj);

  }
}

