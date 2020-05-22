/**
 * 获取用户设置
 */
export function getSetting() {
    return new Promise((resolve, reject) => {
        wx.getSetting({
            success: (result) => {
                let scopeAddress = result.authSetting["scope.address"];
                resolve(scopeAddress)
            }
        })
    })
}

/**
 * 获取用户收货地址
 */
export function chooseAddress() {
    return new Promise((resolve, reject) => {
        wx.chooseAddress({
            success: (result) => {
                resolve(result)
            }
        })
    })
}

/**
 * 打开用户权限设置页
 */
export function openSetting() {
    return new Promise((resolve, reject) => {
        wx.openSetting({
            success: (result) => {
                resolve(result)
            }
        })
    })
}

/**
 * 提示用户信息
 */
export function showToast(title) {
    return new Promise((resolve, reject) => {
        wx.showToast({
            title,
            icon: 'none',
            success: (result) => {
                resolve(result)
            }
        });
    })
}

//用户登录

export function login() {
    return new Promise((res, rej) => {
        wx.login({
            timeout: 10000,
            success: (result) => {
                res(result)
            },
        });
    })
}