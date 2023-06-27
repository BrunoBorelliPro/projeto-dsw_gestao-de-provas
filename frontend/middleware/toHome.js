export default function (context) {
  const { app, route, redirect } = context
  if (!app.$cookies.get('token')) {
    return redirect(`/auth/login?redirect=${route.fullPath}`)
  }
  if (app.$cookies.get('user').isTeacher) {
    return redirect(`/professor`)
  } else {
    return redirect(`/aluno`)
  }
}
