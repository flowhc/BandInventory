export interface Variation {
  id: number;
  name: string;
  quantity: number;
}

export interface Item {
  id: number;
  name: string;
  price: string;
  variations: Variation[]
}
