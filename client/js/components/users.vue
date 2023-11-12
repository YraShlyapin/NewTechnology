<template>
    <div>
        {{ users }}
    </div>
</template>
<script>
    import gql from 'graphql-tag'

    const GET_ALL_USERS = gql`query {
                    getAllDesigners{
                        id
                        name
                        image
                    }
                }`

    export default {
        data(){
            return {
                users: {}
            }
        },
        async created(){
            let users = await this.$apollo.query({query: GET_ALL_USERS})
            if (users.data.getAllDesigners) {
                this.$store.state.users = users.data.getAllDesigners
            }
            this.users = this.$store.state.users
        }
    }
</script>