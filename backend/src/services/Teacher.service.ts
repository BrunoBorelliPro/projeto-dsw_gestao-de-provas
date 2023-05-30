import { Teacher } from "../entities/User/Teacher/Teacher";
import { prisma } from "../../prisma/client";

export default class TeacherService {
  async getAll() {
    console.log(`[TeacherService] get all teachers`);
    const teachers = await prisma.teacher.findMany({});
    return teachers;
  }

  async getById(id: string) {
    console.log(`[TeacherService] get teacher: ${id}`);
    const teacher = await prisma.teacher.findUnique({
      where: {
        id: id,
      },
    });
    return teacher;
  }

  async create(teacher: Teacher) {
    console.log(`[TeacherService] create teacher`);
    const createdTeacher = await prisma.teacher.create({
      data: {
        name: teacher.name,
        email: teacher.email,
      },
    });
    return createdTeacher;
  }

  async update(id: string, teacher: Teacher) {
    console.log(`[TeacherService] update teacher: ${id}`);
    const updatedTeacher = await prisma.teacher.update({
      where: { id: id },
      data: {
        name: teacher.name,
        email: teacher.email,
      },
    });
    return updatedTeacher;
  }

  async delete(id: string) {
    console.log(`[TeacherService] delete teacher: ${id}`);
    await prisma.teacher.delete({
      where: { id: id },
    });
  }

  async getByEmail(email: string) {
    console.log(`[TeacherService] get teacher by email: ${email}`);
    const teacher = await prisma.teacher.findFirst({
      where: { email: email },
    });
    return teacher;
  }
}
