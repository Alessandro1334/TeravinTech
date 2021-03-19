<template>
    <v-container align="center">
        <v-subheader>Create Employee</v-subheader>
        <v-col md="6">
            <v-card outlined>
                <v-card-title> Create Employee </v-card-title>
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
                                                <ValidationProvider
                                                    name="Name"
                                                    rules="required"
                                                    v-slot="{ errors }"
                                                >
                                                    <v-text-field
                                                        v-model="form.name"
                                                        :error="
                                                            errors.length > 0
                                                        "
                                                        :error-messages="
                                                            errors[0]
                                                        "
                                                        label="Name"
                                                        type="text"
                                                        outlined
                                                        dense
                                                        flat
                                                    />
                                                </ValidationProvider>
                                            </v-col>
                                            <v-col cols="12" md="12">
                                                <ValidationProvider
                                                    name="Email"
                                                    rules="required|email"
                                                    v-slot="{ errors }"
                                                >
                                                    <v-text-field
                                                        v-model="form.email"
                                                        :error="
                                                            errors.length > 0
                                                        "
                                                        :error-messages="
                                                            errors[0]
                                                        "
                                                        label="Email"
                                                        type="email"
                                                        outlined
                                                        dense
                                                        flat
                                                    />
                                                </ValidationProvider>
                                            </v-col>
                                        </v-row>
                                        <v-row dense>
                                            <v-col cols="12" md="12">
                                                <ValidationProvider
                                                    name="Mobile"
                                                    rules="required|numeric|min:10"
                                                    v-slot="{ errors }"
                                                >
                                                    <v-text-field
                                                        v-model="form.mobile"
                                                        :error="
                                                            errors.length > 0
                                                        "
                                                        :error-messages="
                                                            errors[0]
                                                        "
                                                        label="Mobile"
                                                        type="text"
                                                        outlined
                                                        dense
                                                        flat
                                                    />
                                                </ValidationProvider>
                                            </v-col>
                                        </v-row>
                                        <v-row dense>
                                            <v-col cols="12" md="12">
                                                <ValidationProvider
                                                    name="birthdate"
                                                    rules="required"
                                                    v-slot="{ errors }"
                                                >
                                                    <v-text-field
                                                        v-model="form.birthdate"
                                                        :error="
                                                            errors.length > 0
                                                        "
                                                        :error-messages="
                                                            errors[0]
                                                        "
                                                        label="Birthdate"
                                                        type="date"
                                                        outlined
                                                        dense
                                                        flat
                                                    />
                                                </ValidationProvider>
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
                                                <ValidationProvider
                                                    name="Addresss"
                                                    rules="required"
                                                    v-slot="{ errors }"
                                                >
                                                    <v-text-field
                                                        v-model="
                                                            addressInput.address
                                                        "
                                                        :error="
                                                            errors.length > 0
                                                        "
                                                        :error-messages="
                                                            errors[0]
                                                        "
                                                        label="Address"
                                                        type="text"
                                                        outlined
                                                        dense
                                                        flat
                                                    />
                                                </ValidationProvider>
                                            </v-col>
                                            <v-col cols="2">
                                                <v-btn
                                                    v-if="index == 0"
                                                    @click="addAddressInput"
                                                    >+</v-btn
                                                >
                                                <v-btn
                                                    v-if="index > 0"
                                                    @click="
                                                        removeAddressInput(
                                                            index
                                                        )
                                                    "
                                                    >-</v-btn
                                                >
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
                                                    >Cancel</v-btn
                                                >
                                                <v-btn
                                                    color="success"
                                                    depressed
                                                    class="text-capitalize"
                                                    type="submit"
                                                    :loading="submitProses"
                                                    :disabled="submitProses"
                                                    >Submit</v-btn
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
    name: "AddData",
    data() {
        return {
            submitProses: false,
            form: {
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
            create: 'employees/create',
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

        async submit() {
            this.submitProses = true;
            this.addressInputs.map(val => {
                this.form.address.push(val.address)
            })

            try {
                this.create(this.form)
                this.$router.push('/')
                this.alert({
                    snackbar: true,
                    color: 'success',
                    timeout: '5000',
                    text: 'Data berhasil dimasukkan !',
                })
                this.loginProgress = false
            } catch (error) {
                this.alert({
                    snackbar: true,
                    color: 'error',
                    timeout: '5000',
                    text: error,
                })
                this.loginProgress = false
            }
        },
    },
};
</script>

<style scoped>
#tableKategori {
    width: 100%;
}
</style>