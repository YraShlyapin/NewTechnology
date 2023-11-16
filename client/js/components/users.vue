<template>
    <div id="user_page">
        <div>
            <form @submit.prevent="postUser" id="userAdd">
                <input type="text" name="name" placeholder="Имя">
                <input type="text" name="image" placeholder="Ссылка на картинку">
                <input type="date" name="birthday">
                <button type="submit">отправить</button>
            </form>
        </div>
        <div id="wrapper_users">
            <template v-for="user in users" :key="user.id_user">
                <!--
                    TODO подумать над редактированием более красивым и менее нагружаемым
                    подумать над временем, время зависит от часового пояса, так как на сервер посткпает на 4 часа назад на клиенте >< 4
                -->
                <div class="users" v-if="idEdite != user.id_user">
                    <h1>{{ user.name }}</h1>
                    <img :src="user.image" :alt="user.name">
                    {{ new Date(user.birthday).toLocaleDateString({day: '2digit', month: '2digit', year: 'full'}) }}
                    <p>{{ user.id_user }}</p>
                    <label for="checkbox">удаление</label>
                    <input type="checkbox" @click="addToList($event, user.id_user)" class="checkbox_users" name="checkbox" :inner="user.id_user">
                    <button @click.prevent="deleteUsers($event, user.id_user)">x</button>
                    <button @click.prevent="addEditeAttr(user.id_user)" v-if="idEdite != user.id_user">x1</button>
                </div>
                <div class="users users_edite" v-else>
                    <input type="text" :placeholder="user.name" v-model="editeElement.name">
                    <input type="text" :placeholder="user.image" v-model="editeElement.image">
                    {{ new Date(user.birthday).toLocaleDateString({day: '2digit', month: '2digit', year: 'full'}) }}
                    <input type="date" v-model="editeElement.birthday">
                    <p>{{ user.id_user }}</p>
                    <label for="checkbox">удаление</label>
                    <input type="checkbox" @click="addToList($event, user.id_user)" class="checkbox_users" name="checkbox" :inner="user.id_user">
                    <button @click="offEditeMode">отменить</button>
                    <button @click="saveEdite">сохранить</button>
                </div>
            </template>
        </div>
        <div id="interaction">
            <p id="all_el" :title="deleteUsersList.join(', ')">{{ deleteUsersList.join(', ') }}</p>
            <button @click="deleteSelectedUser">удалить выделенные</button>
            <button @click="dropFromList">отчистить выделенные</button>
            <button @click="selectAllToList">выделить все</button>
            <form @click.prevent="setAutoIncrement" id="setAutoIncr">
                <input type="number" v-model="setIncrement">
                <button type="submit">установить</button>
            </form>
        </div>
    </div>
</template>
<script>
    import gql from 'graphql-tag'

    export default {
        data(){
            return {
                users: {},
                deleteUsersList: [],
                idEdite: false,
                editeElement: {},
                setIncrement: 0,
            }
        },
        apollo: {
            users:  {
                query: gql`query ALL_Users{
                    getAllUsers{
                        aid_user
                        name
                        image
                        birthday
                    }
                }`,
                update: data => data.getAllUsers,
            }
        },
        methods: {
            postUser(e) {
                const form = e.target
                console.log(new Date(form.birthday.value).toLocaleDateString().split('.').reverse().join('-'))
                const InputUser = {
                    name: form.name.value,
                    image: form.image.value,
                    birthday: new Date(form.birthday.value).toISOString()
                }

                const self = this

                this.$apollo.mutate({
                    mutation: gql`mutation NEW_USER($input: InputUser){
                        createUser(input: $input){
                            id_user
                            name
                            image
                            birthday
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
            setAutoIncrement() {
                this.$apollo.mutate({
                    mutation: gql`mutation SET_AUTO_INCREMENT ($id: Int){
                        setAutoincrementForUser(id: $id)
                    }`,
                    variables: {
                        id: this.setIncrement
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
                            name
                            image
                        }
                    }`,
                    async update(storage, {data: { deleteUser }}){
                        self.users = self.users.filter(e => e?.id_user != deleteUser.id_user)
                        let index = self.deleteUsersList.indexOf(id_user)
                        if (index >= 0) self.deleteUsersList.splice(index,1)
                    },
                    variables: {
                        id: Number(id_user)
                    }
                })
            },
            saveEdite() {
                let index = this.users.findIndex(e => e.id_user == this.idEdite)
                
                this.offEditeMode()
            },
            deleteSelectedUser() {
                const self = this

                this.$apollo.mutate({
                    mutation: gql`mutation DELETE_SELECTED_USER($id: [ID]){
                        deleteSelectedUser(id_user: $id){
                            id_user
                            name
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
            },
            addEditeAttr(id) {
                console.log(id)
                this.idEdite = id
                this.editeElement = {}
            },
            offEditeMode() {
                this.idEdite = false
                this.editeElement = {}
            }
        }
    }
</script>
<style lang="scss" scoped>
    @import 'Styles@/users.scss';
</style>