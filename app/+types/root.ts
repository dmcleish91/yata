/**
 * Root type definitions for the application
 */

export namespace Route {
  /**
   * Arguments for meta function in route components
   */
  export interface MetaArgs {
    data?: unknown;
    params?: Record<string, string>;
    location?: {
      pathname: string;
      search: string;
      hash: string;
    };
  }
} 