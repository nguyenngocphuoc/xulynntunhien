var vntk = require('vntk'); // thư viện vntk
const fs = require('fs');
const path = process.cwd(); // khai bao path thư mục


// mở file chứa đoạn văn bản đầu vào
let inputStr = fs.readFileSync(path + "\\inputdata.txt").toString();
// bỏ các ký tự đặc biệt 
inputStr = removeSpecialCharacter(inputStr);


// ***tách từ văn bản***
// khởi tạo đối tượng
var tokenizer = vntk.wordTokenizer();
//tách
let tachTuVanBan = tokenizer.tag(inputStr);
// biểu thị dưới dạng chuỗi
tachTuVanBan = tachTuVanBan.join('|');
// viết ra
write('tachTuVanBan.txt', tachTuVanBan);

// ***loại bỏ từ dừng***
let loaiBoTuDung = removeStopWord(inputStr.split(' ')).join(' ');
// viết ra
write('loaiBoTuDung.txt', loaiBoTuDung);

// khởi tạo đối tượng
var pos_tag = vntk.posTag();
// gán nhãn cho từng từ
var ganNhanArr = pos_tag.tag(inputStr);
// nối lại thành chuỗi
let ganNhan = "";
ganNhanArr.forEach(element => {
    try {
        ganNhan += element[0] + "[" + element[1] + "] ";
    } catch (error) {

    }
});
//viết ra
write('ganNhan.txt', ganNhan);


function removeStopWord(arr) {
    let stopWords = fs.readFileSync(path + "\\StopWord.txt").toString();
    stopWords = stopWords.split("\n");
    let result = [];
    let callback = (element) => {
        if (stopWords.indexOf(element) == -1) {
            result.push(element.trim())
        }
    }
    arr.forEach(callback);
    return result;
}

function write(filename, tachTuVanBan) {
    fs.writeFile(path + "/" + filename, inputStr + "\n\n\n\nkết quả : \n" + tachTuVanBan, function (err) {
        if (err) {
            return console.log(err);
        }
        console.log("The " + filename + "file was saved!");
    });
}

function removeSpecialCharacter(string) {
    return string.replace('/%@$.,=+-!;/()*"&^:#|\n\t\'/g', '');
}