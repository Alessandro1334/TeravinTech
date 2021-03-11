<template>
    <v-simple-table fixed-header>
        <template v-slot:default>
            <thead>
                <tr>
                    <th class="text-center" width="3%">No</th>
                    <th class="text-left">Nama</th>
                    <th class="text-left">Email</th>
                    <th class="text-left">No Hp</th>
                    <th class="text-center">Foto</th>
                    <th class="text-center">Status</th>
                    <th class="text-center" width="10%">Aksi</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(data, index) in pengguna" :key="data.id">
                    <td>{{ index + 1 }}</td>
                    <td>{{ data.nm_pengguna }}</td>
                    <td>{{ data.email }}</td>
                    <td>{{ data.no_hp }}</td>
                    <td class="text-center">
                        <v-btn
                            target="_blank"
                            x-small
                            text
                            fab
                            :href="data.foto"
                        >
                            <v-icon>mdi-image</v-icon></v-btn
                        >
                    </td>
                    <td class="text-center">
                        <v-btn class="text-capitalize" x-small depressed text>{{
                            data.status
                        }}</v-btn>
                    </td>
                    <td align="center">
                        <div class="d-inline">
                            <v-tooltip top>
                                <template v-slot:activator="{ on, attrs }">
                                    <v-btn
                                        text
                                        x-small
                                        fab
                                        class="mx-1"
                                        v-bind="attrs"
                                        v-on="on"
                                    >
                                        <v-icon>mdi-account</v-icon>
                                    </v-btn>
                                </template>
                                <span>Detail</span>
                            </v-tooltip>
                            <v-tooltip top>
                                <template v-slot:activator="{ on, attrs }">
                                    <v-btn
                                        text
                                        x-small
                                        fab
                                        class="mx-1"
                                        v-bind="attrs"
                                        v-on="on"
                                    >
                                        <v-icon>mdi-pencil</v-icon>
                                    </v-btn>
                                </template>
                                <span>Ubah</span>
                            </v-tooltip>
                            <v-tooltip top>
                                <template v-slot:activator="{ on, attrs }">
                                    <v-btn
                                        text
                                        x-small
                                        fab
                                        class="mx-1"
                                        v-bind="attrs"
                                        v-on="on"
                                    >
                                        <v-icon>mdi-delete</v-icon>
                                    </v-btn>
                                </template>
                                <span>Hapus</span>
                            </v-tooltip>
                        </div>
                    </td>
                </tr>
            </tbody>
        </template>
    </v-simple-table>
</template>