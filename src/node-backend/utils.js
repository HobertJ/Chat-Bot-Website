function extractQuestionAnswer(str) {
  const regex = /Tambahkan\s+pertanyaan\s+("?)(.*?)\1\s+dengan\s+jawaban\s+("?)(.*?)\3(?:\s+ke dalam database|ke database)?\s*$/i;
  const matches = str.match(regex);

  if (!matches || matches.length !== 5) {
    throw new Error('Format string tidak sesuai');
  }

  const question = matches[2];
  const answer = matches[4];

  return { question, answer };
}

function extractQuestionOnly(str){
  const regex = /Hapus\s+pertanyaan\s+("?)(.*?)\1(?:\s+dari database)?\s*$/i;
  const matches = str.match(regex);

  if( !matches || matches.length !== 3){
    throw new Error('Format string tidak sesuai');
  }

  const question = matches[2];

  return question;
}

function extractDate(str) {
  const regex = /(\d{2})\/(\d{2})\/(\d{4})/;
  const matches = str.match(regex);

  if (!matches || matches.length < 4) {
    throw new Error('Format string tidak sesuai');
  }

  return `${matches[1]}/${matches[2]}/${matches[3]}`
}

module.exports.extractQuestionAnswer = extractQuestionAnswer;
module.exports.extractQuestionOnly = extractQuestionOnly;
module.exports.extractDate = extractDate;