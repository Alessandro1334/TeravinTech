<template>
    <v-container>
        <Notif />
        <v-subheader>Users</v-subheader>
        <v-card class="mx-auto pa-5 mt-5" outlined>
            <v-card-title v-show="users.length > 0">
                <v-spacer></v-spacer>
                <v-row justify="end" align="end">
                    <v-col cols="6" md="4">
                        <v-text-field
                            v-model="search"
                            append-icon="mdi-magnify"
                            label="Search"
                            single-line
                            hide-details
                            dense
                            flat
                            @keyup="pencarian"
                        ></v-text-field>
                    </v-col>
                </v-row>
            </v-card-title>
            <v-row justify="center" align="center">
                <v-col md="12" v-show="users.length > 0">
                    <v-simple-table>
                        <template v-slot:default>
                            <thead>
                                <tr>
                                    <th class="text-left">
                                        <a @click="sort('nama')">Nama</a>
                                    </th>
                                    <th class="text-left">
                                        <a @click="sort('email')">Email</a>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="user in users" :key="user.name">
                                    <td>{{ user.nama }}</td>
                                    <td>{{ user.email }}</td>
                                </tr>
                            </tbody>
                        </template>
                    </v-simple-table>
                </v-col>
                <v-col v-show="users.length == 0" align="center">
                    There's Currently No Data Exist, Please create by clicking
                    the Add Button Bellow
                </v-col>
            </v-row>

            <v-card-actions>
                <v-spacer></v-spacer>

                <v-btn
                    color="primary"
                    dark
                    outlined
                    depressed
                    small
                    class="text-capitalize"
                    to="/add"
                >
                    Add
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-container>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import Notif from '../../components/Notif'

export default {
    name: "AdminKategori",
    components: {
        Notif,
    },
    data() {
        return {
            headers: [
                { text: 'Nama', value: 'nama' },
                { text: 'Email', value: 'email' }
            ],
            form: {
                nm_kategori: ''
            },
            sortnama: "nama-desc",
            sortemail: "email-desc",
            search: "",
            loadingStatus: true,
            modal: {
                status: false,
                title: '',
                btn_label: ''
            }
        }
    },
    computed: {
        ...mapState({
            users: state => state.users.users
        }),
        kategoriIndex() {
            return this.users.map(
                (users, index) => ({
                    ...users,
                    index: index + 1
                })
            )
        }
    },
    methods: {
        ...mapActions({
            getAll: 'users/getAll',
            alert: 'alert'
        }),
        async pencarian() {
            await this.getAll({
                search: this.search
            })
        },

        async sort(params) {
            if (params == "nama") {
                this.sortnama == 'nama-desc' ? this.sortnama = "nama-asc" : this.sortnama = "nama-desc"
                await this.getAll({
                    sort: this.sortnama
                })
            } else {
                this.sortemail == 'email-desc' ? this.sortemail = "email-asc" : this.sortemail = "email-desc"
                await this.getAll({
                    sort: this.sortemail
                })
            }
        },
    },
    async created() {
        try {
            await this.getAll()
        } catch (error) {
            this.alert({
                snackbar: true,
                color: 'error',
                timeout: '5000',
                text: error,
            })
        }
        this.loadingStatus = false
    },
};
</script>

<style scoped>
#tableKategori {
    width: 100%;
}
</style>