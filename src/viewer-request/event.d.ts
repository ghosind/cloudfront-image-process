/**
 * CloudFront Functions event object.
 * @see https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/functions-event-structure.html#functions-event-structure-query-header-cookie
 */
interface CFFunctionEvent {
  /**
   * The version of CloudFront Functions event object. The current version is '1.0'.
   * @example '1.0'
   * @see https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/functions-event-structure.html#functions-event-structure-version
   */
  readonly version: string;

  /**
   * The context object contains contextual information about the event.
   * @example
   * {
   *   distributionDomainName: 'd111111abcdef8.cloudfront.net',
   *   distributionId: 'EDFDVBD6EXAMPLE',
   *   eventType: 'viewer-response',
   *   requestId: 'EXAMPLEntjQpEXAMPLE_SG5Z-EXAMPLEPmPfEXAMPLEu3EqEXAMPLE==',
   * }
   */
  context: CFFunctionContext;

  /**
   * The viewer object contains
   * @example
   * {
   *   ip: '198.51.100.11'
   * }
   */
  viewer: CFFunctionViewer;

  /**
   * The request object contains a representation of a viewer-to-CloudFront HTTP request. In the
   * event object that’s passed to your function, the request object represents the actual request
   * that CloudFront received from the viewer.
   *
   * If your function code returns a request object to CloudFront, it must use this same structure.
   */
  request: CFFunctionRequest;

  /**
   * The response object contains a representation of a CloudFront-to-viewer HTTP response. In the
   * event object that’s passed to your function, the response object represents CloudFront’s actual
   * response to a viewer request.
   *
   * If your function code returns a response object, it must use this same structure.
   */
  response: CFFunctionResponse;
}

/**
 * CloudFront Functions context object.
 * @see https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/functions-event-structure.html#functions-event-structure-context
 */
interface CFFunctionContext {
  /**
   * The CloudFront domain name of the distribution that’s associated with the event.
   * @example 'd111111abcdef8.cloudfront.net'
   */
  readonly distributionDomainName: string;

  /**
   * The ID of the distribution that’s associated with the event.
   * @example 'EDFDVBD6EXAMPLE'
   */
  readonly distributionId: string;

  /**
   * The event type, either `viewer-request` or `viewer-response`.
   */
  readonly eventType: CFFunctionEventType;

  /**
   * A string that uniquely identifies a CloudFront request (and its associated response).
   */
  readonly requestId: string;
}

/**
 * CloudFront Functions viewer object.
 * @see https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/functions-event-structure.html#functions-event-structure-viewer
 */
interface CFFunctionViewer {
  /**
   * The IP address of the viewer (client) that sent the request.  If the viewer request came
   * through an HTTP proxy or a load balancer, the value is the IP address of the proxy or load
   * balancer.
   */
  ip: string;
}

/**
 * CloudFront Functions request object.
 * @see https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/functions-event-structure.html#functions-event-structure-request
 */
interface CFFunctionRequest {
  /**
   * The HTTP method of the request. It is a read-only field in the request object.
   */
  readonly method: string;

  /**
   * The relative path of the requested object. If your function modifies the uri value, note the
   * following:
   * - The new uri value must begin with a forward slash (/).
   * - When a function changes the uri value, it changes the object that the viewer is requesting.
   * - When a function changes the uri value, it doesn’t change the cache behavior for the request
   *   or the origin that an origin request is sent to.
   */
  uri: string;

  /**
   * An object that represents the query string in the request. If the request doesn’t include a
   * query string, the request object still includes an empty querystring object.
   */
  querystring: CFFunctionData;

  /**
   * An object that represents the HTTP headers in the request. If the request contains any
   * `Cookie` headers, those headers are not part of the headers object. Cookies are
   * represented separately in the cookies object.
   *
   * The headers object contains one field for each header in the request. Header names are
   * converted to lowercase in the event object, and header names must be lowercase when they’re
   * added by your function code. When CloudFront Functions converts the event object back into an
   * HTTP request, the first letter of each word in header names is capitalized. Words are
   * separated by a hyphen (`-`). For example, if your function code adds a header named
   * `example-header-name`, CloudFront converts this to `Example-Header-Name` in the HTTP request.
   */
  headers: CFFunctionData;

  /**
   * An object that represents the cookies in the request (`Cookie` headers).
   */
  cookies: CFFunctionData;
}

/**
 * CloudFront Functions response object.
 * @see https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/functions-event-structure.html#functions-event-structure-response
 */
interface CFFunctionResponse {
  /**
   * The HTTP status code of the response. This value is an integer, not a string.
   */
  statusCode: number;

  /**
   * The HTTP status description of the response. If your function code generates a response, this
   * field is optional.
   */
  statusDescription: string;

  /**
   * An object that represents the HTTP headers in the response. If the response contains any
   * `Set-Cookie` headers, those headers are not part of the headers object. Cookies are
   * represented separately in the cookies object.
   */
  headers: CFFunctionData;

  /**
   * An object that represents the cookies in the response (`Set-Cookie` headers).
   */
  cookies: CFFunctionData;
}

/**
 * The share structure for query strings, headers, and cookies in the CloudFront Functions request
 * and response objects.
 * @see https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/functions-event-structure.html#functions-event-structure-query-header-cookie
 */
interface CFFunctionData {
  [key: string]: CFFunctionDataValue;
}

/**
 * The share value structure for query strings, headers, and cookies in the CloudFront Functions
 * request and response objects.
 */
interface CFFunctionDataValue {
  /**
   * It contains the value of the query string, header, or cookie.
   */
  value: string;

  /**
   * It contains an array with the values of each of the duplicate query strings, headers, or
   * cookies.
   */
  multiValue?: CFFunctionDataValue[];

  /**
   * Property attributes for cookie in the response.
   */
  attributes?: string;
}

/**
 * CloudFront Functions event types.
 */
enum CFFunctionEventType {
  /**
   * Event for Viewer request.
   */
  ViewerRequest = 'viewer-request',

  /**
   * Event for Viewer response.
   */
  ViewerResponse = 'viewer-response',
}
