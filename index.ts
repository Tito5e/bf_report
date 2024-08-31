const ALLOWED = ["+", "-", "<", ">", ".", ",", "[", "]", ";", "@"];

const MEMORY = {
    /* CELL POINTER */
    pointer: 0,

    /* CELL */
    cell: [...new Array(30000)].fill(0),

    /* インタプリタの内部ステート */
    codes: [] as string[],
    cursor: 0 as number,
};

(() => {
    const input = `++++++++++
[
>+++++++
>++++++++++
>+++++++++++
>+++
>+++++++++
>+
<<<<<<-]>++.
>+.
>--..
+++.
>++.
>---.
<<.
+++.
------.
<-.
>>+.
>>.`;

    const codes = input.split("");

    MEMORY.codes = codes;
    MEMORY.cursor = 0;

    cleanup();

    run();
})();

function cleanup() {
    MEMORY.codes = MEMORY.codes.filter((v) => {
        return ALLOWED.includes(v);
    });
}

function run() {
    while (MEMORY.cursor < MEMORY.codes.length) {
        switch (MEMORY.codes[MEMORY.cursor]) {
            case "+": {
                increment();
                break;
            }
            case "-": {
                decrement();
                break;
            }
            case "<": {
                prev();
                break;
            }
            case ">": {
                next();
                break;
            }
            case ".": {
                process.stdout.write(
                    `${String.fromCharCode(MEMORY.cell[MEMORY.pointer])}`
                );
                break;
            }
            case ",": {
                MEMORY.cell[MEMORY.pointer] = prompt()?.charCodeAt(0);
                break;
            }
            case ";": {
                print();
                break;
            }
            case "@": {
                cursor();
                break;
            }
            case "[": {
                if (MEMORY.cell[MEMORY.pointer] === 0) {
                    MEMORY.cursor++;
                    jump();
                }
                break;
            }
            case "]": {
                if (MEMORY.cell[MEMORY.pointer] !== 0) {
                    MEMORY.cursor--;
                    end();
                }
                break;
            }
        }
        MEMORY.cursor++;
    }
}

function increment() {
    MEMORY.cell[MEMORY.pointer] += 1;
}

function decrement() {
    MEMORY.cell[MEMORY.pointer] -= 1;
}

function prev() {
    if (MEMORY.pointer > 0) MEMORY.pointer--;
}

function next() {
    if (MEMORY.pointer < 29999) MEMORY.pointer++;
}

function print() {
    process.stdout.write(`${MEMORY.cell} @${MEMORY.pointer}`);
}

function cursor() {
    process.stdout.write(`(CURSOR:${String.fromCharCode(MEMORY.cursor)})`);
}

function jump() {
    let indent = 0;
    while (!(MEMORY.codes[MEMORY.cursor] === "]" && indent <= 0)) {
        switch (MEMORY.codes[MEMORY.cursor]) {
            case "[": {
                indent++;
                break;
            }
            case "]": {
                indent--;
                break;
            }
        }
        MEMORY.cursor++;
    }
    MEMORY.cursor++;
}

function end() {
    let indent = 0;
    while (!(MEMORY.codes[MEMORY.cursor] === "[" && indent <= 0)) {
        switch (MEMORY.codes[MEMORY.cursor]) {
            case "]": {
                indent++;
                break;
            }
            case "[": {
                indent--;
                break;
            }
        }
        MEMORY.cursor--;
    }
}
