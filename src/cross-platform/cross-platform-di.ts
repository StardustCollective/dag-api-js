import { IHttpClient } from './i-http-client';

// Cross Platform Dependency Injection
class CrossPlatformDi {

  private httpClient: IHttpClient;
  private httpClientBaseUrl: string;

  // Register the platform implementation for http service requests
  registerHttpClient (client: IHttpClient, baseUrl?: string) {
    this.httpClient = client;
    this.httpClientBaseUrl = baseUrl;
  }

  getHttpClient (): IHttpClient {
    return this.httpClient;
  }

  getHttpClientBaseUrl (): string {
    return this.httpClientBaseUrl;
  }
}

export const crossPlatformDi = new CrossPlatformDi();
