// const { MongoClient } = require("mongodb");

// // Replace the uri string with your connection string.
// const uri = "mongodb+srv://hobert_jonatan:slebewboy123@cluster0.f0og611.mongodb.net/?retryWrites=true&w=majority"
// const dbName = 'chatbot
// const client = new MongoClient(uri, 
//     {
//         useNewUrlParser: true,
//         useUnifiedTopology: true,
//     });

// async function main(){

//     try{
//         client.connect();
//         const hasil = await insertQuestion(client, "siapa bapak anda", "cicak kakinya 4 kuntul!");
//         console.log(hasil);
//     }catch(e){
//         console.log(e);
//     }finally{
//         await client.close();
//     }
// }

async function isQuestionInDB(client, dbName, collectionName, question, answer){
    const questionOnly = await client.db(dbName).collection(collectionName).findOne({pertanyaan: question});
    const both = await client.db(dbName).collection(collectionName).findOne({
        pertanyaan: question,
        jawaban: answer,
    });

    const result = {
        both: false,
        questionOnly: false,
    };

    if(both){
        result.both = true;
    }else if(questionOnly){
        result.questionOnly = true;
    }

    return result;
}

// fungsi untuk menjawab pertanyaan yang diberikan
async function answerQuestion(client, dbName, collectionName, question){
    const result = await client.db(dbName).collection(collectionName).findOne({pertanyaan: question});

    if(result){
        console.log(`Ketemu pertanyaan dengan jawaban "${result.jawaban}"`);
        const hasil = result.jawaban.toString();
        console.log(hasil.type)
    }else{
        console.log('Tidak ketemu jawaban untuk pertanyaan tersebut');
    }
}


// fungsi untuk memasukan sebuah pertanyaan beserta jawabannya ke dalam database
// bisa juga untuk mengupdate jawaban dari pertanyaan yang sudah ada 
async function insertQuestion(client, dbName, collectionName, question, answer){

    const exist = await isQuestionInDB(client, question, answer);

    if(exist.both){
        return(`Pertanyaan "${question}" telah memiliki jawaban "${answer}" pada database.`)
    }else if(exist.questionOnly){
        const result = await client.db(dbName).collection(collectionName).updateOne({
            pertanyaan: question
        }, 
        {
            $set: {
                jawaban: answer
            }
        });

        if(result){
            return(`Pertanyaan "${question}" sudah ada! Jawaban di update ke "${answer}"`);
        }else{
            return(`Pertanyaan "${question}" sudah ada! Tetapi gagal mengupdate jawaban ke "${answer}" karena kesalahan sistem`);
        }
    }else{
        const result = await client.db(dbName).collection(collectionName).insertOne({
            pertanyaan: question,
            jawaban: answer
        });

        if(result){
            return(`Berhasil menambahkan pertanyaan "${question}" dengan jawaban "${answer}" ke database`);
        }else{
            return("Gagal menambahkan pertanyaan ke database");
        }
    }

    // return 1;

}

// fungsi untuk menghapus sebuah pertanyaan dari database 
async function deleteQuestion(client, dbName, collectionName, question){
    const result = await client.db(dbName).collection(collectionName).deleteOne({
        pertanyaan: question
    })

    if(result){
        if(result.deletedCount == 0){
            return("Pertanyaan tersebut tidak ada pada database");
        }else{
            return("Berhasil menghapus pertanyaan dari database")
        }
    }else{
        return('Gagal menghapus data dari database karena kegagalan sistem');
    }
}


// EXTRA FUNCTION 

// fungsi untuk menampilkan seluruh pertanyaan dan jawaban yang ada dalam collection qna 
// hanya untuk checking sementara
async function printArrayOfqna(client, dbName, collectionName){
    const result = await client.db(dbName).collection(collectionName).find().toArray();
    if(result){
        // console.log(result);
    }else{
        console.log('Collection tersebut tidak ada atau kosong');
    }

    result.forEach(res => {
        console.log(`Pertanyaan: ${res.pertanyaan}`)
        console.log(`Jawaban: ${res.jawaban}`);
        console.log();
    })
}

// fungsi untuk menampilkan seluruh database yang tersedia pada cluster ini
async function printAvailableDatabases(client){
    const dbList = await client.db().admin().listDatabases();

    console.log("Available Databases:");
    dbList.databases.forEach(db => {
        console.log(`- ${db.name}`);
    })
}


// export modules 

module.exports.answerQuestion = answerQuestion;
module.exports.insertQuestion = insertQuestion;
module.exports.deleteQuestion = deleteQuestion; 