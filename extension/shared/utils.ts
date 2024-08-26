export function downcase (input: string) {

  return input[0].toLowerCase() + input.slice(1);

}

export function capitalize (input: string) {

  return input[0].toUpperCase() + input.slice(1);

}

export function kebabCase (input: string) {

  return input.replace(/([A-Z])/g, (_, v) => `-${v}`.toLowerCase());

}

export function slash (path: string) {

  const isExtendedLengthPath = path.startsWith('\\\\?\\');

  if (isExtendedLengthPath) return path;

  return path.replace(/\\/g, '/');

}

export function refineURI (filePath: string) {

  return slash(filePath).replace(/^\.?\//, '');

}

export function isNotHookMethod (name: string) {

  return (
    name !== 'connect' &&
    name !== 'onmount' &&
    name !== 'unmount' &&
    name !== 'onmedia'
  );

}

export function isEventAnnotation (name: string) {

  return name === 'Event' || /^[A-Z][a-z][A-Za-z]+Event$/.test(name);

}
