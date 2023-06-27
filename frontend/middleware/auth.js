export default function (context) {
  const { redirect, route, app } = context
  if (!app.$cookies.get('token')) {
    return redirect(`/auth/login?redirect=${route.fullPath}`)
  }

  const { token, exp } = app.$cookies.get('token')
  const timestamp = new Date().getTime()
  if (token && exp) {
    if (timestamp < exp * 1000) {
      return
    }
  }
  return redirect(`/auth/login?redirect=${route.fullPath}`)
}
