<template>
    <v-footer padless>
        <v-row justify="center" no-gutters>
            <v-col class="py-4 text-center" cols="12">
                {{ new Date().getFullYear() }} —
                <span>Micro</span>
                <span>
                    <strong>Market</strong>.dev
                </span>
            </v-col>
        </v-row>
    </v-footer>
</template>

<script>
export default {
    name: "Footer",
};
</script>

<style>
</style>