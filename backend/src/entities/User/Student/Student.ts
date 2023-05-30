export class Student {
  constructor(
    readonly name: string,
    readonly email: string,
    readonly id?: string,
    readonly created_at?: string | Date | undefined,
    readonly updated_at?: string | Date | undefined
  ) {}
}
