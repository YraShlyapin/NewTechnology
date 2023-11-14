<template>
    <div>
        <div>
            <form @submit.prevent="postUser">
                <input type="text" name="name">
                <input type="text" name="image">
                <button type="submit">отправить</button>
            </form>
        </div>
        <div id="wrapper_users">
            <div v-for="user in users" class="users">
                <h1>{{ user.name }}</h1>
                <img :src="user.image" :alt="user.name">
                <p>{{ user.id_designer }}</p>
                <button @click.prevent="deleteUsers($event, user.id_designer)">x</button>
            </div>
        </div>
    </div>
</template>
<script>
    import gql from 'graphql-tag'

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
                        id_designer
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
                            id_designer
                            name,
                            image
                        }
                    }`,
                    update(storage, {data: { createDesigner }}){
                        self.users = [...self.users, createDesigner]
                    },
                    variables: {
                        input: InputDesigner
                    }
                })
            },
            deleteUsers(e, id_designer) {
                const self = this

                e.target.disabled = true

                this.$apollo.mutate({
                    mutation: gql`mutation DELETE_USER($id: ID){
                        deleteDesigner(id_designer: $id){
                            id_designer
                            name,
                            image
                        }
                    }`,
                    update(storage, {data: { deleteDesigner }}){
                        self.users = self.users.filter(e => e.id_designer != deleteDesigner.id_designer)
                    },
                    variables: {
                        id: Number(id_designer)
                    }
                })
            }
        }
    }
</script>
<style lang="scss" scoped>
    @import 'Styles@/users.scss';
</style>