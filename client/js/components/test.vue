<template>
    <div>
        <p>asddddddddddd</p>
        <p>{{ users }}</p>
        <p v-if="$apollo.queries.users.loading">Loading</p>
        <p v-else>{{ userById }}</p>
        <input type="number" v-model="idUsers">

    </div>
</template>
<script>
    import gql from 'graphql-tag'

    export default {
        data() {
            return {
                users: [],
                idUsers: 0,
                userById: {}
            }
        },
        methods: {
            
        },
        apollo: {
            users:  {
                query: gql`query {
                    users: getAllDesigners{
                        id
                        name
                        image
                    }
                }`,
            },
            userById: {
                query: gql`query DesignerById($id: ID) {
                    userById: getDesigner(id: $id){
                        id
                        name
                        image
                    }
                }`,
                variables() {
                    return{
                        id: this.idUsers
                    }
                },
            }
        }
    }
</script>