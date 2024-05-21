<script setup lang="ts">
import { refDebounced } from "@vueuse/core";

// Mendefinisikan variabel reaktif 'query' untuk menyimpan kata kunci pencarian
const query = ref("");

// Menggunakan refDebounced untuk menunda pembaruan 'query' selama 1000 milidetik
refDebounced(query, 1000);

// Menggunakan useFetch untuk mengambil data pokemon berdasarkan query yang dimasukkan
const {
  data: pokemons, // Data pokemon yang diambil
  pending, // Status pending saat data sedang diambil
  error, // Status error jika terjadi kesalahan saat pengambilan data
} = useFetch(() => `/api/pokemon?q=${query.value}`);
</script>

<template>
  <div>
    <header class="container mx-auto py-4">
      <form class="flex flex-wrap">
        <div class="relative font-normal text-gray-700 w-1/2">
          <!-- Input untuk kata kunci pencarian pokemon -->
          <input
            v-model="query"
            type="text"
            placeholder="Search Pokemon"
            class="w-full p-2 rounded border-1 border-gray-200"
            id="search"
          />
        </div>
      </form>
    </header>

    <!-- Menampilkan pesan error jika terjadi kesalahan saat pengambilan data -->
    <div
      class="bg-red-200 rounded font-sans p-4 container mx-auto text-red-500"
      v-if="error"
    >
      <i class="inline-block mr-2 mdi-alert-octagon" />
      Oops.. There was an error landing the pokedex
    </div>

    <!-- Menampilkan pesan loading saat data sedang diambil -->
    <div
      class="bg-gray-200 rounded font-sans p-4 container mx-auto text-gray-500"
      v-if="pending"
    >
      <i class="inline-block mr-2 svg-spinners:180-ring-with-bg" />
      Loading...
    </div>

    <!-- Menampilkan daftar pokemon jika data berhasil diambil -->
    <div class="w-full pt-8 grid grid-cols-6 gap-5 mx-auto container" v-else>
      <div
        v-for="pokemon of pokemons"
        :key="pokemon.name.english"
        class="flex flex-col border-1 rounded border-gray-200 shadow-md p-2"
      >
        <!-- Menampilkan gambar pokemon -->
        <img
          :src="pokemon.image.sprite"
          :alt="pokemon.name.english"
          class="w-20 h-20 mx-auto item-center"
        />
        <div class="mt-2">
          <!-- Menampilkan nama pokemon dalam bahasa Inggris -->
          <h2 class="text-xl font-bold text-center">
            {{ pokemon.name.english }}
          </h2>
          <!-- Menampilkan nama pokemon dalam bahasa Jepang -->
          <h3 class="text-xl text-center">
            {{ pokemon.name.japanese }}
          </h3>
          <!-- Menampilkan jenis-jenis pokemon -->
          <p class="text-center">{{ pokemon.type.join(", ") }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
