<template>
    <v-container align="center">
        <v-subheader>Create User</v-subheader>
        <v-col md="6">
            <v-card outlined>
                <v-card-title> Create User </v-card-title>
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
                                                    name="Nama"
                                                    rules="required"
                                                    v-slot="{ errors }"
                                                >
                                                    <v-text-field
                                                        v-model="form.nama"
                                                        :error="
                                                            errors.length > 0
                                                        "
                                                        :error-messages="
                                                            errors[0]
                                                        "
                                                        label="Nama Pengguna"
                                                        type="text"
                                                        outlined
                                                        dense
                                                        flat
                                                    />
                                                </ValidationProvider>
                                            </v-col>
                                            <v-col cols="12" md="12">
                                                <ValidationProvider
                                                    name="No Hp"
                                                    rules="required|numeric|min:10"
                                                    v-slot="{ errors }"
                                                >
                                                    <v-text-field
                                                        v-model="form.no_hp"
                                                        :error="
                                                            errors.length > 0
                                                        "
                                                        :error-messages="
                                                            errors[0]
                                                        "
                                                        label="No Ponsel"
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
                                        <v-row
                                            cols="10"
                                            v-for="(
                                                alamatInput, index
                                            ) in alamatInputs"
                                            :key="index"
                                        >
                                            <v-col>
                                                <ValidationProvider
                                                    name="Alamat"
                                                    rules="required"
                                                    v-slot="{ errors }"
                                                >
                                                    <v-text-field
                                                        v-model="
                                                            alamatInput.alamat
                                                        "
                                                        :error="
                                                            errors.length > 0
                                                        "
                                                        :error-messages="
                                                            errors[0]
                                                        "
                                                        label="Alamat"
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
                                                    @click="addAlamatInput"
                                                    >+</v-btn
                                                >
                                                <v-btn
                                                    v-if="index > 0"
                                                    @click="
                                                        removeAlamatInput(index)
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
                                                    color="success"
                                                    depressed
                                                    class="text-capitalize"
                                                    type="submit"
                                                    :loading="submitProses"
                                                    :disabled="submitProses"
                                                    >Create</v-btn
                                                >
                                                <v-btn
                                                    to="/"
                                                    text
                                                    class="black--text text-capitalize ml-3"
                                                    >Back</v-btn
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
                nama: "",
                email: "",
                no_hp: "",
                alamat: [],
            },
            alamatInputs: [
                {
                    alamat: "",
                }
            ]
        };
    },
    computed: {

    },
    methods: {
        ...mapActions({
            create: 'users/create',
            alert: 'alert'
        }),

        addAlamatInput() {
            this.alamatInputs.push({
                alamat: ''
            })
        },
        removeAlamatInput(index) {
            this.alamatInputs.splice(index, 1)
        },

        async submit() {
            this.submitProses = true;
            this.alamatInputs.map(val => {
                console.log(val.alamat)
                this.form.alamat.push(val.alamat)
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