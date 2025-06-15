#include <stdio.h>
#include <stdlib.h>
#include "timer_utils.h"

int main()
{

  timer_start();
  FILE *fp;

  fp = fopen("../2017-2-input.txt", "r");
  int c;

  int currentChar = 0;
  int part1 = 0;
  int lowest = -1;
  int highest = 0;

  while ((c = fgetc(fp)))
  {
    char currNumStr[20];
    if (c == '\t' || c == '\n' || c == EOF)
    {
      currNumStr[currentChar] = '\0';
      int num = atoi(currNumStr);
      if (num < lowest || lowest == -1)
      {
        lowest = num;
      }
      if (num > highest)
      {
        highest = num;
      }
      currentChar = 0;
      if (c == '\n' || c== EOF)
      {
        part1 += (highest - lowest);
        lowest = -1;
        highest = 0;
        if (c == EOF) {
          break;
        }
      }
    }
    else
    {
      currNumStr[currentChar] = c;
      currentChar += 1;
    }
  }
  double elapsed = timer_elapsed_microseconds();
  
  printf("Part 1: %d", part1);
  printf("\nElapsed: %.3f us\n", elapsed);

  fclose(fp);
}