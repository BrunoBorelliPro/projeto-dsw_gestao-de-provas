export default function (context) {
  const { redirect, route, app } = context
  if (!app.$cookies.get('token')) {
    return redirect(`/auth/login?redirect=${route.fullPath}`)
  }

  const { token, exp } = app.$cookies.get('token')
  console.log('token', token)
  console.log('exp', exp)
  const timestamp = new Date().getTime()
  console.log('timestamp', timestamp)
  if (token && exp) {
    if (timestamp < exp * 1000) {
      console.log('token not expired')
      return
    }
    console.log('token expired')
  }
  return redirect(`/auth/login?redirect=${route.fullPath}`)
}
