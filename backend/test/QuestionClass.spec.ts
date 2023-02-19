import { Question } from "../src/@domain/entities/Question";

describe("@damoin/entities/Question", () => {
  it("should be able to create a new question", () => {
    const question = new Question({
      data: [
        "This is a question",
        {
          url: "https://www.google.com",
          alt: "Google",
        },
      ],
    });
    expect(question.id).toBeDefined();
  });
  it("should be able to create a new question with a specific id", () => {
    const question = new Question(
      {
        data: [
          "This is a question",
          {
            url: "https://www.google.com",
            alt: "Google",
          },
        ],
      },
      "1234"
    );
    expect(question.id).toBe("1234");
  });

  it("should be question data to be an array of strings and images", () => {
    const question = new Question({
      data: [
        "This is a question",
        {
          url: "https://www.google.com",
          alt: "Google",
        },
      ],
    });
    const data: [string, { url: string; alt: string }] = question.questionData
      .data as [string, { url: string; alt: string }];
    expect(data[0]).toBe("This is a question");
    expect(data[1].url).toBe("https://www.google.com");
    expect(data[1].alt).toBe("Google");
  });
  it("should create a new question with question data in right order", () => {
    const question = new Question({
      data: [
        "This is a question",
        "This is the first image:",
        {
          url: "https://www.google.com",
          alt: "Google 0",
        },
        "This is the second and third image:",
        {
          url: "https://www.google.com",
          alt: "Google 1",
        },
        {
          url: "https://www.google.com",
          alt: "Google 2",
        },
        "This is the last image:",
        {
          url: "https://www.google.com",
          alt: "Google 3",
        },
      ],
    });
    const data = question.questionData.data as [
      string,
      string,
      { url: string; alt: string },
      string,
      { url: string; alt: string },
      { url: string; alt: string },
      string,
      { url: string; alt: string }
    ];
    expect(data[0]).toBe("This is a question");
    expect(data[1]).toBe("This is the first image:");
    expect(data[2].url).toBe("https://www.google.com");
    expect(data[2].alt).toBe("Google 0");
    expect(data[3]).toBe("This is the second and third image:");
    expect(data[4].url).toBe("https://www.google.com");
    expect(data[4].alt).toBe("Google 1");
    expect(data[5].url).toBe("https://www.google.com");
    expect(data[5].alt).toBe("Google 2");
    expect(data[6]).toBe("This is the last image:");
    expect(data[7].url).toBe("https://www.google.com");
    expect(data[7].alt).toBe("Google 3");
  });
});
