function classifyString(inputString) {
    const FITUR_PERTANYAAN = 1;
    const FITUR_TANGGAL = 2;
    const FITUR_TAMBAH_PERTANYAAN = 3;
    const FITUR_HAPUS_PERTANYAAN = 4;
    const FITUR_KALKULATOR = 5;
    const UNKNOWN = 6;

    if (/what|where|when|why|how|apa|dimana|kapan|kenapa|bagaimana|benarkah/i.test(inputString)) {
      return FITUR_PERTANYAAN;
    } 
    else if (/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(inputString)) {
      return FITUR_TANGGAL;
    } 
    else if (/hari.*\d{1,2}\/\d{1,2}\/\d{4}$|^\d{1,2}\/\d{1,2}\/\d{4}$/.test(inputString)) {
      return FITUR_TANGGAL;
    } 
    else if (/^\d{1,2}\s+[a-z]+\s+\d{4}$/i.test(inputString)) {
      return FITUR_TANGGAL;
    } 
    else if (/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(inputString)) {
      return FITUR_TANGGAL;
    }
    else if (/add|Tambahkan pertanyaan/i.test(inputString)) {
      return FITUR_TAMBAH_PERTANYAAN;
    } 
    else if (/delete|remove|Hapus pertanyaan/i.test(inputString)) {
      return FITUR_HAPUS_PERTANYAAN;
    }
    else if (/[\d+\-*\/\s]+/.test(inputString)) {
      return FITUR_KALKULATOR
    } 
    else {
      return UNKNOWN;
    }
  }

module.exports = classifyString;