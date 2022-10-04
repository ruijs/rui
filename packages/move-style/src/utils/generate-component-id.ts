let idSeed = 0;

export default function generateComponentId(type: string) {
  return `${type}-${++idSeed}`;
}