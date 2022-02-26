function create_hourglass(n) {
    let hourglass_state = [];
    let sand_amount = n - 2;

    for (let i = 0; i < n - 1; i++) {
        hourglass_state.push(Math.max(0, sand_amount));
        sand_amount -= 2;
    }

    hourglass_state.push(n - 2);

    return hourglass_state;
}

function wait(time) {
    let start = Date.now();
    let now = null;
    do {
        now = Date.now()
    } while(now - start < time);
}

function print_state(hourglass_state, sleep_time=50) {
    let n = hourglass_state.length;

    for (let i = 0; i < n; i++) {
        let left_lim = Math.min(i, n - 1 - i);
        let right_lim = Math.max(i, n - 1 - i);
        let sand_remaining = hourglass_state[i];

        process.stdout.write("#");
        for (let j = 1; j < n - 1; j++) {
            if(j < left_lim || j > right_lim) {
                process.stdout.write(" ");
            }
            else if (j == left_lim || j == right_lim) {
                process.stdout.write("#");
            }
            else if (sand_remaining) {
                process.stdout.write("#");
                sand_remaining--;
            }
            else {
                process.stdout.write(" ");
            }
        }
        process.stdout.write("#\n");
    }
    if(sleep_time) {
        wait(sleep_time);
        console.clear();
    }
}

function play(n) {
    let hourglass_state = create_hourglass(n);
    let max_dist = Math.floor((n - 3) / 2);
    for (let dist_border = 1; dist_border <= max_dist; dist_border++) {
        while(hourglass_state[dist_border]) {
            print_state(hourglass_state);
            hourglass_state[dist_border]--;
            hourglass_state[n - 1 - dist_border]++;
        }
    }

    print_state(hourglass_state, 0);
    process.stdout.write("n = " + n + "\n\n");
}

console.log('\033[2J');
let n = process.argv[2];
play(n);
