<template>
    <v-app-bar app flat clipped-left color="grey lighten-5">
        <v-app-bar-nav-icon @click="setDrawer(!drawer)"></v-app-bar-nav-icon>
        <v-toolbar-title class="text-h6">
            <span class="font-weight-light">Micro</span>
            <span>Market</span>
        </v-toolbar-title>

        <v-spacer></v-spacer>

        <v-menu open-on-hover down offset-y>
            <template v-slot:activator="{ on, attrs }">
                <v-btn class="ml-2" text min-width="0" v-bind="attrs" v-on="on">
                    <v-icon left>mdi-account</v-icon>
                    <span class="text-subtitle-2 text-center text-capitalize">
                        Hi, {{ user.nm_pengguna }}
                    </span>
                </v-btn>
            </template>

            <v-list width="200px">
                <v-list-item>
                    <v-list-item-title class="text-subtitle-2"
                        >Profile</v-list-item-title
                    >
                </v-list-item>
                <v-list-item @click="logoutUser">
                    <v-list-item-title class="text-subtitle-2"
                        >Logout</v-list-item-title
                    >
                </v-list-item>
            </v-list>
        </v-menu>
    </v-app-bar>
</template>

<script>
import { mapState, mapMutations, mapActions, mapGetters } from "vuex";

export default {
    name: "Header",
    data: () => ({}),
    computed: {
        ...mapState(["drawer"]),
        ...mapGetters('auth', ['user'])
    },
    methods: {
        ...mapMutations({
            setDrawer: "SET_DRAWER",
        }),
        ...mapActions({
            logout: "auth/logout",
            alert: "alert",
        }),
        logoutUser() {
            this.logout();
            this.$router.push("/login");
            this.alert({
                snackbar: true,
                color: "info",
                timeout: "4000",
                text: "Berhasil keluar dari sistem!",
            });
        },
    },

};
</script>
