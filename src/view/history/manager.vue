<template>
    <div>
        <Button type="success" @click="init" :loading="loading">刷新</Button>
        <div style="width: 100%; height: 15px;"></div>
        <Table border :data="data" :columns="columns" :loading="loading">
            <template slot-scope="{row, index}" slot="cost">
                <span v-text="getCost(row)"></span>
            </template>
            <template slot-scope="{row, index}" slot="income">
                <span v-text="getIncome(row)"></span>
            </template>
            <template slot-scope="{row, index}" slot="action">
                <Button type="primary" size="small" @click="showDetailModal(row)">查看详情</Button>
            </template>
        </Table>
        <Divider></Divider>
        <Page :total="total" :page-size="10" @on-change="(p) => {this.page = p}"></Page>
        <Modal :title="title" v-model="detailModal" width="800" @cancel="closeDetailModal">
            <div slot="footer">
                <Button type="error" @click="closeDetailModal">关闭</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
    import {getHistoryList} from "../../api/history";

    export default {
        name: "manager",
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
                        key: 'install_times'
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
                        title: '请求次数',
                        key: 'request_times',
                        width: 120
                    },
                    {
                        title: '允许次数',
                        key: 'allow_times',
                        width: 90
                    },
                    {
                        title: '成功',
                        key: 'success',
                        width: 90
                    },
                    {
                        title: '操作',
                        slot: 'action'
                    }
                ],
                total: 20,
                title: '',
                page: 1,
                detailModal: false
            }
        },
        methods: {
            getHistoryList() {
                this.loading = true;
                getHistoryList({page: this.page}).then(res => {
                    let data = res.data;
                    if (data.code === 0) {
                        this.total = data.data.total;
                        this.data = data.data.data;
                        this.loading = false
                    }
                })
            },
            getCost(row) {
                return row.cost.toFixed(2);
            },
            getIncome(row) {
                return row.income.toFixed(2);
            },
            showDetailModal(row) {
                this.detailModal = true;
                this.title = row.start_time + " 数据详情"
            },
            closeDetailModal() {
                this.detailModal = false
            },
            init() {
                this.getHistoryList()
            }
        },
        watch: {
            page: 'init'
        },
        mounted() {
            this.init()
        }
    }
</script>

<style scoped>

</style>
