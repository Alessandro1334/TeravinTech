<template>
    <v-navigation-drawer v-model="drawer" app clipped color="white">
        <v-list dense>
            <v-list-item
                v-for="listItem in listItems"
                :key="listItem.index"
                link
                :to="listItem.link"
                v-show="listItem.role === user.status || listItem.role == 'all'"
            >
                <v-list-item-action>
                    <v-icon>{{ listItem.icon }}</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                    <v-list-item-title>{{ listItem.title }}</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
        </v-list>
    </v-navigation-drawer>
</template>

<script>
import { mapState } from 'vuex'

export default {
    name: "Sidebar",
    data() {
        return {
            listItems: [
                {
                    link: "/dashboard",
                    icon: "mdi-view-dashboard",
                    title: "Dashboard",
                    role: "all"
                },
                {
                    link: "/pengguna",
                    icon: "mdi-account-multiple",
                    title: "Pengguna",
                    role: "admin"
                },
                {
                    link: "/kategori",
                    icon: "mdi-cube",
                    title: "Kategori",
                    role: "admin"
                },
                {
                    link: "/orders",
                    icon: "mdi-cube",
                    title: "Order",
                    role: "admin"
                },
                {
                    link: "/produks",
                    icon: "mdi-cube",
                    title: "Produk",
                    role: "penjual"
                },
                {
                    link: "/orders_detail",
                    icon: "mdi-cube",
                    title: "Order",
                    role: "penjual"
                },
            ],
        };
    },
    computed: {
        ...mapState('auth', ['user']),
        drawer: {
            get() {
                return this.$store.state.drawer;
            },
            set(val) {
                this.$store.commit("SET_DRAWER", val);
            },
        },

    },
    methods: {

    }

};
</script>

<style lang="css">
/* .v-list .v-list-item--active {
    background: linear-gradient(
        to right,
        #0072ea 2.5%,
        #e7f1fd -14%
    ) !important;
}

.v-list .v-list-item--active .v-list-item__content .v-list-item__title {
    color: #0072ea !important;
}

.v-list .v-list-item--active .v-icon {
    fill: #0072ea; */
/* } */
/* @import "@/assets/sass/main.sass" */
</style>