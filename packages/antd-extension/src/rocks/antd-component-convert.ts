import { Rock } from "@ruiapp/move-style";
import React from "react";
import AntdRocksMeta from "./AntdRocksMeta";
import { genRockRenderer } from "@ruiapp/react-renderer";

export function convertAntdComponentToRock(antdComponent: React.Component, rockType: string) {
  return {
    $type: rockType,
    Renderer: genRockRenderer(rockType, antdComponent) as any,
    ...AntdRocksMeta[rockType],
  } as Rock;
}
