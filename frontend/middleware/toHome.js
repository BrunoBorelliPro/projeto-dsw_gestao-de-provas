export default function (context) {
  const { app, redirect } = context

  if (app.$cookies.get('user').isTeacher) {
    return redirect(`/professor`)
  } else {
    return redirect(`/aluno`)
  }
}
