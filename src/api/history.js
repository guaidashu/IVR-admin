import axios from '@/libs/api.request'
import Qs from 'qs'

export const getHistoryList = (post) => {
    return axios.request({url: 'history/getHistoryList', method: 'POST', data: post})
};

export const getRetainHistoryData = (post) => {
    return axios.request({url: 'history/getRetainHistoryList', method: 'POST', data: Qs.stringify(post)})
};
