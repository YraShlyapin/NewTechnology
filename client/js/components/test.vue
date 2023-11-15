<template>
    <div>
        <router-link to="/another">{{ $store.state.count }}</router-link><br>
        <router-link to="/users">users</router-link>
        <p>asddddddddddd</p>
        <p>{{ users }}</p>
        <p v-if="$apollo.queries.users.loading">Loading</p>
        <p v-else>{{ sss }}</p>
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
                userById: {},
                sss: {}
            }
        },
        mounted(){
            console.log('Hi it is my first apollo client site')
        },
        apollo: {
            users:  {
                query: gql`query {
                    getAllUsers{
                        id_user
                        name
                        image
                    }
                }`,
                update: data => data.getAllUsers
            },
            userById: {
                query: gql`query UserById($id: ID) {
                    getUser(id_user: $id){
                        id_user
                        name
                        image
                    }
                }`,
                variables() {
                    return{
                        id: this.idUsers
                    }
                },
                manual: true,
                result({ data, loading }) {
                    if (!loading) {
                        this.sss = data?.getUser
                    }
                }
            }
        }
    }
</script>