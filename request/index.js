import { BASE_URL } from '../config/index'
let ajaxTimes = 0;
export function $get(url, data) {
    ajaxTimes++;
    wx.showLoading({
        title: "加载中",
    });
    return new Promise((resolve, reject) => {
        wx.request({
            url: BASE_URL + url,
            data,
            method: 'GET',
            success: (result) => {
                resolve(result.data)
            },
            complete() {
                ajaxTimes--;
                if (!ajaxTimes) {
                    wx.hideLoading();
                }
            }
        });
    })
}

export function $post(url, data) {
    wx.showLoading({
        title: "加载中",
    });
    return new Promise((resolve, reject) => {
        wx.request({
            url: BASE_URL + url,
            data,
            method: 'POST',
            success: (result) => {
                resolve(result)
            },
        });
    })
}