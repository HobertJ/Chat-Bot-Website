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
    client.connect();

    try{
        switch(fitur){
            case FITUR_PERTANYAAN:
                console.log("fitur jawab pertanyaan");        
                const jawab = await searchInDB(string, algo);
                if(jawab.length == 1){
                    return jawab[0].jawaban;
                }else{
                    return `Pertanyaan tidak ditemukan di database.\nApakah maksud Anda:\n1.${jawab[0].pertanyaan}\n2.${jawab[1].pertanyaan}\n3.${jawab[2].pertanyaan}`
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

                const pesanTambah = await CRUD.insertQuestion(client, dbName, qnaCollection, pertanyaan, jawaban);
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
    }finally{
        await client.close();
    }
}

async function searchInDB(question, algo){
    let hasil = [];
    const database = await client.db(dbName).collection(qnaCollection).find().toArray();
    const dbLength = database.length;
    let foundExact = false;
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
                return hasil;
            }else{
                database[i].percentMatch = similarityPercentage(database[i].pertanyaan.toLowerCase(), question.toLowerCase());
            }
        }
    }

    if(!foundExact){
        database.sort((a,b) => b.percentMatch - a.percentMatch);
        if(database[0].percentMatch >= 90){
            hasil = [database[0]];
        }else{
            hasil = database.slice(0, 3);
        }
        return hasil;
    }
}


async function main2(){
    const hasil = await main('siapa presiden indonesia', "kmp");
    console.log(hasil);
}

main2()