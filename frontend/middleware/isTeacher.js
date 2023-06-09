export default function (context) {
  const { redirect, app } = context
  if (!app.$cookies.get('token')) {
    return redirect(`/auth/login?redirect=${route.fullPath}`)
  }
  if (!app.$cookies.get('user').isTeacher) {
    return redirect(
      `/error?errorName=Não autorizado&errorMessage=Você não tem permissão para acessar esta página.`
    )
  }
}
