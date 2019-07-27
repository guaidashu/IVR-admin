<template>
    <div>
        <Form>
            <FormItem label="花费金额/美元">
                <Input type="text" v-model="cost.cost" placeholder="请输入花费金额/美元"></Input>
            </FormItem>
            <FormItem label="汇率">
                <Input type="text" v-model="cost.exchange_rate"></Input>
            </FormItem>
            <FormItem label="选择日期">
                <DatePicker @on-change="getDate" format="yyyy-MM-dd"></DatePicker>
            </FormItem>
        </Form>
    </div>
</template>

<script>
    export default {
        name: "addNewCost",
        props: {
            cost: {
                default: {},
                type: Object
            }
        },
        model: {
            prop: 'cost'
        },
        data() {
            return {}
        },
        methods: {
            getDate(data) {
                this.cost.date = data
            },
            init() {
            }
        },
        created() {
            this.init()
        }
    }
</script>

<style scoped>

</style>
