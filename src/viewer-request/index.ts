const AllowedMinWidth: number = 4;
const AllowedMinHeight: number = 4;
const AllowedMaxWidth: number = 4096;
const AllowedMaxHeight: number = 4096;
const AllowedExtensions: string[] = [
  // JPEG
  'jpg',
  'jpeg',
  // PNG
  'png',
  // WEBP
  'webp',
  // GIF
  'gif',
  // AVIF
  'avif',
  // TIFF
  'tif',
  'tiff',
  // SVG
  'svg',
];

const normalizeValue = (value: string | undefined, max: number, min: number): number | undefined => {
  if (!value) {
    return undefined;
  }

  let num = Number(value);
  if (num > max) {
    num = max;
  } else if (num < min) {
    num = min;
  }

  return num;
}

const getImageDimension = (params: CFFunctionData): string | null => {
  let width = params?.width?.value;
  let height = params?.height?.value;

  if (!width && !height) {
    return null;
  }

  return `${
    normalizeValue(width, AllowedMaxWidth, AllowedMinWidth) || ''
  }x${
    normalizeValue(height, AllowedMaxHeight, AllowedMinHeight) || ''
  }`;
}

export const handler = (event: CFFunctionEvent): CFFunctionRequest => {
  const request = event.request;

  const match = /(.*)\/(.*)\.(.*)/.exec(request.uri);
  if (!match) {
    return request;
  }

  let [ , path, filename, extension ] = match;
  if (!AllowedExtensions.includes(extension.toLowerCase())) {
    return request;
  }

  const dimension = getImageDimension(request.querystring);
  if (!dimension) {
    return request;
  }

  request.uri = `${path}/${filename}_${dimension}.${extension}`;
  return request;
}
