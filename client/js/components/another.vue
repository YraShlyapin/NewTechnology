<template>
    <router-link to="/">asd</router-link>
    <p>{{ $store.state.count }}</p>
    <button @click="this.$store.commit('increment')">+</button>
</template>