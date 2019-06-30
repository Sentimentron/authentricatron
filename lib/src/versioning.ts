// This file contains stuff to do with determining the Authenticatron server version.

export const kClientVersion = 1;

export class VersionRequest {
  private kind: string;
  constructor() {
    this.kind = 'version';
  }
}

export interface IVersionResponse {
  kind: 'version';
  // Stores the minimum version that this server can communicate with.
  minClientVersion: number;
  // Stores the maximum version of the client that this server can communicate with.
  maxClientVersion: number;
}
