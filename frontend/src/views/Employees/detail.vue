<template>
    <v-container align="center">
        <v-subheader>Edit Employee</v-subheader>
        <v-col md="6">
            <v-card outlined>
                <v-card-title> Edit Employee </v-card-title>
                <v-row class="mx-1">
                    <v-col cols="12" class="pa-9">
                        <v-row class="justify-center">
                            <v-col cols="12" md="12">
                                <ValidationObserver v-slot="{ handleSubmit }">
                                    <v-form
                                        @submit.prevent="handleSubmit(submit)"
                                    >
                                        <v-row dense>
                                            <v-col cols="12" md="12">
                                                <v-text-field
                                                    v-model="id"
                                                    label="Id"
                                                    type="text"
                                                    outlined
                                                    dense
                                                    flat
                                                    readonly
                                                />
                                            </v-col>
                                            <v-col cols="12" md="12">
                                                <v-text-field
                                                    v-model="form.name"
                                                    label="Name"
                                                    type="text"
                                                    outlined
                                                    dense
                                                    flat
                                                    readonly
                                                />
                                            </v-col>
                                            <v-col cols="12" md="12">
                                                <v-text-field
                                                    v-model="form.email"
                                                    label="Email"
                                                    type="email"
                                                    outlined
                                                    dense
                                                    flat
                                                    readonly
                                                />
                                            </v-col>
                                        </v-row>
                                        <v-row dense>
                                            <v-col cols="12" md="12">
                                                <v-text-field
                                                    v-model="form.mobile"
                                                    label="Mobile"
                                                    type="text"
                                                    outlined
                                                    dense
                                                    flat
                                                    readonly
                                                />
                                            </v-col>
                                        </v-row>
                                        <v-row dense>
                                            <v-col cols="12" md="12">
                                                <v-text-field
                                                    v-model="form.birthdate"
                                                    label="Birthdate"
                                                    type="date"
                                                    outlined
                                                    dense
                                                    flat
                                                    readonly
                                                />
                                            </v-col>
                                        </v-row>
                                        <v-row
                                            cols="10"
                                            v-for="(
                                                addressInput, index
                                            ) in addressInputs"
                                            :key="index"
                                        >
                                            <v-col>
                                                <v-text-field
                                                    v-model="
                                                        addressInput.address
                                                    "
                                                    label="Address"
                                                    type="text"
                                                    outlined
                                                    dense
                                                    flat
                                                    readonly
                                                />
                                            </v-col>
                                        </v-row>

                                        <div class="mt-4">
                                            <div
                                                class="d-flex justify-space-between"
                                            >
                                                <v-spacer></v-spacer>
                                                <v-btn
                                                    to="/"
                                                    text
                                                    class="black--text text-capitalize ml-3"
                                                    >Close</v-btn
                                                >
                                            </div>
                                        </div>
                                    </v-form>
                                </ValidationObserver>
                            </v-col>
                        </v-row>
                    </v-col>
                </v-row>
            </v-card>
        </v-col>
    </v-container>
</template>

<script>
import { mapActions } from 'vuex'
// import router from '../../router'

export default {
    name: "editEmployee",
    props: ["id"],
    data() {
        return {
            submitProses: false,
            form: {
                id: this.id,
                name: "",
                email: "",
                mobile: "",
                birthdate: "",
                address: []
            },
            addressInputs: [
                {
                    address: "",
                }
            ]
        };
    },
    computed: {

    },
    methods: {
        ...mapActions({
            edit: 'employees/edit',
            alert: 'alert'
        }),

        addAddressInput() {
            this.addressInputs.push({
                address: ''
            })
        },
        removeAddressInput(index) {
            this.addressInputs.splice(index, 1)
        },

    },
    async created() {
        const response = await this.edit(this.id);
        this.form.name = response.data.data.name
        this.form.email = response.data.data.email
        this.form.mobile = response.data.data.mobile
        this.form.birthdate = response.data.data.birthdate
        response.data.data.address.map((val, index) => {
            this.addressInputs.splice(index, 1)
            this.addressInputs.push({
                address: val
            })

        })

    }
};
</script>

<style scoped>
</style>