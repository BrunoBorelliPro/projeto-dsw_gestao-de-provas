export class Alternative {
  constructor(
    readonly content: string,
    readonly is_correct: boolean,
    readonly id?: string,
    readonly question_id?: string,
    readonly created_at?: string | Date | undefined,
    readonly updated_at?: string | Date | undefined
  ) {}
}
