<template>
    <div>
        <div>
            <form @submit.prevent="postUser">
                <input type="text" name="name">
                <input type="text" name="image">
                <button type="submit">отправить</button>
            </form>
        </div>
        <div v-for="user in users">
            <h1>{{ user.name }}</h1>
            <img :src="user.image" :alt="user.name">
            <button @click.prevent="deleteUsers(user.id)">x</button>
        </div>
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
        apollo: {
            users:  {
                query: gql`query ALL_Designers{
                    getAllDesigners{
                        id
                        name
                        image
                    }
                }`,
                update: data => data.getAllDesigners,
            }
        },
        methods: {
            postUser(e) {
                const form = e.target
                const InputDesigner = {
                    name: form.name.value,
                    image: form.image.value
                }

                const self = this

                this.$apollo.mutate({
                    mutation: gql`mutation NEW_USER($input: InputDesigner){
                        createDesigner(input: $input){
                            id
                            name,
                            image
                        }
                    }`,
                    update(storage, {data: { createDesigner }}){
                        // try optimize refetch загвоздка с id, которого нет
                        self.$apollo.queries.users.refetch()
                    },
                    variables: {
                        input: InputDesigner
                    }
                })
            },
            deleteUsers(id) {
                const self = this

                this.$apollo.mutate({
                    mutation: gql`mutation DELETE_USER($id: ID){
                        deleteDesigner(id: $id){
                            id
                            name,
                            image
                        }
                    }`,
                    update(storage, {data: { deleteDesigner }}){
                        self.$apollo.queries.users.refetch()
                    },
                    variables: {
                        id
                    }
                })
            }
        }
    }
</script>