import { Rock } from "@ruiapp/move-style";
import React from "react";
import AntdRocksMeta from "./AntdRocksMeta";
import { wrapToRockRenderer } from "@ruiapp/react-renderer";

export function convertAntdComponentToRock(antdComponent: React.Component, rockType: string) {
  return {
    $type: rockType,
    Renderer: wrapToRockRenderer(rockType, antdComponent, false) as any,
    ...AntdRocksMeta[rockType],
  } as Rock;
}
