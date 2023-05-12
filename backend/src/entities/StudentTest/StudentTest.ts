export default class appliedTest {
  id: string;
  student_id: string;
  test_id: string;
  answers: string[];
  created_at: string | Date | undefined;
  updated_at: string | Date | undefined;

  constructor(
    student_id: string,
    test_id: string,
    answers: string[],
    id?: string,
    created_at?: string | Date | undefined,
    updated_at?: string | Date | undefined
  ) {
    this.id = id || "";
    this.student_id = student_id;
    this.test_id = test_id;
    this.answers = answers;
    this.created_at = created_at;
    this.updated_at = updated_at;
  }
}
