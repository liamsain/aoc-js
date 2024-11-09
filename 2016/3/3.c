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

  FILE *fp = fopen("3.txt", "r");
  if (fp == NULL) {
    printf("could not open file");
  }
  char currentLine[16];
  int a = 0, b = 0, c = 0;
  int possibleTriangles = 0;

  int part2Tris = 0;
  int tri1[2] = {0};
  int tri2[2] = {0};
  int tri3[2] = {0};
  int currentTriIteration = 0;
  while(fgets(currentLine, 18, fp) != NULL) {
    sscanf(currentLine, "%d %d %d",&a, &b,&c);
    if (currentTriIteration == 2) {
      if ((tri1[0] + tri1[1]) > a && (tri1[0] + a) > tri1[1] && (tri1[1] + a) > tri1[0]) {
        part2Tris += 1;
      }
      if ((tri2[0] + tri2[1]) > b && (tri2[0] + b) > tri2[1] && (tri2[1] + b) > tri2[0]) {
        part2Tris += 1;
      }
      if ((tri3[0] + tri3[1]) > c && (tri3[0] + c) > tri3[1] && (tri3[1] + c) > tri3[0]) {
        part2Tris += 1;
      }
      currentTriIteration = 0;
    } else {
      tri1[currentTriIteration] = a;
      tri2[currentTriIteration] = b;
      tri3[currentTriIteration] = c;
      currentTriIteration += 1;
    }
    if ((a + b) > c && (a + c) > b && (b + c) > a) {
      possibleTriangles += 1;
    }
  }
  QueryPerformanceCounter(&end);

  elapsed = (double)(end.QuadPart - start.QuadPart) / frequency.QuadPart;
  printf("Elapsed time: %.6f microseconds\n", elapsed * 1000000);

  // printf("Elapsed time: %.2f milliseconds\n", ((end.QuadPart - start.QuadPart) * 1000.0) / frequency.QuadPart);

  printf("part 1: %d\n", possibleTriangles);
  printf("part 2: %d\n", part2Tris);

}