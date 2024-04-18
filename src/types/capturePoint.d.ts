type CapturePoint = {
  id: number;
  distance: number;
};

type CapturePointPost = {
  distance: CapturePoint['distance'];
};



export type { CapturePoint, CapturePointPost };

