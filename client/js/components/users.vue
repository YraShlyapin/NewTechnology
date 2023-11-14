<template>
    <div id="user_page">
        <div>
            <form @submit.prevent="postUser">
                <input type="text" name="name">
                <input type="text" name="image">
                <button type="submit">отправить</button>
            </form>
        </div>
        <div id="wrapper_users">
            <div v-for="user in users" class="users" key="user.id_user">
                <h1>{{ user.name }}</h1>
                <img :src="user.image" :alt="user.name">
                <p>{{ user.id_user }}</p>
                <input type="checkbox" @click="addToList($event, user.id_user)" class="checkbox_users">
                <!--при удалении checkbox переходит с места на место исправить-->
                <button @click.prevent="deleteUsers($event, user.id_user)">x</button>
            </div>
        </div>
        <div id="interaction">
            <p id="all_el" :title="deleteUsersList">{{ deleteUsersList }}</p>
            <button @click="deleteSelectedUser">удалить выделенные</button>
            <button @click="dropFromList">отчистить выделенные</button>
            <button @click="selectAllToList">выделить все</button>
        </div>
    </div>
</template>
<script>
    import gql from 'graphql-tag'

    export default {
        data(){
            return {
                users: {},
                deleteUsersList: []
            }
        },
        apollo: {
            users:  {
                query: gql`query ALL_Users{
                    getAllUsers{
                        id_user
                        name
                        image
                    }
                }`,
                update: data => data.getAllUsers,
            }
        },
        methods: {
            postUser(e) {
                const form = e.target
                const InputUser = {
                    name: form.name.value,
                    image: form.image.value
                }

                const self = this

                this.$apollo.mutate({
                    mutation: gql`mutation NEW_USER($input: InputUser){
                        createUser(input: $input){
                            id_user
                            name,
                            image
                        }
                    }`,
                    update(storage, {data: { createUser }}){
                        self.users = [...self.users, createUser]
                    },
                    variables: {
                        input: InputUser
                    }
                })
            },
            deleteUsers(e, id_user) {
                const self = this

                e.target.disabled = true
                console.log(e.target)

                this.$apollo.mutate({
                    mutation: gql`mutation DELETE_USER($id: ID){
                        deleteUser(id_user: $id){
                            id_user
                            name,
                            image
                        }
                    }`,
                    update(storage, {data: { deleteUser }}){
                        self.users = self.users.filter(e => e?.id_user != deleteUser.id_user)
                        e.target.disabled = false
                        let index = self.deleteUsersList.indexOf(id_user)
                        self.deleteUsersList.splice(index,1)
                    },
                    variables: {
                        id: Number(id_user)
                    }
                })
            },
            deleteSelectedUser() {
                const self = this

                this.$apollo.mutate({
                    mutation: gql`mutation DELETE_SELECTED_USER($id: [ID]){
                        deleteSelectedUser(id_user: $id){
                            id_user
                            name,
                            image
                        }
                    }`,
                    update(storage, {data: { deleteSelectedUser }}){
                        let ids = deleteSelectedUser.map(e => e?.id_user)
                        self.users = self.users.filter(e => !ids.includes(e.id_user))

                        self.dropFromList()
                    },
                    variables: {
                        id: this.deleteUsersList
                    }
                })
            },
            addEl(id_user){
                if (this.deleteUsersList.includes(id_user)) {
                    return
                }
                this.deleteUsersList.push(id_user)
            },
            addToList(e, id_user) {
                if (!e.target.checked) {
                    let index = this.deleteUsersList.indexOf(id_user)
                    this.deleteUsersList.splice(index,1)
                }else {
                    this.addEl(id_user)
                }
            },
            dropFromList() {
                this.deleteUsersList = []
                document.querySelectorAll('.checkbox_users').forEach(e => {
                    e.checked = false
                })
            },
            selectAllToList() {
                this.deleteUsersList = this.users.map(e => e.id_user)
                document.querySelectorAll('.checkbox_users').forEach(e => {
                    e.checked = true
                })
            }
        }
    }
</script>
<style lang="scss" scoped>
    @import 'Styles@/users.scss';
</style>