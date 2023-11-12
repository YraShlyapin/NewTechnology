<template>
    <div>
        <router-view></router-view>
        <Teleport to="body">
            <p>asddddddd</p>
        </Teleport>
    </div>  
</template>
<script>
    export default {
        beforeCreate() {
            this.$store.commit('initialiseStore')
        }
    }
</script>