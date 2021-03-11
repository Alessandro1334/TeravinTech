<template>
    <v-snackbar
        right
        bottom
        v-model="alert.snackbar"
        :color="alert.color"
        :timeout="alert.timeout ? alert.timeout : '-1'"
        elevation="0"
        multi-line
    >
        {{ alert.text }}
        <template v-slot:action="{ attrs }">
            <v-btn color="white" text v-bind="attrs" @click="snackbarClose"
                >Close</v-btn
            >
        </template>
    </v-snackbar>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
    name: "Notif",
    computed: {
        ...mapState({
            alert: state => state.alert
        })
    },
    methods: {
        ...mapActions({
            closeAlert: "closeAlert"
        }),
        snackbarClose() {
            this.closeAlert(false)
        }
    }
};
</script>

<style>
</style>