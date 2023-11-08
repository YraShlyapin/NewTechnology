<template>
    <div>
        <p>asddddddddddd</p>
        {{ hello }}
        <button @click="btn">asd</button>
    </div>
</template>
<script>
    import gql from 'graphql-tag'
    
    export default {
        data() {
            return {
                hello: ''
            }
        },
        methods: {
            btn() {
                this.$apollo.query()
            }
        },
        apollo: {
            hello:  gql`query {
                    hello
                }`
        }
    }
</script>