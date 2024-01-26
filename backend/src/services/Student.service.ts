import { PrismaClient } from "@prisma/client";
import { Student } from "../entities/User/Student/Student";
import { Service } from "./Service";

export class StudentService extends Service {
  async getAll() {
    console.log(`[StudentService] get all students`);
    const students = await this.prisma.student.findMany({});
    return students;
  }
  async getById(id: string) {
    console.log(`[StudentService] get student: ${id}`);
    const student = await this.prisma.student.findFirst({ where: { id: id } });
    return student;
  }
  async create(student: Student) {
    console.log(`[StudentService] create student`);
    const createdStudent = await this.prisma.student.create({
      data: {
        name: student.name,
        email: student.email,
      },
    });
    return createdStudent;
  }
  async update(id: string, student: Student) {
    console.log(`[StudentService] update student: ${id}`);
    const updatedStudent = await this.prisma.student.update({
      where: { id: id },
      data: {
        name: student.name,
        email: student.email,
      },
    });
    return updatedStudent;
  }
  async delete(id: string) {
    console.log(`[StudentService] delete student: ${id}`);
    await this.prisma.student.delete({ where: { id: id } });
  }

  async getByEmail(email: string) {
    console.log(`[StudentService] get student by email: ${email}`);
    const student = await this.prisma.student.findFirst({
      where: { email: email },
    });
    return student;
  }
}
