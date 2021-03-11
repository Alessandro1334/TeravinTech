<template>
    <v-app-bar app flat>
        <v-container class="py-0 fill-height">
            <v-app-bar-nav-icon
                @click="setDrawerHome(!drawerhome)"
                class="d-inline d-sm-inline d-md-none mr-4"
            ></v-app-bar-nav-icon>

            <v-toolbar-title class="text-h6 mr-6">
                <span class="font-weight-light">Micro</span>
                <span>Market</span>
            </v-toolbar-title>
            <div class="d-none d-sm-none d-md-inline">
                <v-btn
                    class="text-capitalize"
                    v-for="linkitem in linkItems"
                    :key="linkitem.index"
                    :to="linkitem.link"
                    text
                    >{{ linkitem.title }}</v-btn
                >
            </div>

            <v-spacer></v-spacer>
            <div class="d-none d-sm-none d-md-inline">
                <div v-if="authenticated">
                    <v-badge
                        class="mr-5"
                        bordered
                        color="success"
                        :content="getKeranjang.length.toString()"
                        overlap
                    >
                        <v-menu
                            max-width="650px"
                            open-on-hover
                            :close-on-click="false"
                            :close-on-content-click="false"
                            offset-y
                        >
                            <template v-slot:activator="{ on, attrs }">
                                <v-btn
                                    class="text-capitalize"
                                    text
                                    v-bind="attrs"
                                    v-on="on"
                                >
                                    Keranjang
                                </v-btn>
                            </template>
                            <v-list width="350px">
                                <v-list-item>
                                    <v-list-item-title class="d-flex d-inline">
                                        <span class="text-caption">
                                            <b>
                                                Keranjang (
                                                {{ keranjangs.length }}
                                                )
                                            </b>
                                        </span>
                                        <v-spacer></v-spacer>
                                        <v-btn
                                            to="/keranjang"
                                            x-small
                                            text
                                            class="mb-2"
                                            >Lihat Keranjang</v-btn
                                        >
                                    </v-list-item-title>
                                </v-list-item>
                                <v-divider></v-divider>
                                <div v-if="keranjangs.length == 0">
                                    <v-list-item>
                                        <v-list-item-title align="center">
                                            <span class="text-caption">
                                                <v-icon left
                                                    >mdi-delete-variant</v-icon
                                                >
                                                Keranjang Kosong
                                            </span>
                                        </v-list-item-title>
                                    </v-list-item>
                                </div>

                                <div v-if="keranjangs.length >= 0">
                                    <v-list-item
                                        v-for="keranjang in keranjangs"
                                        :key="keranjang.index"
                                    >
                                        <v-list-item-title
                                            class="d-flex d-inline"
                                        >
                                            <span class="text-caption">
                                                {{
                                                    keranjang.produk_id
                                                        .nm_produk
                                                }}(
                                                {{ keranjang.jml_produk }}/{{
                                                    keranjang.produk_id
                                                        .satuan_produk
                                                }})
                                            </span>
                                            <v-spacer></v-spacer>
                                            <span
                                                class="text-caption mx-1 red--text"
                                            >
                                                <b>
                                                    {{
                                                        (keranjang.jml_produk *
                                                            keranjang.produk_id
                                                                .harga_produk)
                                                            | currency
                                                    }}
                                                </b>
                                            </span>
                                            <v-btn x-small color="red" text
                                                ><v-icon
                                                    small
                                                    @click="
                                                        deleteKeranjang(
                                                            keranjang.id
                                                        )
                                                    "
                                                    >mdi-delete</v-icon
                                                >
                                            </v-btn>
                                        </v-list-item-title>
                                    </v-list-item>
                                </div>
                            </v-list>
                        </v-menu>
                    </v-badge>
                    <v-btn class="text-capitalize" text to="/transaksi"
                        >Transaksi</v-btn
                    >
                    <v-menu
                        v-model="menu"
                        :close-on-content-click="false"
                        :nudge-width="100"
                        offset-x
                        offset-y
                    >
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn
                                text
                                v-bind="attrs"
                                v-on="on"
                                class="text-capitalize"
                            >
                                <v-avatar size="30" class="mr-2">
                                    <img
                                        :src="
                                            'http://localhost:3004/' + user.foto
                                        "
                                        :alt="user.nm_pengguna"
                                    />
                                </v-avatar>
                                <span
                                    class="text-subtitle-2 text-center text-capitalize"
                                >
                                    Hi, {{ user.nm_pengguna }}
                                </span>
                            </v-btn>
                        </template>

                        <v-card>
                            <v-list>
                                <v-list-item>
                                    <v-list-item-avatar>
                                        <img
                                            :src="
                                                'http://localhost:3004/' +
                                                user.foto
                                            "
                                            :alt="user.nm_pengguna"
                                        />
                                    </v-list-item-avatar>

                                    <v-list-item-content>
                                        <v-list-item-title>
                                            {{ user.nm_pengguna }}
                                        </v-list-item-title>
                                        <v-list-item-subtitle
                                            class="text-capitalize"
                                        >
                                            {{ user.status }}
                                        </v-list-item-subtitle>
                                    </v-list-item-content>
                                </v-list-item>
                            </v-list>

                            <v-divider></v-divider>

                            <v-list>
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
                        </v-card>
                    </v-menu>
                </div>
                <v-btn
                    class="text-capitalize"
                    v-if="!authenticated"
                    to="/login"
                    text
                    >Login</v-btn
                >
            </div>
        </v-container>
    </v-app-bar>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";

export default {
    name: "Header",
    data: () => ({
        linkItems: [
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
        ],
        menu: false,
        closeOnContentClick: false
    }),
    computed: {
        ...mapGetters({
            authenticated: 'auth/authenticated',
            user: 'auth/user',
            getKeranjang: 'keranjang/getKeranjang'
        }),
        ...mapState({
            drawerhome: state => state.drawerhome,
            keranjangs: state => state.keranjang.keranjang
        }),
    },
    methods: {
        ...mapMutations({
            setDrawerHome: "SET_DRAWER_HOME",
        }),
        ...mapActions({
            logout: 'auth/logout',
            delete: 'keranjang/delete',
            alert: 'alert',
        }),
        async deleteKeranjang(id) {
            try {
                const response = await this.delete(id)
                this.alert({
                    snackbar: true,
                    color: 'success',
                    timeout: '5000',
                    text: response.data.message,
                })
            } catch (error) {
                this.alert({
                    snackbar: true,
                    color: 'error',
                    timeout: '5000',
                    text: error,
                })
            }
        },
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
    }
};
</script>

<style scoped>
.theme--light.v-btn--active:hover::before,
.theme--light.v-btn--active::before {
    opacity: 0;
}

.v-btn--active {
    color: #6cbe70;
}

.v-btn:before {
    background-color: none;
}

.v-btn:hover {
    color: #6cbe70;
}
</style>