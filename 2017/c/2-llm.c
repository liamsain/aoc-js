#include <stdio.h>
#include "timer_utils.h"

int main() {
    timer_start();
    FILE *fp = fopen("../2017-2-input.txt", "r");
    char line[100];
    int part1 = 0;

    while (fgets(line, sizeof(line), fp)) {
        int lowest = 2147483647; // INT_MAX
        int highest = -2147483648; // INT_MIN
        int num = 0;
        int in_number = 0;

        for (char *p = line; *p; p++) {
            if (*p >= '0' && *p <= '9') {
                num = num * 10 + (*p - '0');
                in_number = 1;
            } else if (in_number) {
                if (num < lowest) lowest = num;
                if (num > highest) highest = num;
                num = 0;
                in_number = 0;
            }
        }
        // Check last number on line
        if (in_number) {
            if (num < lowest) lowest = num;
            if (num > highest) highest = num;
        }

        if (lowest != 2147483647 && highest != -2147483648) {
            part1 += (highest - lowest);
        }
    }

    fclose(fp);
    double elapsed = timer_elapsed_microseconds();
    printf("\nElapsed: %.3f us\n", elapsed);
    printf("\nPart 1: %d\n", part1);

    return 0;
}
