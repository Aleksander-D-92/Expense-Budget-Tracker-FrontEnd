const FREE_USER_CREDENTIALS = {
    username: 'demo_free_account',
    password: '123056a',
    rememberMe: true
}
const FREE_ACCOUNT_TOOLTIP = 'Has no special privileges'

const PAID_USER_CREDENTIALS = {
    username: 'demo_paid_account',
    password: '123056a',
    rememberMe: true
}
const PAID_ACCOUNT_TOOLTIP = 'Has the option to turn on/of the dark theme'

const ADMIN_CREDENTIALS = {
    username: 'demo_admin',
    password: '123056a',
    rememberMe: true
}
const ADMIN_TOOLTIP = `${PAID_ACCOUNT_TOOLTIP}, ban users, changes users authority`

export {
    FREE_USER_CREDENTIALS,
    PAID_USER_CREDENTIALS,
    ADMIN_CREDENTIALS,
    PAID_ACCOUNT_TOOLTIP,
    ADMIN_TOOLTIP,
    FREE_ACCOUNT_TOOLTIP
}
