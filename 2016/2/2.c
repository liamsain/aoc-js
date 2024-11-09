#include <stdio.h>
#include <windows.h>
#include <stdlib.h>

void main() {
  LARGE_INTEGER frequency;
  LARGE_INTEGER start;
  LARGE_INTEGER end;
  double elapsed;

  QueryPerformanceFrequency(&frequency);
  QueryPerformanceCounter(&start);

  FILE *fp;
  fp = fopen("2.txt", "r");
  int ic;
  int currentNum = 5;
  int code[5];
  int currentCodeIndex = 0;

  char part2Code[5];
  char currentChar = '5';
  int currentPart2CodeIndex = 0;

  while ((ic = getc(fp))) {
    char c = (char)ic;
    if (c == 'D') {
      switch (currentChar)
      {
      case '1':
        currentChar = '3';
        break;
      case '2':
        currentChar = '6';
        break;
      case '3':
        currentChar = '7';
        break;
      case '4':
        currentChar = '8';
        break;
      case '6':
        currentChar = 'A';
        break;
      case '7':
        currentChar = 'B';
        break;
      case '8':
        currentChar = 'C';
        break;
      case 'B':
        currentChar = 'D';
        break;
      default:
        break;
      }
      if (currentChar == '1') {
        currentChar = '3';
      } else 
      if (currentNum < 7) {
        currentNum += 3;
      }
    } else if (c == 'U') {
      switch (currentChar)
      {
      case '3':
        /* code */
        currentChar = '1';
        break;
      case '6':
        currentChar = '2';
        break;
      case '7': 
        currentChar = '3';
        break;
      case '8':
        currentChar = '4';
        break;
      case 'A':
        currentChar = '6';
        break;
      case 'B':
        currentChar = '7';
        break;
      case 'C':
        currentChar = '8';
        break;
      case 'D':
        currentChar = 'B';
        break;
      default:
        break;
      }
      if (currentNum > 3) {
        currentNum -= 3;
      }
    } else if (c == 'L') {
      switch (currentChar)
      {
      case '3':
        currentChar = '2';
        break;
      case '4':
        currentChar = '3';
        break;
      case '6':
        currentChar = '5';
        break;
      case '7':
        currentChar = '6';
        break;
      case '8':
      currentChar = '7';
      break;
      case '9':
      currentChar = '8';
      break;
      case 'B':
      currentChar = 'A';
      break;
      case 'C':
      currentChar = 'B';
      default:
        break;
      }
      if (currentNum != 1 && currentNum != 4 && currentNum != 7) {
        currentNum -= 1;
      }
    } else if (c == 'R') {
      switch (currentChar)
      {
      case '2':
        currentChar = '3';
        break;
      case '3':
      currentChar = '4';
      break;
      case '5':
      currentChar = '6';
      break;
      case '6':
      currentChar = '7';
      break;
      case '7':
      currentChar = '8';
      break;
      case '8':
      currentChar = '9';
      break;
      case 'A':
      currentChar = 'B';
      break;
      case 'B':
      currentChar = 'C';
      break;
      default:
        break;
      }
      if (currentNum != 3 && currentNum != 6 && currentNum != 9) {
        currentNum += 1;
      }
    } else if (c == '\n' || c == EOF) {
      code[currentCodeIndex] = currentNum;
      part2Code[currentPart2CodeIndex] = currentChar;
      currentPart2CodeIndex += 1;
      currentCodeIndex += 1;
      if (c == EOF) {
        break;
      }
    }
  }
  QueryPerformanceCounter(&end);

  elapsed = (double)(end.QuadPart - start.QuadPart) / frequency.QuadPart;
  printf("Elapsed time: %.6f microseconds\n", elapsed * 1000000);
  for (int i = 0;i < 5;i++) {
    printf("%d", code[i]);
  }
  printf("\n");
  for (int i = 0;i < 5;i++) {
    printf("%c", part2Code[i]);
  }
}