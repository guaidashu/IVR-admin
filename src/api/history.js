import axios from '@/libs/api.request'


export const getHistoryList = (post) => {
    return axios.request({url: 'history/getHistoryList', method: 'POST', data: post})
};
