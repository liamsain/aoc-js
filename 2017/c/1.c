#include <stdio.h>
#include "timer_utils.h"
#include <string.h>

int main()
{
  timer_start();

  char charNums[4500];
  FILE *fp = fopen("../2017-1-input.txt", "r");
  if (!fp)
  {
    printf("could not open file");
    return 1;
  }

  fgets(charNums, sizeof(charNums), fp);
  int part1 = 0;
  int part2 = 0;
  int currentIndex = 0;
  int actualNumsLength = strlen(charNums);
  int curr = 0;
  int middle = actualNumsLength / 2;
  while (currentIndex < actualNumsLength)
  {
    curr = charNums[currentIndex] - '0';
    int next = charNums[currentIndex + 1] - '0';
    if (curr == next)
    {
      part1 += curr;
    }
    if (curr == charNums[currentIndex + middle] - '0')
    {
      if (currentIndex <= middle)
      {
        part2 += curr * 2;
      }
    }

    currentIndex += 1;
  }

  if (curr == charNums[0] - '0')
  {
    part1 += curr;
  }

  double elapsed = timer_elapsed_microseconds();
  printf("\nElapsed: %.3f us\n", elapsed);
  printf("Part 1: %d", part1);
  printf("\nPart 2: %d", part2);

  fclose(fp);
  return 0;
}