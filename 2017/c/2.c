#include <stdio.h>
#include "timer_utils.h"

int main()
{
  timer_start();
  FILE *fp = fopen("../2017-2-input.txt", "r");
  char line[100];
  int part1 = 0;
  int part2 = 0;
  while (fgets(line, sizeof(line), fp))
  {
    char c;
    int lowest = -1;
    int highest = 0;
    int charIndex = 0;
    char numStr[20];
    int numStrIndex = 0;
    int lineNumbers[20];
    int lineNumberIndex = 0;
    while (1)
    {
      c = line[charIndex];
      if (c == '\t' || c == '\n')
      {
        numStr[numStrIndex] = '\0';
        int num = atoi(numStr);
        lineNumbers[lineNumberIndex] = num;
        numStrIndex = 0;
        if (num < lowest || lowest == -1)
        {
          lowest = num;
        }
        if (num > highest)
        {
          highest = num;
        }
        if (c == '\n')
        {
          part1 += (highest - lowest);
          for (int i = 0; i < lineNumberIndex; i += 1)
          {
            for (int ii = lineNumberIndex; ii > 0; ii -= 1)
            {
              if (ii != i)
              {
                int first = lineNumbers[i];
                int second = lineNumbers[ii];
                if (first % second == 0)
                {
                  part2 += first / second;
                  goto thebreak;
                }
                else if (second % first == 0)
                {
                  part2 += second / first;
                  goto thebreak;
                }
              }
            }
          }
          thebreak:
          break;
        }
        else
        {
          lineNumberIndex += 1;
        }
      }
      else
      {
        numStr[numStrIndex] = c;
        numStrIndex += 1;
      }
      charIndex += 1;
    }
  }
  double elapsed = timer_elapsed_microseconds();
  printf("\nElapsed: %.3f us\n", elapsed);
  printf("\nPart 1: %d", part1);
  printf("\nPart 2: %d", part2);

  return 0;
}