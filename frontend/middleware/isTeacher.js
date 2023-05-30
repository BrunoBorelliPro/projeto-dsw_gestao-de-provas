export default function (context) {
  const { redirect, app } = context

  if (!app.$cookies.get('user').isTeacher) {
    return redirect(
      `/error?errorName=Não autorizado&errorMessage=Você não tem permissão para acessar esta página.`
    )
  }
}
