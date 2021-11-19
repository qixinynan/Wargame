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

    //创建场景
    var scene: BABYLON.Scene = new BABYLON.Scene(engine);

    //摄像机
    const camera = new BABYLON.ArcRotateCamera("camera", -Math.PI / 2, Math.PI / 2.5, 10, new BABYLON.Vector3(0, 0, 0), scene);
    camera.setTarget(BABYLON.Vector3.Zero());
    camera.attachControl(canvas, false);

    //水平地面
    var ground = BABYLON.MeshBuilder.CreateGround("ground", { width: 10, height: 10 }, scene);
    const groundMat = new BABYLON.StandardMaterial("groundMat", scene);
    groundMat.diffuseColor = new BABYLON.Color3(0, 1, 0);
    ground.material = groundMat;
    ground.receiveShadows = true;

    //灯光
    const light = new BABYLON.DirectionalLight("dir01", new BABYLON.Vector3(0, -1, 1), scene);
    light.position = new BABYLON.Vector3(10, 10, 0);
    shadowGenerator = new BABYLON.ShadowGenerator(1024, light);

    //六边形地面
    createGround({ x: 20, z: 20 }, 0, 0, scene);

    return scene;
  }

  /**
   * 创建六边形地形
   * @param size 大小 {x：X坐标长度 z：Z坐标长度}   
   * @param XPos X轴起始坐标
   * @param ZPos Z轴起始坐标
   * @param scene 场景对象
   */
  function createGround(size: { x: number, z: number }, XPos: float, ZPos: float, scene: BABYLON.Scene) {
    for (let i = 0; i < size.x; i++) {
      if (i % 2 == 0) {
        createGroundLine(size.z, XPos + (i * 0.75), ZPos + 0.5, scene);
      }
      else {
        createGroundLine(size.z, XPos + (i * 0.75), ZPos, scene);
      }

    }
  }

  /**
   * 创建六边形地形柱子线段
   * @param length 线段长度（六边形数量）
   * @param XPos 起始坐标X
   * @param ZPos 起始坐标Y
   * @param scene 场景对象
   */
  function createGroundLine(length: number, XPos: float, ZPos: float, scene: BABYLON.Scene) {
    for (let i = 0; i < length; i++) {
      createGroundObject(XPos, ZPos, Math.random() / 2 + 0.5, scene);
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
  function createGroundObject(x: number, z: number, height: number, scene: BABYLON.Scene) {
    const obj = BABYLON.MeshBuilder.CreateCylinder("roof", { diameter: 1, tessellation: 6, height: height }, scene);
    obj.position.x = x;
    obj.position.z = z;
    obj.position.y = height / 2;

    obj.receiveShadows = true;
    shadowGenerator.addShadowCaster(obj);

  }
}

