<template>
    <div>
        <Table :data="data" :columns="columns" :loading="loading">

        </Table>
    </div>
</template>

<script>
    export default {
        name: "retain-history",
        data() {
            return {
                loading: false,
                data: [],
                columns: []
            }
        },
        methods: {
            init() {
            }
        },
        mounted() {
            this.init()
        }
    }
</script>

<style scoped>

</style>
