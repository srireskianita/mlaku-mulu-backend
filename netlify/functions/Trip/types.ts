export interface Trip {
    _id?: string;
    name: string;
    destination: string;
    price: number;
    date: string; // ISO string
    description?: string;
  }