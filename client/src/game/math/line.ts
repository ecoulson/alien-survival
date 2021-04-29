export class Line {
    constructor(private slope: number, private yIntercept: number) {}

    evaluate(x: number) {
        return this.slope * x + this.yIntercept;
    }
}
