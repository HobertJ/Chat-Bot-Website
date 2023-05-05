async function calculate(expression) {
    // Fungsi untuk mengembalikan nilai dari dua buah angka dengan satu buah operator
    const evaluate = (op, a, b) => {
      switch (op) {
        case "+":
          return a + b;
        case "-":
          return a - b;
        case "*":
          return a * b;
        case "/":
          return a / b;
      }
    };
  
    // Array untuk menampung operand dan operator
    const operands = [];
    const operators = [];
  
    // Fungsi untuk memproses tumpukan operand dan operator
    const processStack = () => {
      const b = operands.pop();
      const a = operands.pop();
      const op = operators.pop();
      operands.push(evaluate(op, a, b));
    };
  
    // Mendefinisikan urutan prioritas operator, lebih tinggi nilai, lebih diprioritaskan
    const priority = { "+": 1, "-": 1, "*": 2, "/": 2 };
  
    // Memproses setiap karakter dalam expression
    for (let i = 0; i < expression.length; i++) {
      const char = expression[i];
      if (/\d/.test(char)) {
        // Jika karakter adalah angka, tambahkan ke stack operand
        let j = i;
        while (j < expression.length && /\d/.test(expression[j])) {
          j++;
        }
        operands.push(parseInt(expression.substring(i, j)));
        i = j - 1;
      } else if (char === "(") {
        // Jika karakter adalah tanda kurung buka, tambahkan ke stack operator
        operators.push(char);
      } else if (char === ")") {
        // Jika karakter adalah tanda kurung tutup, proses tumpukan operator
        while (operators.length > 0 && operators[operators.length - 1] !== "(") {
          processStack();
        }
        operators.pop(); // Hapus tanda kurung buka
      } else {
        // Jika karakter adalah operator, proses tumpukan operator yang memiliki prioritas lebih tinggi
        while (
          operators.length > 0 &&
          priority[char] <= priority[operators[operators.length - 1]]
        ) {
          processStack();
        }
        operators.push(char);
      }
    }
  
    // Proses sisa tumpukan operator
    while (operators.length > 0) {
      processStack();
    }
  
    // Hasil akhir adalah nilai dalam tumpukan operand
    if(!isNaN(operands[0])){
      return operands[0];
    }
    else{
      return "Sintaks persamaan tidak sesuai.";
    }
  }
  
module.exports = calculate;