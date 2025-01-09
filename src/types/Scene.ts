export interface Scene {
  id: string;
  name: string;
  images: {
    front: string;
    back: string;
    left: string;
    right: string;
    top: string;
    bottom: string;
  };
  connections: {
    left?: string;
    right?: string;
    forward?: string;
  };
}