const { MongoClient } = require("mongodb");

// uri diisi dengan string connection mongoDB
const uri = "mongodb+srv://hobert_jonatan:slebewboy123@cluster0.f0og611.mongodb.net/?retryWrites=true&w=majority"
const dbName = 'chatbot';
const qnaCollection = "qna";
const client = new MongoClient(uri, 
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

const bm = require('./bm.js');
const kmp = require('./kmp.js');
const calculate = require('./calcu.js');
const classifyString = require('./regex.js');
const CRUD = require('./crud.js');
const similarityPercentage = require('./similiarityCalculator.js');
const utils = require('./utils.js');
const getDayOfWeek = require('./tanggal.js');

const FITUR_PERTANYAAN = 1;
const FITUR_TANGGAL = 2;
const FITUR_TAMBAH_PERTANYAAN = 3;
const FITUR_HAPUS_PERTANYAAN = 4;
const FITUR_KALKULATOR = 5;


async function main(string, algo){

    const fitur = classifyString(string);

    try{
        switch(fitur){
            case FITUR_PERTANYAAN:
                console.log("fitur jawab pertanyaan");        
                const jawab = await searchInDB(string, algo);
                if(jawab.length == 1){
                    return jawab[0].jawaban;
                }else{
                    return `Pertanyaan tidak ditemukan di database.\n Apakah maksud Anda:\n 1.${jawab[0].pertanyaan} 2.${jawab[0].pertanyaan} 3.${jawab[0].pertanyaan}`
                }
                
            case FITUR_TANGGAL:
                console.log("fitur tanggal");        
                let dateString;
                try{
                    dateString = utils.extractDate(string); 
                }catch(error){
                    return "Format tanggal yang anda berikan tidak sesuai";
                }
                const day = getDayOfWeek(dateString);
                return `Hari ${day}`;

            case FITUR_TAMBAH_PERTANYAAN:
                console.log("fitur tambah pertanyaan");        
                let pertanyaan, jawaban, extract;
                try{
                    extract = utils.extractQuestionAnswer(string);
                    pertanyaan = extract.question;
                    jawaban = extract.answer;
                }catch(error){
                    return "Format yang anda berikan untuk menambahkan pertanyaan tidak sesuai";
                }

                const pesanTambah = await CRUD.insertQuestion(client, dbName, qnaCollection, string, answer);
                return pesanTambah;

            case FITUR_HAPUS_PERTANYAAN:
                console.log("fitur hapus pertanyaan");        
                let question;
                try{
                    question = utils.extractQuestionOnly(string);
                }catch(error){
                    return "Format yang anda berikan untuk menghapus pertanyaan tidak sesuai";
                }
                const pesanHapus = await CRUD.deleteQuestion(client, dbName, qnaCollection, question);
                return pesanHapus;

            case FITUR_KALKULATOR:
                console.log("fitur kalkulator");
                const hasil = calculate(string);
                return hasil;
                
            default: 
            return "Saya tidak mengerti apa yang Anda katakan"
                
        }
    }catch(error){
        // return "Saya tidak dapat menjawab pertanyaan Anda"
        console.log(error);
    }

}

// TODO : routing fitur, buat pencarian di database dan similaritynya pilih 3

// planing 
// return 1 question atau top 3 question
// top 1 question jika exact match atau minimal 90% match
// top 3 jika tidak ada kasus top 1

async function searchInDB(question, algo){
    let hasil = [];
    const database = await client.db(dbName).collection(qnaCollection).find().toArray();
    const dbLength = database.length;
    let foundExact = false;
    client.connect();
    if(algo == "kmp"){
        for(let i = 0; i < dbLength; i++){
            if(kmp(database[i].pertanyaan.toLowerCase(), question.toLowerCase()) !== -1){
                foundExact = true;
                hasil = [
                    {
                        pertanyaan: question,
                        jawaban: database[i].jawaban
                    }
                ]
                await client.close();
                return hasil;
            }else{
                database[i].percentMatch = similarityPercentage(database[i].pertanyaan.toLowerCase(), question.toLowerCase());
            }
        }
    }else{
        for(let i = 0; i < dbLength; i++){
            if(bm(database[i].pertanyaan.toLowerCase(), question.toLowerCase()) !== -1){
                foundExact = true;
                hasil = [
                    {
                        pertanyaan: question,
                        jawaban: database[i].jawaban
                    }
                ];
                await client.close();
                return hasil;
            }else{
                database[i].percentMatch = similarityPercentage(database[i].pertanyaan.toLowerCase(), question.toLowerCase());
            }
        }
    }

    if(!foundExact){
        database.sort((a,b) => b.percentMatch - a.percentMatch);
        if(database[0].percentMatch >= 0.9){
            hasil = [database[0]];
        }else{
            hasil = database.slice(0, 3);
        }
        await client.close();
        return hasil;
    }
}


async function main2(){
    const hasil = await main('Tambahkan pertanyaan "siapa nama presiden pertama indonesia" dengan jawaban "Insinyur soekarno" ke database', "kmp");
    console.log(hasil);
}

main2()