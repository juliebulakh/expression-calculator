function eval() {
    // Do not use eval!!!
    return;
}

function expressionCalculator(expr) {

    const priority = {
        "+": 1,
        "-": 1,
        "*": 2,
        "/": 2
    };
    const operationMath = {
        "+": (a, b) => +a + +b,
        "-": (a, b) => a - b,
        "*": (a, b) => a * b,
        "/": (a, b) => a / b
    };
    let stack = [];
    let stackOp = [];
    let exp = expr.replace(/\s+/g, "").split(/(\D)/).filter(a => a !== "");
    let bracket = "()";
    
    function calculation(a, b) {
        a.splice(-2, 2, operationMath[b[b.length - 1]](a[a.length - 2], a[a.length - 1]));
        b.splice(-1, 1);
    }


    if (exp.filter(a => a == bracket[0]).length != exp.filter(a => a == bracket[1]).length) {
        throw new Error("ExpressionError: Brackets must be paired");
    }
    if (exp.join("").includes("/0")) {
        throw new Error("TypeError: Division by zero.");
    }

    for (i = 0; i < exp.length; i++) {
        let el = exp[i];
        if (isFinite(el)) {
            stack.push(el);
        }
        else if (isNaN(el)) {
            while (priority[el] <= priority[stackOp[stackOp.length - 1]]) {
                calculation(stack, stackOp);
            }
            if (el == bracket[1]) {
                while (stackOp[stackOp.length - 1] != bracket[0]) {
                    calculation(stack, stackOp);
                }
                stackOp.splice(-1, 1);
            }
            else stackOp.push(el);
        }
    }
    for (i = stackOp.length - 1; i >= 0; i--) {
        calculation(stack, stackOp);
    }
    return Number(stack);
}

module.exports = {
    expressionCalculator
}