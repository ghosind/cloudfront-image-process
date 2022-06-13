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

const getImageDimension = (params: URLSearchParams): string => {
  let width = params.get('width');
  let height = params.get('height');

  // TODO

  return `${width}x${height}`;
}

export const handler = (event: any) => {
  const request = event.Records[0].cf.request;
  let uri = request.uri;

  const match = uri.match(/(.*)\/(.*)\.(.*)/);
  if (!match) {
    return request;
  }

  const [ , path, filename, extension ] = match;
  if (!AllowedExtensions.includes(extension)) {
    return request;
  }

  const params = new URLSearchParams(request.querystring);
  if (!params.has('width') && !params.has('height')) {
    return request;
  }
  const dimension = getImageDimension(params);

  uri = `${path}/${filename}_${dimension}.${extension}`;
  request.uri = uri;

  return request;
}
