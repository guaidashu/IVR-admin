import axios from '@/libs/api.request'


export const addNewCost = (post) => {
    return axios.request({url: 'cost/addNewCost', method: 'POST', data: post})
};

export const getCostList = (post) => {
    return axios.request({url: 'cost/getCostList', method: 'POST', data: post})
};
