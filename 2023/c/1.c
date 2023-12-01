#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <time.h>
#include <Windows.h>

int main()
{

  char *nums[] = {"1", "2", "3", "4", "5", "6", "7", "8", "9", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"};
  FILE *ptr;
  char ch;
  ptr = fopen("../2023-1-input.txt", "r");
  if (ptr == NULL)
  {
    printf("Error!");
    exit(1);
  }

  LARGE_INTEGER frequency, start, stop;

  // Get the frequency of the performance counter
  QueryPerformanceFrequency(&frequency);

  // Get the starting time
  QueryPerformanceCounter(&start);

  // Your function or code here
  char line[100];
  int result = 0;
  int secondResult = 0;
  while (fgets(line, sizeof(line), ptr) != NULL)
  {
    {
      int lineLength = strlen(line);
      char numStr[3];
      for (int i = 0; i < lineLength; i++)
      {
        char currentChar = line[i];
        if (isdigit(currentChar))
        {
          numStr[0] = currentChar;
          break;
        }
      }
      for (int i = lineLength - 1; i >= 0; i--)
      {
        char currentChar = line[i];
        if (isdigit(currentChar))
        {
          numStr[1] = currentChar;
          break;
        }
      }
      numStr[2] = '\0';
      int num = atoi(numStr);
      result += num;
    }
  }

  QueryPerformanceCounter(&stop);

  long long elapsed_us = (stop.QuadPart - start.QuadPart) * 1e6 / frequency.QuadPart;
  printf("\nElapsed time: %lld microseconds\n", elapsed_us);

  // long long elapsed_ns = (stop.QuadPart - start.QuadPart) * 1e9 / frequency.QuadPart;
  // printf("\nElapsed time: %lld nanoseconds\n", elapsed_ns);

  // long long elapsed_ms = (stop.QuadPart - start.QuadPart) * 1e3 / frequency.QuadPart;

  // printf("Elapsed time: %lld milliseconds\n", elapsed_ms);
  printf("Result: %d\n", result);
  fclose(ptr);
  return 0;
}