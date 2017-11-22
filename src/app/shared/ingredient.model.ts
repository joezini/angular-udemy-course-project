export class Ingredient {
  // this shortcut automatically creates instance variables with the same names as those of the constructor params, and assigns them
  constructor(public name: string, public amount: number) {}
}