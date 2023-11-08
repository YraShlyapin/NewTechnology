<template>
    <div>
        <p>asddddddddddd</p>
        <p>{{ getAllDesigners }}</p>
        <button @click="btn">asd</button>
    </div>
</template>
<script>
    import gql from 'graphql-tag'

    export default {
        data() {
            return {
                getAllDesigners: []
            }
        },
        methods: {
            btn() {
                this.$apollo.queries.getAllDesigners.refetch()
            }
        },
        apollo: {
            getAllDesigners:  {
                query: gql`query {
                    getAllDesigners{
                        id
                        name
                        image
                    }
                }`
            }
        }
    }
</script>