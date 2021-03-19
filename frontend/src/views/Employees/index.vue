<template>
    <v-container>
        <Notif />
        <v-subheader>Employeees</v-subheader>
        <v-card class="mx-auto pa-5 mt-5" outlined>
            <v-card-title>
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
                    <v-col cols="6" md="1">
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
                    </v-col>
                </v-row>
            </v-card-title>
            <v-row justify="center" align="center">
                <v-col md="12">
                    <v-simple-table>
                        <template v-slot:default>
                            <thead>
                                <tr>
                                    <th class="text-left">
                                        <a @click="sort('id')">ID</a>
                                    </th>
                                    <th class="text-left">
                                        <a @click="sort('name')">Name</a>
                                    </th>
                                    <th class="text-left">
                                        <a @click="sort('email')">Email</a>
                                    </th>
                                    <th class="text-left">
                                        <a @click="sort('mobile')">Mobile</a>
                                    </th>
                                    <th class="text-center">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr
                                    v-for="employee in employees.rows"
                                    :key="employee.id"
                                >
                                    <td>{{ employee.id }}</td>
                                    <td>{{ employee.name }}</td>
                                    <td>{{ employee.email }}</td>
                                    <td>{{ employee.mobile }}</td>
                                    <td class="text-center">
                                        <v-btn
                                            text
                                            x-small
                                            class="mx-1"
                                            :to="{
                                                name: 'employeeDetail',
                                                params: { id: employee.id },
                                            }"
                                        >
                                            Detail
                                        </v-btn>
                                        <v-btn
                                            text
                                            x-small
                                            class="mx-1"
                                            :to="{
                                                name: 'employeeEdit',
                                                params: { id: employee.id },
                                            }"
                                        >
                                            Edit
                                        </v-btn>
                                        <v-btn
                                            text
                                            x-small
                                            class="mx-1"
                                            :to="{
                                                name: 'employeeDelete',
                                                params: { id: employee.id },
                                            }"
                                        >
                                            Delete
                                        </v-btn>
                                    </td>
                                </tr>
                            </tbody>
                        </template>
                    </v-simple-table>
                </v-col>
            </v-row>
            <v-row>
                <v-spacer></v-spacer>
                <v-col cols="1">
                    <div class="d-flex align-center justify-center">
                        <p class="mr-3">Show</p>
                        <v-select
                            v-model="limit"
                            :items="items"
                            @change="pageChange"
                            required
                        ></v-select>
                        <p class="ml-3">per page</p>
                    </div>
                </v-col>
                <v-col cols="2" class="ml-2">
                    <div class="text-center">
                        <div class="text-left">
                            <v-pagination
                                v-model="page"
                                :length="this.employees.totalPage"
                                @input="pageChange"
                            ></v-pagination>
                        </div>
                    </div>
                </v-col>
                <v-spacer></v-spacer>
            </v-row>

            <v-card-actions>
                <v-spacer></v-spacer>
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
            sortid: "id-desc",
            sortname: "name-desc",
            sortemail: "email-desc",
            sortmobile: "mobile-desc",
            search: "",
            loadingStatus: true,
            items: [10, 5],
            limit: 10,
            page: 1
        }
    },
    computed: {
        ...mapState({
            employees: state => state.employees.employees
        })
    },
    methods: {
        ...mapActions({
            getAll: 'employees/getAll',
            alert: 'alert'
        }),
        async pencarian() {
            await this.getAll({
                search: this.search
            })
        },
        async pageChange() {
            await this.getAll({
                limit: this.limit,
                page: this.page
            })
        },
        async sort(params) {
            if (params == "name") {
                this.sortname == 'name-desc' ? this.sortname = "name-asc" : this.sortname = "name-desc"
                await this.getAll({
                    sort: this.sortname
                })
            } else if (params == "id") {
                this.sortid == 'id-desc' ? this.sortid = "id-asc" : this.sortid = "id-desc"
                await this.getAll({
                    sort: this.sortid
                })
            } else if (params == "mobile") {
                this.sortmobile == 'mobile-desc' ? this.sortmobile = "mobile-asc" : this.sortmobile = "mobile-desc"
                await this.getAll({
                    sort: this.sortmobile
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