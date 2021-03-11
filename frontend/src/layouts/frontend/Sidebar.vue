<template>
    <v-navigation-drawer
        v-model="drawerhome"
        disable-resize-watcher
        temporary
        app
        clipped
        right
    >
        <v-list dense>
            <v-list-item
                v-for="listItem in listItems"
                :key="listItem.index"
                link
                :to="listItem.link"
                align="center"
            >
                <v-list-item-content>
                    <v-list-item-title>{{ listItem.title }}</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
        </v-list>
    </v-navigation-drawer>
</template>

<script>
export default {
    name: "Sidebar",
    data() {
        return {
            listItems: [
                {
                    link: "/",
                    title: "Home",
                },
                {
                    link: "/toko",
                    title: "Toko",
                },
                {
                    link: "/produk",
                    title: "Produk",
                },
                {
                    link: "/keranjang",
                    title: "Keranjang",
                },
                {
                    link: "/login",
                    title: "Login",
                },


            ],
        };
    },
    computed: {
        drawerhome: {
            get() {
                return this.$store.state.drawerhome;
            },
            set(val) {
                this.$store.commit("SET_DRAWER_HOME", val);
            },
        },
    },
};
</script>

<style lang="css">
.theme--light.v-btn--active:hover::before,
.theme--light.v-btn--active::before {
    opacity: 0;
}

.v-btn--active {
    color: #6cbe70;
}
</style>