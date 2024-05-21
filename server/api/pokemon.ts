import pokedex from '../../data/pokedex.json';

// Mendefinisikan handler untuk event yang menangani permintaan API
export default defineEventHandler((event) => {
    // Mengambil query parameter 'q' dari event request, jika tidak ada, defaultnya adalah string kosong
    const { q = '' } = getQuery(event);

    // Memfilter data pokedex berdasarkan query yang dimasukkan
    // Hanya pokemon yang namanya dalam bahasa Inggris mengandung substring yang sesuai dengan query (tidak case-sensitive)
    return pokedex.filter((pokemon: any) =>
        pokemon.name.english.toLowerCase().includes((q as string).toLowerCase())
    );
});
