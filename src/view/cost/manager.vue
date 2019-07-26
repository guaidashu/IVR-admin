<template>
    <div>
        <Button type="primary" @click="showNewAddModal">新增花费</Button>
        <Button type="success" @click="init" style="margin-left: 15px;" :loading="loading">刷新</Button>
        <div style="width: 100%; height: 15px;"></div>
        <Table :data="data" :columns="columns" :loading="loading">
            <template slot-scope="{row, index}" slot="action">
                <Button type="primary" size="small">修改</Button>
            </template>
        </Table>
        <Divider></Divider>
        <Page :page-size="10" :total="total" @on-change="(p) => {this.page = p}"></Page>
        <Modal title="新增花费" v-model="newAddModal">
            <add-new-cost v-model="cost"></add-new-cost>
            <div slot="footer">
                <Button type="error" @click="closeNewAddModal">关闭</Button>
                <Button type="primary" @click="addNewCost">提交新增</Button>
            </div>
        </Modal>
    </div>
</template>

<script>

    import {addNewCost, getCostList} from "../../api/cost";
    import AddNewCost from "./components/addNewCost";

    export default {
        name: "manager",
        components: {AddNewCost},
        data() {
            return {
                newAddModal: false,
                data: [],
                columns: [
                    {
                        title: '日期',
                        key: 'date'
                    },
                    {
                        title: '花费/美元',
                        key: 'cost'
                    },
                    {
                        title: '汇率(美元-英镑)',
                        key: 'exchange_rate'
                    },
                    {
                        title: '操作',
                        slot: 'action'
                    }
                ],
                loading: false,
                cost: {
                    date: '',
                    cost: 0,
                    exchange_rate: 0
                },
                page: 1,
                total: 10
            }
        },
        methods: {
            showNewAddModal() {
                this.newAddModal = true
            },
            closeNewAddModal() {
                this.newAddModal = false
            },
            getCostList() {
                this.loading = true;
                getCostList({page: this.page}).then(res => {
                    let data = res.data
                    if (data.code === 0) {
                        this.data = data.data.data;
                        this.page = data.data.page;
                        this.total = data.data.total;
                        this.loading = false
                    }
                })
            },
            addNewCost() {
                if (!this.cost.date || !this.cost.cost || !this.cost.exchange_rate) {
                    this.$Message.error("请完善数据");
                    return
                }
                addNewCost(this.cost).then(res => {
                    let data = res.data
                    if (data.code === 0) {
                        this.$Message.success("新增成功");
                        this.closeNewAddModal()
                    }
                })
            },
            init() {
                this.getCostList()
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
