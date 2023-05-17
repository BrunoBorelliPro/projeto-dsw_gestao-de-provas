import { prisma } from "../../prisma/client";
import { Student } from "../entities/Student/Student";

export class StudentService {
  async getAll() {
    console.log(`[StudentService] get all students`);

    const students = await prisma.student.findMany({});

    return students;
  }
  async getById(id: string) {
    console.log(`[StudentService] get student: ${id}`);

    const student = await prisma.student.findUnique({ where: { id: id } });

    return student;
  }
  async create(student: Student) {
    console.log(`[StudentService] create student`);

    const createdStudent = await prisma.student.create({
      data: {
        name: student.name,
      },
    });

    return createdStudent;
  }
  async update(id: string, student: Student) {
    console.log(`[StudentService] update student: ${id}`);

    const foundedStudent = await prisma.student.findUnique({
      where: { id: id },
    });

    if (!foundedStudent) {
      return;
    }

    const updatedStudent = prisma.student.update({
      where: { id: id },
      data: {
        name: student.name,
      },
    });

    return updatedStudent;
  }
  async delete(id: string) {
    console.log(`[StudentService] delete student: ${id}`);

    await prisma.student.delete({ where: { id: id } });
  }
}
