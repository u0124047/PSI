export default function ({ store, redirect, route }) {
  console.log("middle",  store.state.user )
  store.state.user != null && route.name == 'login' ? redirect('/forms/journal') : ''
  store.state.user == null && isAdminRoute(route) ? redirect('/') : ''
}

function isAdminRoute(route) {
  console.log("isAdminRoute")
  if (route.matched.some((record) => record.path == '/forms/journal')) {
    return true
  }
}
