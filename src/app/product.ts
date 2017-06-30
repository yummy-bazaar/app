let nextId = 1;

export class Product {
  id: number;
  constructor(
    public name: string,
    public power?: string) {
      this.id = nextId++;
    }
}
