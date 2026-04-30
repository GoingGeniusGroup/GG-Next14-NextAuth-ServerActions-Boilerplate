import React, { FC, useRef } from "react";
import { Mesh, TextureLoader } from "three";
import { useLoader, ThreeElements } from "@react-three/fiber";

export type Background = { src?: string; color?: string } & ThreeElements["mesh"];

export const Box: FC<Background> = ({ src = "", ...baseProps }) => {
  const ref = useRef<Mesh>(null);
  const texture = useLoader(TextureLoader, src);

  return (
    <mesh ref={ref} castShadow receiveShadow {...baseProps}>
      <boxGeometry />
      <meshPhysicalMaterial map={texture} />
    </mesh>
  );
};
