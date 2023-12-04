#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <time.h>
#include <Windows.h>

struct Card
{
  int copies;
  int matches;
};

int main()
{
  FILE *ptr;
  char ch;
  ptr = fopen("../2023-4-input.txt", "r");
  struct Card cards[194] = {{0, 0}};

  LARGE_INTEGER frequency, start, stop;
  QueryPerformanceFrequency(&frequency);
  QueryPerformanceCounter(&start);
  char line[120];
  int currentLine = 0;
  int firstResult = 0;
  int secondResult = 0;
  while (fgets(line, sizeof(line), ptr) != NULL)
  {
    int points = 0;
    int matches = 0;
    int leftNumbers[10];
    int rightNumbers[25];
    char *left = strtok(line, "|");
    char *right = strtok(NULL, "|");
    strtok(left, ":");
    char *leftNumbersString = strtok(NULL, ":");

    char *leftNumStr = strtok(leftNumbersString, " ");
    leftNumbers[0] = atoi(leftNumStr);
    for (int i = 1; i < 10;i++) {
      leftNumStr = strtok(NULL, " ");
      leftNumbers[i] = atoi(leftNumStr);
    }
    char *rightNumStr = strtok(right, " ");
    rightNumbers[0] = atoi(rightNumStr);
    for (int i = 1; i < 25;i++) {
      rightNumStr = strtok(NULL, " ");
      rightNumbers[i] = atoi(rightNumStr);
    }

    for (int i = 0; i < 10; i++) {
      int leftNum = leftNumbers[i];
      for (int j = 0; j < 25;j++) {
        if (leftNum == rightNumbers[j]) {
          matches += 1;
          if (points == 0) {
            points = 1;
          } else {
            points = points * 2;
          }
        }
      }
    }
    cards[currentLine].copies += 1;
    cards[currentLine].matches = matches;
    firstResult += points;
    for (int i = 0; i < cards[currentLine].copies;i++) {
      for (int j = 1; j <= cards[currentLine].matches;j++) {
        cards[currentLine + j].copies += 1;
      }
    }
    secondResult += cards[currentLine].copies;

    currentLine += 1;
  }
  QueryPerformanceCounter(&stop);
  long long elapsed_us = (stop.QuadPart - start.QuadPart) * 1e6 / frequency.QuadPart;
  long long elapsed_ns = (stop.QuadPart - start.QuadPart) * 1e9 / frequency.QuadPart;
  printf("Elapsed time: %lld microseconds\n", elapsed_us);
  printf("Elapsed time: %lld nanoseconds\n", elapsed_ns);

  printf("first result: %d\n", firstResult);
  printf("second result: %d\n", secondResult);
  fclose(ptr);
}