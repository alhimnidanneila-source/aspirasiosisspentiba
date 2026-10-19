const GAS_URL = "https://script.google.com/macros/s/AKfycbybmsVcZ_uvs_XDw5M9aGYPXtM-UubcIKRP841eVWYI22uRIZ0Fq1rI3bh43EaoMrCsEQ/exec"; // Ganti dengan URL /exec yang disalin di langkah 2

// Fungsi universal untuk memanggil backend GAS
async function fetchGAS(actionName, payloadData = {}) {
  try {
    const response = await fetch(GAS_URL, {
      method: 'POST',
      // Pakai text/plain agar tidak memicu preflight (OPTIONS) dari CORS Google
      headers: {
        'Content-Type': 'text/plain;charset=utf-8',
      },
      body: JSON.stringify({
        action: actionName,
        payload: payloadData
      })
    });

    const result = await response.json();
    
    if (result.status === 'success') {
      return result.data; // Ini berisi data respon atau object pesan
    } else {
      console.error("Backend Error:", result.message);
      throw new Error(result.message);
    }

  } catch (error) {
    console.error("Network/Fetch Error:", error);
    throw error;
  }
}

// --- CARA MENGGUNAKANNYA ---

// 1. Contoh Submit Aspirasi
async function tanganiSubmitForm(event) {
  event.preventDefault();
  
  const formData = {
    nama: document.getElementById('nama').value,
    kelas: document.getElementById('kelas').value,
    kategori: document.getElementById('kategori').value,
    isi: document.getElementById('isi').value
  };

  // Panggil API
  const result = await fetchGAS('submitAspirasi', formData);
  if(result.success) {
    alert(result.message);
  }
}

// 2. Contoh Ambil Data
async function muatDaftarAspirasi() {
  const data = await fetchGAS('getAspirasiList');
  console.log(data); // Array data siap di-loop untuk ditampilkan di HTML
}
