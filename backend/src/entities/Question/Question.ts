import { Alternative } from "../Alternative/Alternative";

export class Question {
  constructor(
    readonly content: string,
    readonly alternatives: Alternative[],
    readonly question_type: string,
    readonly id?: string,
    readonly created_at?: string | Date | undefined,
    readonly updated_at?: string | Date | undefined
  ) {}

  addAlternative(alternative: Alternative) {
    this.alternatives.map((alternative, index) => {
      if (alternative.content === alternative.content) {
        throw new Error("Alternative already exists");
      }
    });
    this.alternatives.push(alternative);
  }

  removeAlternative(alternative: Alternative) {
    this.alternatives.map((alt, index) => {
      if (alt.content === alternative.content) {
        this.alternatives.splice(index, 1);
      }
    });
  }
}
