
export function isUpperLetter(charCode: number) {
  return charCode >= 65 && charCode <= 90;
}

export function isComponentName(componentName: string) {
  if (!isUpperLetter(componentName.charCodeAt(0))) {
    return false;
  }

  if (componentName.length === 1) {
    return true;
  }

  if (isUpperLetter(componentName.charCodeAt(1))) {
    return false;
  }

  return true;
}