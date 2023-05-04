function getDayOfWeek(dateString) {
    // memisahkan tanggal, bulan, dan tahun
    const [day, month, year] = dateString.split('/').map(Number);
  
    // array untuk menentukan jumlah hari pada setiap bulan pada tahun kabisat dan bukan kabisat
    const daysInMonth = [
      31, // Januari
      year % 4 === 0 ? 29 : 28, // Februari (tahun kabisat jika tahun dapat dibagi 4)
      31, // Maret
      30, // April
      31, // Mei
      30, // Juni
      31, // Juli
      31, // Agustus
      30, // September
      31, // Oktober
      30, // November
      31, // Desember
    ];
  
    // array untuk menentukan nama hari dalam bahasa Indonesia
    const daysOfWeek = [
      'Minggu',
      'Senin',
      'Selasa',
      'Rabu',
      'Kamis',
      'Jumat',
      'Sabtu',
    ];
  
    // menentukan jumlah hari sejak 1 Januari 1900 (tanggal referensi)
    let totalDays = 0;
    for (let i = 1900; i < year; i++) {
      totalDays += i % 4 === 0 ? 366 : 365;
    }
    for (let i = 0; i < month - 1; i++) {
      totalDays += daysInMonth[i];
    }
    totalDays += day - 1;
  
    // menentukan hari dalam bahasa Indonesia
    const dayOfWeek = daysOfWeek[totalDays % 7];
  
    return dayOfWeek;
  }

  function stringToDate(string){
    // memisahkan tanggal, bulan, dan tahun
    const [day, month, year] = string.split(' ');

    if(month.toLowerCase()=="januari" || month.toLowerCase()=="january"){
        newMonth = "01";
    }
    else if(month.toLowerCase()=="februari" || month.toLowerCase()=="february"){
        newMonth = "02";
    }
    else if(month.toLowerCase()=="maret" || month.toLowerCase()=="march"){
        newMonth = "03";
    }
    else if(month.toLowerCase()=="april"){
        newMonth = "04";
    }
    else if(month.toLowerCase()=="mei" || month.toLowerCase()=="may"){
        newMonth = "05";
    }
    else if(month.toLowerCase()=="juni" || month.toLowerCase()=="juny"){
        newMonth = "06";
    }
    else if(month.toLowerCase()=="juli" || month.toLowerCase()=="july"){
        newMonth = "07";
    }
    else if(month.toLowerCase()=="agustus" || month.toLowerCase()=="august"){
        newMonth = "08";
    }
    else if(month.toLowerCase()=="september"){
        newMonth = "09";
    }
    else if(month.toLowerCase()=="oktober" || month.toLowerCase()=="october"){
        newMonth = "10";
    }
    else if(month.toLowerCase()=="november"){
        newMonth = "11";
    }
    else if(month.toLowerCase()=="desember" || month.toLowerCase()=="december"){
        newMonth = "12";
    }

    return day + "/" + newMonth + "/" + year;
  }

module.exports = getDayOfWeek;