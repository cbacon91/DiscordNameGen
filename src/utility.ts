const httpRequest = require('request-promise-native');

// this class is basically a giant slap in the face to the whole single-responsibility thing,
// but it's a lot easier than having a random class and an http class, especially since 
// those classes would just be so tiny.
export class Utility {
  intBetween(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min)) + min;
  };

  request(uri: string): Promise<any> {
    return httpRequest(uri);
  }
}