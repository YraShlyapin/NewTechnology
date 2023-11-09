<template>
    <div>
        <router-link to="/another"><p>{{ $store.state.count }}</p></router-link>
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
                    getAllDesigners{
                        id
                        name
                        image
                    }
                }`,
                update: data => data.getAllDesigners
            },
            userById: {
                query: gql`query DesignerById($id: ID) {
                    getDesigner(id: $id){
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
                manual: true,
                result({ data, loading }) {
                    if (!loading) {
                        this.sss = data?.getDesigner
                    }
                }
            }
        }
    }
</script>