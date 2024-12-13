import { atom } from "jotai/index";
import { SpawnState } from "@/src/core/types/avatar";

const initialSpawnState: SpawnState = {
  onLoadedEffect: null,
  onLoadedAnimation: null,
};

export const spawnState = atom(initialSpawnState);
