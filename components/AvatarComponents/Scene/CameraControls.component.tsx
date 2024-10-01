import { useFrame, useThree } from "@react-three/fiber";
import { FC, useEffect, useRef } from "react";
import { clamp, lerp } from "@/services/avatar";
import { Camera, Object3D, Vector3 } from "three";
import { OrbitControls } from "three-stdlib";

type CameraControlsProps = {
  // eslint-disable-next-line react/no-unused-prop-types
  // fullBody?: boolean;
  // headScale?: number;
  cameraTarget?: number;
  cameraInitialDistance?: number;
  /**
   * Handles camera movement on the Z-axis.
   */
  cameraZoomTarget?: Vector3;
  controlsMinDistance?: number;
  controlsMaxDistance?: number;
  /**
   * Enables camera moving on Y-axis while zooming in-out.
   */
  updateCameraTargetOnZoom?: boolean;
  /**
   * Updates camera position based on the target position.
   */
  modelRef?: React.RefObject<Object3D>;
  followModel?: boolean;
};
let controls: OrbitControls;
let progress = Number.POSITIVE_INFINITY;

const updateCameraFocus = (camera: Camera, delta: number, target?: Vector3) => {
  if (target && progress <= 1) {
    camera.position.setX(lerp(camera.position.x, target.x, progress));
    camera.position.setZ(lerp(camera.position.z, target.z, progress));
    progress += delta;
  }
};

const updateCameraTarget = (
  camera: Camera,
  target: number,
  minDistance: number,
  maxDistance: number
) => {
  if (controls) {
    let distance = controls.target.distanceTo(camera.position);
    distance = clamp(distance, maxDistance, minDistance);
    const pivot = (distance - minDistance) / (maxDistance - minDistance);

    controls.target.set(0, target - 0.6 * pivot, 0);
  }
};

export const CameraControls: FC<CameraControlsProps> = ({
  cameraTarget,
  cameraInitialDistance,
  cameraZoomTarget,
  controlsMinDistance = 0.4,
  controlsMaxDistance = 2.5,
  updateCameraTargetOnZoom = false,
  followModel = false,
  modelRef,
}) => {
  const cameraZoomTargetRef = useRef(cameraZoomTarget);
  const { camera, gl } = useThree();
  const fallbackCameraTarget = cameraTarget || 1.475;

  useEffect(() => {
    if (
      cameraZoomTargetRef.current?.x !== cameraZoomTarget?.x ||
      cameraZoomTargetRef.current?.y !== cameraZoomTarget?.y ||
      cameraZoomTargetRef.current?.z !== cameraZoomTarget?.z
    ) {
      cameraZoomTargetRef.current = cameraZoomTarget;
      progress = 0;
    }

    controls = new OrbitControls(camera, gl.domElement);
    controls.enableRotate = true;
    controls.enablePan = false;

    controls.minDistance = controlsMinDistance;
    controls.maxDistance = controlsMaxDistance;
    controls.minPolarAngle = 1.4;
    controls.maxPolarAngle = 1.4;

    controls.target.set(0, fallbackCameraTarget, 0);
    controls.update();

    if (cameraInitialDistance && progress === Number.POSITIVE_INFINITY) {
      camera.position.z = cameraInitialDistance;
      controls.update();
    }

    return () => {
      controls.dispose();
    };
  }, [
    cameraInitialDistance,
    camera,
    controlsMinDistance,
    controlsMaxDistance,
    fallbackCameraTarget,
    gl.domElement,
    cameraZoomTarget,
  ]);

  useFrame((_, delta) => {
    if (followModel && modelRef?.current) {
      const modelPosition = modelRef.current.position;
      controls.target.copy(modelPosition);
      controls.update();
    } else if (updateCameraTargetOnZoom) {
      updateCameraTarget(
        camera,
        fallbackCameraTarget,
        controlsMinDistance,
        controlsMaxDistance
      );
    }
    updateCameraFocus(camera, delta, cameraZoomTarget);
    controls.update();
  });

  return null;
};
