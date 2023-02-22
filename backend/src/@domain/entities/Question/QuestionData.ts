export class QuestionData {
  data: Array<string | Image>;
  constructor(data: Array<string | Image>) {
    this.data = data;
  }
}

type Image = {
  url: string;
  alt: string;
};
