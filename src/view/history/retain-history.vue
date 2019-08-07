<template>
    <div>
        <DatePicker @on-change="getStartDate" format="yyyy-MM-dd" placeholder="选择开始日期"></DatePicker>
        <DatePicker @on-change="getEndDate" format="yyyy-MM-dd" placeholder="选择结束日期"
                    style="margin-left: 15px;"></DatePicker>
        <Button type="primary" @click="init" style="margin-left: 15px;" :loading="loading">查询</Button>
        <Button type="success" @click="init" style="margin-left: 15px;" :loading="loading">刷新</Button>
        <div style="width: 100%; height: 15px;"></div>
        <Table :data="data" border :columns="columns" :loading="loading">
            <template slot-scope="{row, index}" slot="call_permission_rate">
                <span v-text="getCallPermissionRate(row)"></span>%
            </template>
            <template slot-scope="{row, index}" slot="cost">
                <span v-text="getCost(row)"></span>
            </template>
            <template slot-scope="{row, index}" slot="income">
                <span v-text="getIncome(row)"></span>
            </template>
            <template slot-scope="{row, index}" slot="profit">
                <span v-text="getProfit(row)"></span>
            </template>
        </Table>
        <Divider></Divider>
    </div>
</template>

<script>
    import {getRetainHistoryData} from "../../api/history";

    export default {
        name: "retain-history",
        data() {
            return {
                loading: false,
                data: [],
                columns: [
                    {
                        title: '日期',
                        key: 'start_time'
                    },
                    {
                        title: '安装数',
                        key: 'install_times',
                        width: 70
                    },
                    {
                        title: '授权人数',
                        key: 'call_permission_people',
                        width: 70
                    },
                    {
                        title: '授权率',
                        slot: 'call_permission_rate'
                    },
                    {
                        title: '花费/美元',
                        slot: 'cost',
                    },
                    {
                        title: '收入/英镑',
                        slot: 'income'
                    },
                    {
                        title: '利润/英镑',
                        slot: 'profit'
                    },
                    {
                        title: '请求次数',
                        key: 'request_times',
                        width: 90
                    },
                    {
                        title: '允许次数',
                        key: 'allow_times',
                        width: 90
                    },
                    {
                        title: '成功人数',
                        key: 'success_people'
                    },
                    {
                        title: '总拨打人数',
                        key: 'all_call_people'
                    },
                    {
                        title: '当天拨打人数',
                        key: 'call_people',
                    },
                    {
                        title: '成功次数',
                        key: 'success',
                        width: 90
                    },
                    {
                        title: '用户留存',
                        key: 'retain',
                        width: 90
                    }
                ],
                condition: {
                    start_time: '',
                    end_time: ''
                }
            }
        },
        methods: {
            getCost(row) {
                return row.cost.toFixed(2);
            },
            getIncome(row) {
                return row.income.toFixed(2);
            },
            getStartDate(data) {
                this.condition.start_time = data
            },
            getEndDate(data) {
                this.condition.end_time = data
            },
            getProfit(row) {
                return row.profit.toFixed(2);
            },
            getRetainHistoryData() {
                this.loading = true;
                getRetainHistoryData(this.condition).then(res => {
                    let data = res.data;
                    if (data.code === 0) {
                        this.data = data.data;
                        this.loading = false
                    }
                })
            },
            getCallPermissionRate(row) {
                let result = row.call_permission_people / row.install_times;
                result = result ? result : 0;
                return (result * 100).toFixed(2)
            },
            init() {
                this.getRetainHistoryData()
            }
        },
        mounted() {
        }
    }
</script>

<style scoped>

</style>
