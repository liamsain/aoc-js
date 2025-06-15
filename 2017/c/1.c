#include <stdio.h>
#include "timer_utils.h"

int main()
{
  timer_start();

  FILE *fp = fopen("../2017-1-input.txt", "r");
  int nums[3000];

  if (fp == NULL)
  {
    printf("Could not open file");
    return 1;
  }
  int first = fgetc(fp) - '0';
  nums[0] = first;
  int totalNumbers = 1;
  int prev = first;
  int curr = 0;
  int part1 = 0;
  int part2 = 0;
  while ((curr = fgetc(fp)) != EOF)
  {
    int i = curr - '0';
    nums[totalNumbers] = i;
    totalNumbers += 1;
    if (i == prev)
    {
      part1 += i;
    }
    prev = i;
  }
  fclose(fp);
  if (first == prev)
  {
    part1 += first;
  }
  int middle = totalNumbers / 2;
  curr = 0;
  while (curr < middle) {
    int cmpIndex = curr + middle;
    if (nums[curr] == nums[cmpIndex]) {
      part2 += nums[curr] * 2;
    }
    curr += 1;
  }


  double elapsed = timer_elapsed_microseconds();
  printf("Elapsed: %.3f us\n", elapsed);
  printf("Part 1: %d\n", part1);
  printf("Part 2: %d\n", part2);

  return 0;
}