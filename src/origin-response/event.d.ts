/* eslint-disable no-unused-vars */

/**
 * CloudFront with Lambda@Edge function events object.
 * @see https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/lambda-event-structure.html#lambda-event-structure-response
 */
export interface CFLambdaEvent {
  Records: CFLambdaRecord[];
}

/**
 * @todo
 */
export interface CFLambdaRecord {
  cf: CFLambdaCF;
}

/**
 * @todo
 */
export interface CFLambdaCF {
  config: CFLambdaConfig;

  request: CFLambdaRequest;

  response?: CFLambdaResponse;
}

/**
 * CloudFront with Lambda@Edge function config object.
 */
export interface CFLambdaConfig {
  /**
   * The domain name of the distribution that’s associated with the response.
   */
  readonly distributionDomainName: string;

  /**
   * The ID of the distribution that’s associated with the response.
   */
  readonly distributionId: string;

  /**
   * The type of trigger that’s associated with the response: `origin-response` or
   * `viewer-response`.
   */
  readonly eventType: CFLambdaEventType;

  /**
   * An encrypted string that uniquely identifies the viewer-to-CloudFront request that this
   * response is associated with. The `requestId` value also appears in CloudFront access logs
   * as `x-edge-request-id`.
   */
  readonly requestId: string
}

/**
 * CloudFront with Lambda@Edge function request object.
 */
export interface CFLambdaRequest {
  /**
   * The IP address of the viewer that made the request.
   */
  readonly clientIp: string;

  /**
   * The headers in the request.
   */
  headers: CFLambdaHeaders;

  /**
   * The HTTP method of the request.
   */
  readonly method: string;

  /**
   * The query string, if any, in the request. If the request doesn’t include a query string, the
   * event object still includes querystring with an empty value.
   */
  querystring: string;

  /**
   * The relative path of the requested object.
   */
  uri: string;

  /**
   * The body of the HTTP request.
   */
  body?: CFLambdaBody;

  /**
   * The origin to send the request to. The origin structure must contain exactly one origin,
   * which can be a custom origin or an Amazon S3 origin.
   */
  origin: CFLambdaOrigin;
}

/**
 * CloudFront with Lambda@Edge function response object.
 */
export interface CFLambdaResponse {
  /**
   * The headers in the response.
   */
  headers: CFLambdaHeaders;

  /**
   * The HTTP status code of the response.
   */
  status: number;

  /**
   * The HTTP status description of the response.
   */
  statusDescription: string;
}

/**
 * HTTP headers for Lambda@Edge events.
 */
export interface CFLambdaHeaders {
  [key: string]: CFLambdaHeader[];
}

/**
 * HTTP header field for Lambda@Edge events.
 */
export interface CFLambdaHeader {
  /**
   * HTTP header field key.
   */
  key?: string;

  /**
   * HTTP header field value.
   */
  value: string;
}

/**
 * CloudFront with Lambda@Edge function body object.
 */
export interface CFLambdaBody {
  /**
   * A Boolean flag that indicates whether the body was truncated by Lambda@Edge.
   */
  readonly inputTruncated: boolean;

  /**
   * The action that you intend to take with the body.
   */
  action: CFLambdaBodyAction;

  /**
   * The encoding for the body. When Lambda@Edge exposes the body to the Lambda function, it first
   * converts the body to base64-encoding. If you choose replace for the action to replace the
   * body, you can opt to use base64 (the default) or text encoding. If you specify encoding as
   * base64 but the body is not valid base64, CloudFront returns an error.
   */
  encoding: CFLambdaBodyEncoding;

  /**
   * The request body content.
   */
  data: any;
}

/**
 * CloudFront with Lambda@Edge function origin object.
 */
export interface CFLambdaOrigin {
  /**
   * Custom headers with the request by specifying a header name and value pair for each custom
   * header.
   */
  customHeaders: CFLambdaHeaders;

  /**
   * The domain name of the origin. The domain name can’t be empty.
   */
  domainName: string;

  /**
   * The directory path at the origin where the request should locate content.
   */
  path: string;

  /**
   * How long, in seconds, that CloudFront should try to maintain the connection to the origin
   * after receiving the last packet of the response. The value must be a number from 1–60,
   * inclusive.
   */
  keepaliveTimeout: number;

  /**
   * The port that CloudFront should connect to at your custom origin. The port must be 80, 443,
   * or a number in the range of 1024–65535, inclusive.
   */
  port: number;

  /**
   * The connection protocol that CloudFront should use when connecting to your origin. The value
   * can be http or https.
   */
  protocol: string;

  /**
   * How long, in seconds, CloudFront should wait for a response after sending a request to your
   * origin. This also specifies how long CloudFront should wait after receiving a packet of a
   * response before receiving the next packet. The value must be a number from 4–60, inclusive.
   */
  readTimeout: number;

  /**
   * The minimum SSL/TLS protocol that CloudFront can use when establishing an HTTPS connection
   * with your origin. Values can be any of the following: TLSv1.2, TLSv1.1, TLSv1, or SSLv3.
   */
  sslProtocols: string[];

  /**
   * `origin-access-identity` or `none`.
   */
  authMethod?: string;

  /**
   * The AWS Region of your Amazon S3 bucket. This is required only when you set `authMethod` to
   * `origin-access-identity`.
   */
  region?: string;
}

/**
 * CloudFront with Lambda@Edge event types.
 */
export enum CFLambdaEventType {
  OriginRequest = 'origin-request',
  OriginResponse = 'origin-response',
}

/**
 * CloudFront with Lambda@Edge body action that you intend to take with the body.
 */
export enum CFLambdaBodyAction {
  Readonly = 'read-only',
  Replace = 'replace',
}

/**
 * The encoding for the body.
 */
export enum CFLambdaBodyEncoding {
  Base64 = 'base64',
  Text = 'text',
}
